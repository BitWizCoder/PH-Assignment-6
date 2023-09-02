// Elements
const categoryContainer = document.getElementById("category");
const cardContainer = document.getElementById("card-container");
const errorSection = document.getElementById("error-section");

//
function convertSeconds(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}hrs ${minutes} min ago`;
}

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

    if (Object.keys(data.data).length === 0) {
      cardContainer.innerHTML = "";
      errorSection.innerHTML = "";
      const div = document.createElement("div");
      div.classList.add("flex", "flex-col", "items-center", "gap-5");
      div.innerHTML = `
      <div>
      <img src="./img/Icon.png" alt="" />
    </div>
    <h1 class="font-bold text-2xl">
      Oops!! Sorry, There is no <br />
      content here
    </h1>
      `;
      errorSection.appendChild(div);
    } else if (Object.keys(data.data).length >= 1) {
      cardContainer.innerHTML = "";
      errorSection.innerHTML = "";
      data.data.forEach((content) => {
        const div = document.createElement("div");
        div.classList.add("max-w-[312px]", "max-h[315px]");
        div.innerHTML = `
      <div class="relative w-[300px]">
      <img src="${content.thumbnail}" class='h-[200px] w-full' />
      <p class="absolute right-0 top-36 text-white bg-slate-900 p-1 rounded-md mr-3">${
        content.others.posted_date
          ? convertSeconds(content.others.posted_date)
          : ""
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
  }
  handleBtn(1000);

  // Loop through the categories and create buttons
  data.data.forEach((category) => {
    const div = document.createElement("div");
    const categoryName = category.category;

    // Create a button with an event listener
    const button = document.createElement("button");
    button.setAttribute("id", "tab-btn");
    button.classList.add("btn");

    button.textContent = categoryName;
    button.addEventListener("click", function () {
      const buttons = document.querySelectorAll("#tab-btn");
      buttons.forEach((btn) => {
        btn.classList.remove("bg-red-500", "text-white");
      });

      button.classList.add("bg-red-500", "text-white");
      handleBtn(category.category_id);
    });

    div.appendChild(button);
    categoryContainer.appendChild(div);
  });
}

getData();

// Sort cards
const parseView = (str) => {
  const multiplier = str.endsWith("k") ? 1000 : 1;
  return parseInt(str.replace(/k/g, "")) * multiplier;
};

const sortByViews = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/videos/category/1000"
    );
    if (!response.ok) {
      throw new Error("Network request failed");
    }

    const { data } = await response.json();

    data.sort((a, b) => parseView(b.others.views) - parseView(a.others.views));

    cardContainer.innerHTML = "";

    data.forEach((content) => {
      const div = document.createElement("div");
      div.classList = "card w-[312px] h-[325px] bg-base-100 shadow-xl";

      div.innerHTML = `
        <div class="relative w-[300px]">
          <img src="${content.thumbnail}" class="h-[200px] w-full" />
          <p class="absolute right-0 top-36 text-white bg-slate-900 p-1 rounded-md mr-3">${
            content.others.posted_date
              ? convertSeconds(content.others.posted_date)
              : ""
          }</p>
        </div>
        <div class="flex items-center gap-2 mt-5">
          <img src="${
            content.authors[0].profile_picture
          }" alt="avatar" class="w-10 h-10 rounded-full" />
          <p class="font-semibold text-base">${content.title}</p>
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
  } catch (error) {
    console.error("Error:", error);
  }
};
