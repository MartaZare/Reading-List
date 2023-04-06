let list = [];

const shelf = document.getElementById("shelf");
const registerBook = document.getElementById("registerBook");
const fauthor = document.getElementById("fauthor");
const ftitle = document.getElementById("ftitle");
const fpages = document.getElementById("fpages");
const addBookBtn = document.getElementById("addBookBtn");

function Book(title, author, pages) {
  (this.title = title), (this.author = author), (this.pages = pages);
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
  list.push(new Book(ftitle.value, fauthor.value, fpages.value));
}

function reloadForm() {
  ftitle.value = "";
  fauthor.value = "";
  fpages.value = "";
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

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerHTML += list[i].title;
    oneBook.appendChild(title);

    const author = document.createElement("div");
    author.classList.add("author");
    author.innerHTML += list[i].author;
    oneBook.appendChild(author);

    const pages = document.createElement("div");
    pages.classList.add("pages");
    pages.innerHTML += list[i].pages;
    oneBook.appendChild(pages);

    readingStatusBtn(oneBook);
    removeBookBtn(oneBook);
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

function readingStatusBtn(parentElement) {
  const read = document.createElement("button");
  read.classList.add("read");
  read.innerHTML = "Read";
  parentElement.appendChild(read);
  read.onclick = () => readingStatusColor(read);

  const notread = document.createElement("button");
  notread.classList.add("notread");
  notread.innerHTML = "Not read";
  parentElement.appendChild(notread);
  notread.onclick = () => readingStatusColor(notread);
}

function readingStatusColor(status) {
  deactivateAllBtn();
  status.classList.add("active");
  const activeButton = document.querySelector(".active");
  if (activeButton.classList.contains("read")) {
    activeButton.style.backgroundColor = "#90ee90";
    activeButton.style.color = "#ffffff";
  } else if (activeButton.classList.contains("notread")) {
    activeButton.style.backgroundColor = "#f08080";
    activeButton.style.color = "#ffffff";
  }
}

function deactivateAllBtn() {
  const activeBtn = document.querySelectorAll(".active");
  [].forEach.call(activeBtn, function (e) {
    setDefaultBtnColor(e);
    e.classList.remove("active");
  });
}

function setDefaultBtnColor(e) {
  e.style.backgroundColor = "white";
  e.style.color = "black";
}
