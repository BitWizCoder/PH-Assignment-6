// Select Elements
const categoryId = document.getElementById("categorie");
const cardContainer = document.getElementById("card-container");

// Categorie buttons and return categorie id
async function getId(id) {
  try {
    let res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    let data = await res.json();

    for (let i = 0; i < data.data.length; i++) {
      const category = document.createElement("button");
      category.classList.add("btn");

      // Set the button text to the category name
      category.innerText = data.data[i].category;
      let catId = data.data[i].category_id;
      // Add an event listener to each button to perform some action (e.g., show category-specific content)
      category.addEventListener("click", () => {
        // console.log(data.data[i].category_id);
        async function displayContent(id) {
          try {
            let res = await fetch(
              `https://openapi.programming-hero.com/api/videos/category/${id}`
            );
            let innerData = await res.json();
            console.log(innerData.data[0]);
            const card = document.createElement("div");
            card.classList.add("max-w-xs");

            const cardHtml = `
            <div>
            <img src="./img/thumbnail.png" alt="video thumbnail" />
          </div>
          <div class="flex items-center gap-2 mt-5">
            <img src="./img/avatar.png" alt="avatar" />
            <p class="font-semibold text-base">
              Building a Winning UX Strategy Using the Kano Model
            </p>
          </div>
          <p class="mt-3 text-sm">
            Awlad Hossain
            <img src="./img/blue-tick.svg" alt="" class="inline-block" />
          </p>
          <p class="mt-1 text-sm">91K views</p>
            
            `;

            card.innerHTML = cardHtml;

            cardContainer.appendChild(card);
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        }
        displayContent(catId);
      });

      categoryId.appendChild(category);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getId();
