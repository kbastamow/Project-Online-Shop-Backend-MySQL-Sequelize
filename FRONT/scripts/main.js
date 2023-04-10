const API_URL = "http://localhost:3000/";

//NavBar
const productBtn = document.getElementById("product-btn")
const accessories = document.getElementById("accessories")
const music = document.getElementById("music")
const dropdownCats = document.querySelectorAll(".dropdown-menu button")
const searchForm = document.getElementById("search")
const searchText = document.getElementById("search-text")
console.log(dropdownCats);
// 
// const guitar =
// const wind
// const string
// const keys
// const allInstruments

//Offcanvas
const formDisplay = document.getElementById("form-display")


//Login
const loginBtn = document.getElementById("login-btn")
const loginForm = document.getElementById("login-form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const loginAlert = document.getElementById("login-alert")
let loginInputs = document.querySelectorAll("#login-form input")
for (let i = 0; i < loginInputs.length; i++) {
  loginInputs[i].addEventListener('input', function() {
    enableSubmit(loginInputs, loginBtn)
});
}

//Sign-up form
const suForm = document.getElementById("signup-form");
const formBtn = document.getElementById("reveal-form-btn");
const pwOne = document.getElementById("password-one");
const pwTwo = document.getElementById("password-two")
// const name = document.getElementById("name");
// const surname = document.getElementById("surname");
// const suEmail = document.getElementById("signup-email");
const suAlert = document.getElementById("signup-alert")
const suBtn = document.getElementById("signup-btn")
let suInputs = document.querySelectorAll('#signup-form input');
for (let i = 0; i < suInputs.length; i++) {
    suInputs[i].addEventListener('input', function() {
      enableSubmit(suInputs, suBtn)
  });
  }

//Main
const products = document.getElementById("products")

//Global variables:

let user = {};
let token = localStorage.getItem("shop_token") || "";
let cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];


//SHOW DIFFERENT PRODUCTS

function displayProducts(array) {
  clearDisplay()
  array.forEach(product => {

    //Displayin in HTML    
    let card = document.createElement("div");
    card.setAttribute("class", "card m-3 p-2 col-2 text-center bg-danger");
    card.innerHTML = `<h4 class="card-title mb-3 bg-black text-bg-dark p-2">${product.name}</h4>
                           <div class="image-zoom">
                               <img src="${product.image}" class="w-100" />
                           </div>
                           <div class="card-body">
                               <h5 class="mb-3">${product.price}€</h5>
                               
                               <p class="show-details mt-2" data-bs-toggle="collapse" data-bs-target="#details${product.id}">Show Details</p>
                               <p id="details${product.id}" class="collapse text-center">${product.description}</p>
                           </div>
                           `

    products.appendChild(card);

    let rating = calculateStars(product);  //Long function - declared separately and called here
    card.appendChild(rating);


    const buyBtn = document.createElement("button");
    buyBtn.setAttribute("class", "btn btn-dark mt-3")
    buyBtn.setAttribute("value", product.id) //to identify
    buyBtn.innerText = "Add to cart";
    buyBtn.addEventListener("click", addToCart);
    card.appendChild(buyBtn);


    let reviewDiv = displayReviews(product) //Another function that has been separated to avoid overly long main function
    card.appendChild(reviewDiv);
  })
}

function calculateStars(product) {
  let reviews = product.Reviews;
  console.log("reviews ", reviews);
  let ratingDisplay = "";
  if (reviews.length === 0) {
    ratingDisplay = `<p>No reviews yet</p>`
  } else {
    let average = reviews.reduce((acc, val) => acc + val.stars, 0) / reviews.length
    console.log(average);
    average = Math.round(average * 2) / 2 //rounds to nearest 0.5

    let fullStars = Math.floor(average);
    let halfStars = average - fullStars;
    let emptyStars = 5 - Math.ceil(average);

    for (let i = 0; i < fullStars; i++) {
      ratingDisplay += `<i class="fa-solid fa-star" style="color: #ffff00;"></i>`
    }
    if (halfStars) {
      ratingDisplay += `<i class="fa-regular fa-star-half-stroke" style="color: #ffff00;"></i>`
    }
    for (let i = 0; i < emptyStars; i++) {
      ratingDisplay += `<i class="fa-regular fa-star" style="color: #ffff00;"></i>`
    }
    ratingDisplay += `<p class="read-more mt-2" data-bs-toggle="collapse" data-bs-target="#reviews${product.id}">Read more</p>
                      <div id="reviews${product.id}" class="collapse text-center"></div>`
  }

  const rating = document.createElement("div");
  rating.setAttribute("class", "rating-display")
  rating.innerHTML = `<p class="mb-0">Rating:</p>${ratingDisplay}`
  return rating;

}

