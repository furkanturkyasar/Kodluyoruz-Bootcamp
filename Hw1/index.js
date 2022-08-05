const filterInputElement = document.querySelector("#filter-input");
let data = [];

// const writeData = (data = []) => {
//   let elements = "";

//   data.forEach((image) => {
//     elements += `<div class="flip-card">
//     <div class="flip-card-inner">
//       <div class="flip-card-front">
//         <img src=${image.thumbnailUrl} alt="image" style="width:150px;height:150px;">
//       </div>
//       <div class="flip-card-back">
//       <span id="remove">❌</span>
//         <p>${image.title}</p>
//       </div>
//     </div>
//   </div>`;
//   });
//   postContainer.innerHTML = elements;
// };

const writeData = (data = []) => {
  const postContainer = document.querySelector(".posts");

  while (postContainer.hasChildNodes()) {
    postContainer.removeChild(postContainer.firstChild);
  }

  data.forEach((image) => {
    const html = createHTML(image);
    postContainer.appendChild(html);
  });
};

const getPosts = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=50"
    );

    if (res.status === 200) {
      data = await res.data;
      console.log(data);
      writeData(data);
    }
  } catch (e) {
    console.log(e);
  }
};

getPosts();
filterInputElement.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredData = data.filter((image) => {
    return image.title.toLowerCase().includes(value);
  });
  writeData(filteredData);
});

const createHTML = (image) => {
  const flipCardEl = document.createElement("div");
  flipCardEl.classList.add("flip-card");

  const flipCardInnerEl = document.createElement("div");
  flipCardInnerEl.classList.add("flip-card-inner");

  const flipCardFrontEl = document.createElement("div");
  flipCardFrontEl.classList.add("flip-card-front");

  const imageEl = document.createElement("img");
  imageEl.style.width = "150px";
  imageEl.style.height = "150px";

  const flipCardBackEl = document.createElement("div");
  flipCardBackEl.classList.add("flip-card-back");

  const removeEl = document.createElement("span");
  removeEl.innerHTML = "❌";
  removeEl.setAttribute("id", "remove");
  removeEl.addEventListener("click", () => {
    flipCardEl.remove();
  });

  const pEl = document.createElement("p");
  pEl.innerHTML = image.title;

  imageEl.src = image.thumbnailUrl;

  flipCardEl.appendChild(flipCardInnerEl);
  flipCardInnerEl.appendChild(flipCardFrontEl);
  flipCardInnerEl.appendChild(flipCardBackEl);
  flipCardFrontEl.appendChild(imageEl);
  flipCardBackEl.appendChild(removeEl);
  flipCardBackEl.appendChild(pEl);

  return flipCardEl;
};

// `<div class="flip-card">
// //     <div class="flip-card-inner">
// //       <div class="flip-card-front">
// //         <img src=${image.thumbnailUrl} alt="image" style="width:150px;height:150px;">
// //       </div>
// //       <div class="flip-card-back">
// //       <span id="remove">❌</span>
// //         <p>${image.title}</p>
// //       </div>
// //     </div>
// //   </div>`;
