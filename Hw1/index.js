const postContainer = document.querySelector(".posts");
const filterInputElement = document.querySelector("#filter-input");
let data = [];

const writeData = (data = []) => {
  let elements = "";

  data.forEach((image) => {
    elements += `<div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src=${image.thumbnailUrl} alt="image" style="width:150px;height:150px;">
      </div>
      <div class="flip-card-back">
      <span id="remove">❌</span>
        <p>${image.title}</p>
      </div>
    </div>
  </div>`;
  });
  postContainer.innerHTML = elements;
};

filterInputElement.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredData = data.filter((image) => {
    return image.title.toLowerCase().includes(value);
  });
  writeData(filteredData);
});

const getPosts = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=50"
    );
    data = res.data;
    if (res.status === 200) {
      writeData(res.data);
    }
  } catch (e) {
    console.log(e);
  }
};

getPosts();
