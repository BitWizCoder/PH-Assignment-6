// Elements
const categoryContainer = document.getElementById("category");
const cardContainer = document.getElementById("card-container");

async function getData() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  // Handle button clicks
  async function handleBtn(id) {
    cardContainer.innerHTML = "";
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();
    data.data.forEach((content) => {
      console.log(content);
      const div = document.createElement("div");
      div.classList.add(
        "max-w-[312px]",
        "max-h[315px]",
        "border",
        "border-sky-200"
      );
      div.innerHTML = `
      <div class="relative w-[300px]">
      <img src="${content.thumbnail}" class='h-[200px] w-full' />
      <p class="absolute right-0 top-36 text-white bg-slate-900 p-1 rounded-md">${
        content.others.posted_date
      }</p>
    </div>
    <div class="flex items-center gap-2 mt-5">
      <img src="${
        content.authors[0].profile_picture
      }" alt="avatar" class="w-10 h-10 rounded-full" />
      <p class="font-semibold text-base">
        ${content.title}
      </p>
    </div>
    <p class="mt-3 text-sm">
      ${content.authors[0].profile_name}
      ${
        content.authors[0].verified
          ? '<img src="./img/blue-tick.svg" alt="" class="inline-block" />'
          : ""
      }
    </p>
    <p class="mt-1 text-sm">${content.others.views} views</p>
      `;

      cardContainer.appendChild(div);
    });
  }
  // handleBtn(1000);

  // Loop through the categories and create buttons
  data.data.forEach((category) => {
    const div = document.createElement("div");
    const categoryName = category.category;

    // Create a button with an event listener
    const button = document.createElement("button");
    button.setAttribute("id", "tab-btn");
    button.classList.add("btn")

    button.textContent = categoryName;
    button.addEventListener("click", function () {
      const buttons = document.querySelectorAll("#tab-btn");
      buttons.forEach((btn) => {
        btn.classList.remove("bg-red-500");
      });

      button.classList.add("bg-red-500");
      handleBtn(category.category_id);
    });

    div.appendChild(button);
    categoryContainer.appendChild(div);
  });
}

getData();
