const categories = [
  { _id: "pizza", name: "Thin Crust Pizza", image: "./imgs/PIZZA.jpg", icon: "🍕" },
  { _id: "malai-tikka", name: "Malai Tikka", image: "./imgs/Euro.jpg", icon: "🍕" },
  { _id: "BURGERS", name: "BURGERS", image: "./imgs/Burgers.jpg", icon: "🍕" },
  { _id: "starters", name: "MALAI TIKKA PIZZA", image: "./imgs/MalaiTikka.png", icon: "🥪" },
  { _id: "PASTAS", name: "PASTAS", image: "./imgs/pastas.jpg", icon: "🍔" },
  { _id: "PIZZA", name: "BEEF PEPPERONI PIZZA", image: "./imgs/PIZZA.jpg", icon: "🍟" }
];

const slider = document.getElementById("categorySlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function renderCategories() {
  slider.innerHTML = "";

  categories.forEach((cat) => {
    const card = document.createElement("a");
    card.className = "category-card";
    card.href = `/menu?category=${encodeURIComponent(cat._id)}`;

    const imageWrap = document.createElement("div");
    imageWrap.className = "category-image-wrap";

    const img = document.createElement("img");
    img.className = "category-image";
    img.src = cat.image;
    img.alt = cat.name;

    const emoji = document.createElement("span");
    emoji.className = "category-emoji";
    emoji.textContent = cat.icon;

    if (cat.image) {
      img.onerror = () => {
        img.replaceWith(emoji);
      };
      imageWrap.appendChild(img);
    } else {
      imageWrap.appendChild(emoji);
    }

    const name = document.createElement("div");
    name.className = "category-name";
    name.textContent = cat.name;

    card.append(imageWrap, name);
    slider.appendChild(card);
  });

  requestAnimationFrame(updateArrows);
}

function updateArrows() {
  const maxScroll = slider.scrollWidth - slider.clientWidth;

  prevBtn.disabled = slider.scrollLeft <= 5;
  nextBtn.disabled =
    maxScroll <= 5 || slider.scrollLeft >= maxScroll - 5;
}

function scrollSlider(direction) {
  slider.scrollBy({
    left: direction * slider.clientWidth * 0.8,
    behavior: "smooth"
  });
}

prevBtn.addEventListener("click", () => scrollSlider(-1));
nextBtn.addEventListener("click", () => scrollSlider(1));

slider.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);

renderCategories();