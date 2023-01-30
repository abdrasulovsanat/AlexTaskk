// 1. Создайте инпут и при помощи этого инпута меняйте цвет бэкграунда на тот, который будет прописан в этом инпуте(учесть, что может быть передан не только текст, но еще и HEX, а также rgb)

// 2. Создайте блок и две кнопки для него(left и right), кнопка лефт отвечает за прокрутку блока в лево на 180 градусов, а right аналогично вправо(используйте гугл для поиска информации о прокрутке блока)

// let div = document.querySelector('.block') 
// let leftBtn = document.querySelector('#left') 
// leftBtn.addEventListener('click', () =>{ 
//     div.style.transform = 'rotate(-0.5turn)' 
// }) 
// let rightBtn = document.querySelector('#right') 
// rightBtn.addEventListener('click', () =>{ 
//     div.style.transform = 'rotate(180deg)' 
// })


// 3. Математическое округление. Создайте инпут, который будет округлять десятичное число в зависимости от его десятичной части к примеру, если ввести 5.7 вывести 6, если 5.4 вывести 5

// let inpMath = document.querySelector("#inp-math");
// inpMath.addEventListener("change", e =>{
//    let res= Math.round(e.target.value);
//    e.target.value = res;
// });


// 4. Реализуйте логику контактной книжки, то есть, реализовать CR(создание и просмотр). Контакт должен иметь поля(name, lastName, age, address). Использовать bootstrap(карточки), json-server;

// const CONTACT_API ="http://localhost:3000/contacts";

// let inpName = document.querySelector("#inp-name");
// let inpLastname = document.querySelector("#inp-lastname");
// let inpAge = document.querySelector("#inp-age");
// let inpAddress = document.querySelector("#inp-address");
// let btnCreate= document.querySelector("#btn-create");
// let btnRead = document.querySelector("#btn-read");

// function createContact(e) {
//     e.preventDefault();
//     let contact = {
//         name: inpName.value,
//         lastname: inpLastname.value,
//         age: inpAge.value,
//         address: inpAddress.value
//     };

//     let res = fetch(CONTACT_API, {
//         method: "POST",
//         body: JSON.stringify(contact),
//         headers: {
//             "Content-Type": "application/json;charset=utf-8"
//         }
//     })
// }

// btnCreate.addEventListener("click", createContact);

// function readContact() {
//     let container =document.querySelector(".container");
//     container.innerHTML ="";
//     fetch(CONTACT_API)
//         .then(res => res.json())
//         .then(contacts => {
//             contacts.forEach(item => {
//                 container.innerHTML += `<div class="card" style="width: 18rem;">
//                 <div class="card-body">
//                   <p class="card-text">${item.name}</p>
//                   <p class="card-text">${item.lastname}</p>
//                   <p class="card-text">${item.age}</p>
//                   <p class="card-text">${item.address}</p>
//                 </div>
//               </div>`
//             })
//         }
//    )       
// }
// btnRead.addEventListener("click", readContact);



// 5. Отправить запрос на API: https://rickandmortyapi.com/api/character ; изучить эту ссылку и отобразить на странице карточки, в карточках должна быть следующая информация(картинка, имя, статус)

// const API = "https://rickandmortyapi.com/api/character";
// function serApi() {
//     let list = document.querySelector('ul')
//     fetch(API)
//         .then((res) => res.json())
//         .then((data) => {
//             data.results.forEach((item) => {
//                 list.innerHTML += `
//                 <div class="list" style="width: 18rem">
//                 <img src="${item.image}" class="card-img-top" alt="error" />
//                 <div class="card-body">
//                 <h5 class="card-title">${item.name}</h5>
//                 <p class="card-text">${item.status}</p>
//                 </div>
//             </div>
//                 `;
//             })
//         })
// }
// serApi();


// 6. Используя готовые данные для файла db.json, Сделайте R-отображение, U-изменение



// 6.1. Продолжаем предыдущий таск. Реализуйте логику корзины. У вас есть карточка с товаром, нажав на кнопку «добавить в корзину» добавляйте товар в local storage, с возможностью указать количество товаров. Также в карточке должна быть кнопка, УДАЛИТЬ ИЗ КОРЗИНЫ, нажав на которую, товар удаляется из корзины, также на странице должна быть кнопка ОЧИСТИТЬ КОРЗИНУ, при нажатии на эту кнопку, все товары должны быть удалены из хранилища

