let list = [];

const shelf = document.getElementById("shelf");
const registerBook = document.getElementById("registerBook");
const fauthor = document.getElementById("fauthor");
const ftitle = document.getElementById("ftitle");
const addBookBtn = document.getElementById("addBookBtn");

function Book(title, author) {
  (this.title = title), (this.author = author);
}

function displayForm(e) {
  if (e == "on") {
    registerBook.style.display = "block";
    addBookBtn.style.display = "none";
  } else {
    registerBook.style.display = "none";
    addBookBtn.style.display = "block";
  }
}

function addBook() {
  displayForm("off");
  submitForm();
  reloadForm();
  displayShelf();
}

function displayShelf() {
  clearShelf();
  loadShelf();
}

function submitForm() {
  list.push(new Book(ftitle.value, fauthor.value));
}

function reloadForm() {
  ftitle.value = "";
  fauthor.value = "";
}

function clearShelf() {
  shelf.innerHTML = "";
}

function loadShelf() {
  for (let i = 0; i < list.length; i++) {
    const oneBook = document.createElement("div");
    oneBook.classList.add("bookCard");
    oneBook.classList.add(i);
    shelf.appendChild(oneBook);

    const bookNameAuthor = document.createElement("div");
    bookNameAuthor.classList.add("bookNameAuthor");
    oneBook.appendChild(bookNameAuthor);

    const bookBtn = document.createElement("div");
    bookBtn.classList.add("bookBtn");
    bookBtn.classList.add(i);
    oneBook.appendChild(bookBtn);

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerHTML += list[i].title;
    bookNameAuthor.appendChild(title);

    const author = document.createElement("div");
    author.classList.add("author");
    author.innerHTML += list[i].author;
    bookNameAuthor.appendChild(author);

    readingStatusBtn(bookBtn);
    removeBookBtn(bookBtn);
  }
}

function removeBookBtn(parentElement) {
  const remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = "Remove";
  parentElement.appendChild(remove);
  remove.addEventListener("click", function (e) {
    list.splice(e.target.parentElement.classList.item(1), 1);
    displayShelf();
  });
}

// added is read
function readingStatusBtn(parentElement, isRead) {
  const read = document.createElement("button");
  read.classList.add("read");
  read.innerHTML = "Read";
  parentElement.appendChild(read);
  read.onclick = () => readingStatusColor(read, parentElement);
  read.classList.add("active");

  const notread = document.createElement("button");
  notread.classList.add("notread");
  notread.innerHTML = "Not read";
  parentElement.appendChild(notread);
  notread.onclick = () => readingStatusColor(notread, parentElement);
}

function readingStatusColor(status, parentElem) {
  deactivateAllCardBtn(parentElem);

  status.classList.add("active");

  const activeButton = parentElem.querySelector(".active");
  if (activeButton.classList.contains("read")) {
    activeButton.style.backgroundColor = "#90ee90";
    activeButton.style.color = "#ffffff";
  } else if (activeButton.classList.contains("notread")) {
    activeButton.style.backgroundColor = "#f08080";
    activeButton.style.color = "#ffffff";
  }
}

function deactivateAllCardBtn(parentElement) {
  const activeBtn = parentElement.querySelectorAll(".active");
  [].forEach.call(activeBtn, function (e) {
    setDefaultBtnColor(e);
    e.classList.remove("active");
  });
}

function setDefaultBtnColor(e) {
  e.style.backgroundColor = "white";
  e.style.color = "black";
}

// Create an array readingState +
// Take parentElement (bookBtn) second class call parentClass
// Take childElement (e.target) class call  (target means the one we activate)
// Create an object with constructor function ReadingState(parentClass, childClass)
// Load active buttons:
//// 1. Find object parent
//// 2. Find object child
//// 3. Add "active" class to child
//// 4. Color active buttons

// function loadActiveStatusBtn() {
//   for (let i = 0; i < list.length; i++) {
//     const bookBtn = document.createElement("div");
//     bookBtn.classList.add("bookBtn");
//     bookBtn.classList.add(i);
//     oneBook.appendChild(bookBtn);

//     const title = document.createElement("div");
//     title.classList.add("title");
//     title.innerHTML += list[i].title;
//     bookNameAuthor.appendChild(title);

//     const author = document.createElement("div");
//     author.classList.add("author");
//     author.innerHTML += list[i].author;
//     bookNameAuthor.appendChild(author);
//   }
// }
// DELETE UPON EXECUSION <
// function ReadingState(parentClass, childClass) {
//   (this.parentClass = parentClass), (this.childClass = childClass);
// }
// DELETE UPON EXECUSION >
