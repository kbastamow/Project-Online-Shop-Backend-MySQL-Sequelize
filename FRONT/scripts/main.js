const API_URL = "http://localhost:3000/";

//NavBar
const productBtn = document.getElementById("product-btn")

//Offcanvas
const offcanvas = document.getElementById("offcanvas")


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

  function displayProducts(array) {
   clearDisplay() 
   array.forEach(product => {
      let card = document.createElement("div");
      card.setAttribute("class", "card m-3 p-2 col-2 text-center bg-danger");
      card.innerHTML = `<h4 class="card-title mb-3 bg-black text-bg-dark p-2">${product.name}</h4>
                            <div class="image-zoom">
                                <img src="${product.image}" class="w-100" />
                            </div>
                            <div class="card-body">
                                <h5 class="mb-3">${product.price}€</h5>
                                
                                <p id="show-details" class="mt-2" data-bs-toggle="collapse" data-bs-target="#details">Show Details</p>
                                <p id="details" class="collapse">${product.description}</p>
                                <p class="mb-0">Rating:</p>
                                <i class="fa-solid fa-star" style="color: #ffff00;"></i>
                                <i class="fa-solid fa-star" style="color: #ffff00;"></i>
                                <i class="fa-solid fa-star" style="color: #ffff00;"></i>
                                <i class="fa-solid fa-star" style="color: #ffff00;"></i>
                                <i class="fa-solid fa-star" style="color: #ffff00;"></i>
                                       
                            </div>
                         `
      products.appendChild(card);
      const buyBtn = document.createElement("button");
      buyBtn.setAttribute("class", "btn btn-dark mt-3")
      buyBtn.setAttribute("value", product.id) //to identify
      buyBtn.innerText = "Add to cart";
      buyBtn.addEventListener("click", addToCart);
      card.appendChild(buyBtn);

    })
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
    console.log(res.data.token);
  } catch (err) {
    console.log(err);
    loginAlert.setAttribute("class", "alert alert-danger p-2" )
    loginAlert.textContent = "Incorrect email/password";
    setTimeout(function () {
      loginAlert.textContent = "";
      loginAlert.removeAttribute("class")
    }, 4000);
  }
}

function welcome() {
  offcanvas.setAttribute("datahide", "hidden")
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

function clearDisplay(){
  while (products.firstChild){
  products.removeChild(products.firstChild);
  }
}












loginForm.addEventListener("submit", login)
productBtn.addEventListener("click", getProducts);
suForm.addEventListener("submit", register);
formBtn.addEventListener("click", revealForm);


