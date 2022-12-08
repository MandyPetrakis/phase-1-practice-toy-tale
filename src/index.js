let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then((toys) => {
    for (toy in toys) {
      createToy(toys);
    }
  });

//Render Toy

function createToy(toys) {
  let toyDiv = document.createElement("div");
  toyDiv.classList.add("card");
  let toyCollection = document.querySelector("#toy-collection");
  toyCollection.append(toyDiv);

  let name = document.createElement("h2");
  name.textContent = toys[toy]["name"];
  toyDiv.append(name);

  let photo = document.createElement("img");
  photo.classList.add("toy-avatar");
  photo.src = toys[toy]["image"];
  toyDiv.append(photo);

  let likes = document.createElement("p");
  let likeCount = toys[toy]["likes"];
  likes.textContent = `${likeCount} likes`;
  toyDiv.append(likes);

  let btn = document.createElement("button");
  btn.classList.add("like-btn");
  btn.id = toys[toy]["id"];
  btn.textContent = "Like ❤️";
  btn.addEventListener("click", (e) => {
    let toyID = e.target.id;
    let updatedLikeCount = likeCount++;
    fetch(`https://localhost:3000/toys/${toyID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikeCount,
      }),
    });
  });
  toyDiv.append(btn);
}

//Create toy button

let submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  let newToy = {};
  let inputs = document.querySelectorAll(".input-text");
  let newToyName = inputs[0].value;
  let newToyUrl = inputs[1].value;
  newToy.name = newToyName;
  newToy.image = newToyUrl;
  newToy.likes = 0;
  toyPost(newToy);
}

function toyPost(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //strigify the content of the post
    body: JSON.stringify(toyObj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

//Increase likes
// add event listener to like buttons that:
// capture that toy's id,
// calculate the new number of likes,
// submit the patch request, and
// update the toy's card in the DOM based on the Response returned by the fetch request.