function displayReviews(product) {
  let reviews = product.Reviews;
  const reviewDiv = document.createElement("div");
  reviewDiv.setAttribute("id", `reviews${product.id}`);
  reviewDiv.setAttribute("class", "collapse text-center text-bg-dark mt-2 pt-1")
  for (review of reviews) {
    let fullStars = review.stars;
    let emptyStars = 5 - fullStars
    for (let i = 0; i < fullStars; i++) {
      reviewDiv.innerHTML += `<i class="fa-solid fa-star fa-xs" style="color: #ffffff;"></i>`
    }
    for (let i = 0; i < emptyStars; i++) {
      reviewDiv.innerHTML += `<i class="fa-regular fa-star fa-xs" style="color: #ffffff;"></i>`
    }
    reviewDiv.innerHTML += `<p class="small px-2"><em>${review.details}</em></p><hr>`
  }
  return reviewDiv;
}





//AXIOS get products

async function getProducts(e){ 
    try {
      e.preventDefault();
      // clearDisplay()
      const res = await axios.get(API_URL + "products/getAllwithAssociations");
      const products = res.data;
      displayProducts(products)
    } catch (err) {
      console.error(err);
    }
  }

  
async function getByCategory(e, cat) {
  e.preventDefault()
  console.log(cat)
  try {
    const res = await axios.get(API_URL + "categories/getAllJoinProducts");
    for (category of res.data) {
      if (category.name == cat) {
        let products = category.Products;
        displayProducts(products)
      }
    }
   } catch (err) {
      console.log(err);
    }
  }

  async function search(e){
    try {
      e.preventDefault();
      console.log(searchText.value)
      const res = await axios.get(API_URL + "products/findByName/" + searchText.value);
      const products = res.data;
      displayProducts(products)
    } catch (err) {
      console.error(err);
    }
  }
  




















//UNFINISHED
  function addToCart(){
    console.log("add this product to cart")
  }
  
async function login(e) {
  console.log("login" + email.value + " " + password.value);
  e.preventDefault();
  try {
    console.log(API_URL + "users/login")
    const res = await axios.post(API_URL + "users/login", {
      email: email.value,
      password: password.value
    });
    localStorage.setItem("shop_token", res.data.token);
    token = res.data.token;
    user = res.data.user
    console.log(res.data.user);
    console.log(user);
    welcome();
  } catch (err) {
    console.log(err);
    loginAlert.setAttribute("class", "alert alert-danger p-2" )
    loginAlert.textContent = "Incorrect email/password"; //WHY IS THIS DISPLAYING ANYWAy?
    setTimeout(function () {
      console.log("setTimeout called");
      loginAlert.textContent = "";
      loginAlert.removeAttribute("class")
    }, 4000);
  }
}

//I'm HERE!


function welcome() {
  console.log(formDisplay);
  formDisplay.setAttribute("datahide", "hidden");
  
  const offcanvasBody = document.querySelector(".offcanvas-body");
  console.log(offcanvasBody);
  let userInfo = document.createElement("div");
  userInfo.innerHTML = `<h4 class="text-center"> Welcome, ${user.name}</h4>`
  offcanvasBody.appendChild(userInfo) 
  console.log(user.name);
  console.log(userInfo);
  
  if (cart.length === 0){
  userInfo.innerHTML += `<p>There are no product in your cart</p>`;
  }

}





//REGISTRATION

//Reveal signup form
function revealForm(e){
    e.preventDefault();
    formBtn.setAttribute("datahide", "hidden");
    suForm.removeAttribute("datahide");
    console.log(formBtn)
}

function register(e){
    e.preventDefault();
     if (pwOne.value !== pwTwo.value) {
    suAlert.setAttribute("class", "alert alert-danger")
    suAlert.textContent = "Passwords don't match";   
}
}


//Enable login/signup submit buttons when all fields are completed
function enableSubmit(inputs, btn) {
  for (input of inputs) {
      if (input.value === "" || input.value === null) {
          return btn.disabled = true;
      }
  }
  btn.disabled = false;
}





function clearDisplay(){
  while (products.firstChild){
  products.removeChild(products.firstChild);
  }
}

searchForm.addEventListener("submit", search)
loginForm.addEventListener("submit", login)
productBtn.addEventListener("click", getProducts);
suForm.addEventListener("submit", register);
formBtn.addEventListener("click", revealForm);
accessories.addEventListener("click", function(e){  //THIS is how I can pass two parameters"
  getByCategory(e, "Accessories")} )
music.addEventListener("click", function(e){  //THIS is how I can pass two parameters"
  getByCategory(e, "Sheet music")} )
for (button of dropdownCats){
  button.addEventListener("click", function(e){  //THIS is how I can pass two parameters"
    getByCategory(e, button.value)} )
}



{/* <p class="mb-0">Rating:</p> */}
// <div class="rating-display">${ratingDisplay}</div> 