//! account logic
//! show modal logic
let registerUserModalBtn = document.querySelector("#registerUser-modal");
let loginUserModalBtn = document.querySelector("#loginUser-modal");
let registerUserModalBlock = document.querySelector("#registerUser-block");
let loginUserModalBlock = document.querySelector("#loginUser-block");
let registerUserBtn = document.querySelector("#registerUser-btn");
let loginUserBtn = document.querySelector("#loginUser-btn");
let logoutUserBtn = document.querySelector("#logoutUser-btn");
let closeRegisterModalBtn = document.querySelector(".btn-close");
//? modal sign up
registerUserModalBtn.addEventListener("click", () => {
  registerUserModalBlock.setAttribute("style", "display: flex !important;");
  registerUserBtn.setAttribute("style", "display: flex !important;");
  loginUserModalBlock.setAttribute("style", "display: none !important");
  loginUserBtn.setAttribute("style", "display: none !important");
});
//? modal login
loginUserModalBtn.addEventListener("click", () => {
  registerUserModalBlock.setAttribute("style", "display: none !important;");
  registerUserBtn.setAttribute("style", "display: none !important;");
  loginUserModalBlock.setAttribute("style", "display: flex !important");
  loginUserBtn.setAttribute("style", "display: flex !important");
});

//? request json serv "users"
const USERS_API = "http://localhost:8000/users";

//? register inputs group
let usernameInp = document.querySelector("#reg-username");
let ageInp = document.querySelector("#reg-age");
let passwordInp = document.querySelector("#reg-password");
let passwordConfirmInp = document.querySelector("#reg-passwordConfirm");
let isAdminInp = document.querySelector("#isAdmin");
//! register inputs end

//* sign up logic
async function checkUniqueUsername(username) {
  let res = await fetch(USERS_API);
  let users = await res.json();
  return users.some((i) => i.username === username);
}

async function registerUser() {
  if (
    !usernameInp.value.trim() ||
    !ageInp.value.trim() ||
    !passwordInp.value.trim() ||
    !passwordConfirmInp.value.trim()
  ) {
    alert("Some inputs are empty");
    return;
  }
  let uniqueUsername = await checkUniqueUsername(usernameInp.value);
  if (uniqueUsername) {
    alert("User with this username already exists!");
    return;
  }
  if (passwordInp.value !== passwordConfirmInp.value) {
    alert("Passwords don't match");
    return;
  }
  let userObj = {
    username: usernameInp.value,
    age: ageInp.value,
    password: passwordInp.value,
    isAdmin: isAdminInp.checked,
  };
  fetch(USERS_API, {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  console.log(`${userObj.username} was registered`);
  usernameInp.value = "";
  ageInp.value = "";
  passwordInp.value = "";
  passwordConfirmInp.value = "";
  isAdminInp.checked = false;
  closeRegisterModalBtn.click();
}

registerUserBtn.addEventListener("click", registerUser);
//* sign up logic end

//* login logic
let showUsername = document.querySelector("#showUsername");

function checkLoginLogoutStatus() {
  let user = localStorage.getItem("user");
  if (!user) {
    loginUserModalBtn.parentNode.style.display = "block";
    registerUserModalBtn.parentNode.style.display = "block";
    logoutUserBtn.parentNode.style.display = "none";

    showUsername.innerText = `No user`;
  } else {
    loginUserModalBtn.parentNode.style.display = "none";
    registerUserModalBtn.parentNode.style.display = "none";
    logoutUserBtn.parentNode.style.display = "block";
    showUsername.innerText = JSON.parse(user).username;
  }
  showAdminPanel();
}
checkLoginLogoutStatus();

let loginUsernameInp = document.querySelector("#login-username");
let loginPasswordInp = document.querySelector("#login-password");
function checkUserInUsers(username, users) {
  return users.some((i) => i.username === username);
}

function checkUserPassword(user, password) {
  return user.password === password;
}

function setUserToLocalStorage(username, isAdmin) {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username,
      isAdmin,
    })
  );
}

async function loginUser() {
  if (!loginUsernameInp.value.trim() || !loginPasswordInp.value.trim()) {
    alert("Some inputs are empty");
    return;
  }
  let res = await fetch(USERS_API);
  let users = await res.json();
  if (!checkUserInUsers(loginUsernameInp.value, users)) {
    alert("User not found");
    return;
  }
  let userObj = users.find((i) => i.username === loginUsernameInp.value);
  if (!checkUserPassword(userObj, loginPasswordInp.value)) {
    alert("Wrong password");
    return;
  }
  setUserToLocalStorage(userObj.username, userObj.isAdmin);

  console.log(`${userObj.username} was logged in`);
  loginUsernameInp.value = "";
  loginPasswordInp.value = "";
  checkLoginLogoutStatus();
  closeRegisterModalBtn.click();
  render();
}

loginUserBtn.addEventListener("click", loginUser);
//* login logic end
//* logout logic

logoutUserBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  render();
});

//* logout logic end
//!account logic

function checkUserForProductCreate() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) return user.isAdmin;
  return false;
}

function showAdminPanel() {
  let adminPanel = document.querySelector("#admin-panel");
  if (!checkUserForProductCreate()) {
    adminPanel.setAttribute("style", "display: none !important");
  } else {
    adminPanel.setAttribute("style", "display: flex !important");
  }
}
//! product logic
//* create
let productTitle = document.querySelector("#product-title");
let productPrice = document.querySelector("#product-price");
let productImage = document.querySelector("#product-image");
let productDescription = document.querySelector("#product-desc");
let productCategory = document.querySelector("#product-category");
let addProductBtn = document.querySelector(".add-product-btn");

const PRODUCTS_API = "http://localhost:8000/products";

async function createProduct() {
  if (
    !productTitle.value.trim() ||
    !productPrice.value.trim() ||
    !productImage.value.trim() ||
    !productDescription.value.trim() ||
    !productCategory.value.trim()
  ) {
    alert("Some inputs are empty");
    return;
  }

  let productObj = {
    title: productTitle.value,
    price: productPrice.value,
    image: productImage.value,
    description: productDescription.value,
    category: productCategory.value,
  };
  await fetch(PRODUCTS_API, {
    method: "POST",
    body: JSON.stringify(productObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  productTitle.value = "";
  productPrice.value = "";
  productImage.value = "";
  productDescription.value = "";
  productCategory.value = "";
  render();
}

addProductBtn.addEventListener("click", createProduct);
//* create logic end
//* render logic

let currentPage = 1;
let search = "";
let category = "";

async function render() {
  let productsList = document.querySelector("#products-list");
  productsList.innerHTML = "";
  let requestAPI = `${PRODUCTS_API}?q=${search}&category=${category}&_page=${currentPage}&_limit=2`;
  if (!category) {
    requestAPI = `${PRODUCTS_API}?q=${search}&_page=${currentPage}&_limit=2`;
  }
  let res = await fetch(requestAPI);
  let products = await res.json();
  products.forEach((i) => {
    productsList.innerHTML += `
    <div class="card m-5" style="width: 18rem;">
      <img src="${i.image}" class="card-img-top" alt="error">
        <div class="card-body">
            <h5 class="card-title">${i.title}</h5>
            <p class="card-text">${i.description}</p>
            <p class="card-text">${i.category}</p>
            <p class="card-text">${i.price}</p>
            ${
              checkUserForProductCreate()
                ? `<a href="#" class="btn btn-outline-dark btn-edit" id="edit-${i.id}">EDIT</a>
              <a href="#" class="btn btn-outline-danger btn-delete" id="del-${i.id}">DELETE</a>`
                : ""
            }
        </div>
    </div>
    `;
  });

  if (products.lenth === 0) return;
  addCategoryToDropDownMenu();
  addDeleteEvent();
  addEditEvent();
}
render();
//* render logic end

async function addCategoryToDropDownMenu() {
  let res = await fetch(PRODUCTS_API);
  let data = await res.json();
  let categories = new Set(data.map((i) => i.category));
  let categoriesList = document.querySelector(".dropdown-menu");
  categoriesList.innerHTML = `<li><a class="dropdown-item" href="#">ALL</a></li>`;
  categories.forEach((i) => {
    categoriesList.innerHTML += `<li><a class="dropdown-item" href="#">${i}</a></li>`;
  });
  addClickEventOnDropdownItem();
}

//* delete product logic
async function deleteProduct(e) {
  let productId = e.target.id.split("-")[1];
  await fetch(`${PRODUCTS_API}/${productId}`, {
    method: "DELETE",
  });
  render();
}

function addDeleteEvent() {
  let deleteProductBtn = document.querySelectorAll(".btn-delete");
  deleteProductBtn.forEach((i) => i.addEventListener("click", deleteProduct));
}
//* delete product logic end
// update
let saveChangesBtn = document.querySelector(".save-changes-btn");

function checkCreateAndSaveBtn() {
  if (saveChangesBtn.id) {
    addProductBtn.setAttribute("style", "display: none;");
    saveChangesBtn.setAttribute("style", "display: block;");
  } else {
    addProductBtn.setAttribute("style", "display: block;");
    saveChangesBtn.setAttribute("style", "display: none;");
  }
}
checkCreateAndSaveBtn();

async function addProductDataToForm(e) {
  let productId = e.target.id.split("-")[1];

  let res = await fetch(`${PRODUCTS_API}/${productId}`);
  let productObj = await res.json();
  console.log(productObj);

  productTitle.value = productObj.title;
  productPrice.value = productObj.price;
  productDescription.value = productObj.description;
  productImage.value = productObj.image;
  productCategory.value = productObj.category;

  saveChangesBtn.setAttribute("id", productObj.id);

  checkCreateAndSaveBtn();
}

function addEditEvent() {
  let editProductBtn = document.querySelectorAll(".btn-edit");
  editProductBtn.forEach((item) =>
    item.addEventListener("click", addProductDataToForm)
  );
}

async function saveChanges(e) {
  let updatedProductObj = {
    id: e.target.id,
    title: productTitle.value,
    price: productPrice.value,
    desc: productDescription.value,
    image: productImage.value,
    category: productCategory.value,
  };

  await fetch(`${PRODUCTS_API}/${e.target.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProductObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  productTitle.value = "";
  productPrice.value = "";
  productDesc.value = "";
  productImage.value = "";
  productCategory.value = "";

  saveChangesBtn.removeAttribute("id");

  checkCreateAndSaveBtn();

  render();
}

saveChangesBtn.addEventListener("click", saveChanges);
//* update product logic end
//* filtering
function filterOnCategory(e) {
  console.log("hello");
  let categoryText = e.target.innerText;
  if (categoryText == "ALL") {
    category = "";
  } else {
    category = categoryText;
  }
  render();
}

function addClickEventOnDropdownItem() {
  let categoryItems = document.querySelectorAll(".dropdown-item");
  categoryItems.forEach((i) => i.addEventListener("click", filterOnCategory));
}

//* search logic
let searchInp = document.querySelector("#search-inp");
searchInp.addEventListener("input", () => {
  search = searchInp.value;
  currentPage = 1;
  render();
});
//* search logic end
//* pagination logic
let prevPageBtn = document.querySelector("#prev-page-btn");
let nextPageBtn = document.querySelector("#next-page-btn");

async function getPagesCount() {
  let res = await fetch(`${PRODUCTS_API}`);
  let products = await res.json();
  let pagesCount = Math.ceil(products.length / 2);
  return pagesCount;
}
async function checkPages() {
  let maxPagesNum = await getPagesCount();
  if (currentPage === 1) {
    prevPageBtn.setAttribute("style", "display: none");
    nextPageBtn.setAttribute("style", "display: block");
  }
  else if(currentPage === maxPagesNum) {
    prevPageBtn.setAttribute("style", "display: block");
    nextPageBtn.setAttribute("style", "display: none");
  }
  else {
    prevPageBtn.setAttribute("style", "display: block");
    nextPageBtn.setAttribute("style", "display: block");
  }
}
checkPages();

prevPageBtn.addEventListener('click', () => {
  currentPage --;
  checkPages()
  render()
})
nextPageBtn.addEventListener('click', () => {
  currentPage ++;
  checkPages()
  render()
})
//* pagination logic end
//! product logic end


// Super Task
// Реализовать имитацию блога

// 1. Каждый пользователь должен иметь возможность зарегистрироваться и авторизоваться на сайте, вид объекта пользователя: 
// {
//   id: 12,
//   name: 'Jack',
//   password: 'superJack',
//   favorites: []
// }


// 2. Полный CRUD на посты, каждый зарегистрированный и авторизованный пользователь должен получить доступ к созданию, редактированию, удалению ТОЛЬКО СВОИХ постов, вид объекта поста:
// {
//   id: 4,
//   title: SomeTitle,
//   content: SomeContent,
//   likes: 8,
//   author: {
//     id: 12,
//     name: 'Jack',
//   }
// }


// 3. Незарегистрированные и неавторизованные пользователи могут только просматривать посты


// 4. Каждый пользователь может поставить лайк любому посту, после чего пост, который нравится пользователю, отображается в массиве favorites, например пользователю с id-12, нравится пост с id-4, пользователь ставит лайк посту, пост добавляется в массив favorites, который находится в объекте пользователя:
// {
//   id: 12,
//   name: 'Jack',
//   password: 'superJack',
//   favorites: [
//     {
//       id: 4,
//       title: SomeTitle,
//       content: SomeContent,
//       likes: 8
//     }
//   ]
// }, в свою очередь количество лайков у поста повышается:
// {
//   id: 4,
//   title: SomeTitle,
//   content: SomeContent,
//   likes: 8 -> 9
// }, также у поста кнопка ЛАЙК должна измениться на ДИЗЛАЙК, при нажатии количество лайков у поста должно уменьшиться на 1, а у пользователя данный пост должен быть удален из массива favorites
// ВАЖНО: если пользователь ставик лайк посту, то для него исчезает кнопка лайк и появляется кнопка дизлайк(для данного поста), но если зайти под другим аккаунтом, который еще не ставил лайк, то кнопка лайк снова должна появиться   

