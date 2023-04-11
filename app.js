let list = [];

let currentStatus = undefined;
const shelf = document.getElementById("shelf");
const registerBook = document.getElementById("registerBook");
const fauthor = document.getElementById("fauthor");
const ftitle = document.getElementById("ftitle");
const read = document.getElementById("read");
const notread = document.getElementById("notread");
const addBookBtn = document.getElementById("addBookBtn");

function addBook() {
  displayForm("off"); // sitoje vietoje reiktu padaryti true arba false
  submitForm();
  reloadForm();
  displayShelf();
}

function submitForm() {
  if (
    (read.checked === true || notread.checked === true) &&
    fauthor.value !== "" &&
    ftitle.value !== ""
  ) {
    getReadingStatus();
    addInformationToList();
  } else if (fauthor.value === "") {
    alert("To add book to the library you have to add the author of the book.");
  } else if (ftitle.value === "") {
    alert("To add book to the library you have to add the title of the book.");
  } else if (read.checked === false && notread.checked === false) {
    alert(
      "To add book to the library you have to choose: 'Read this book' or 'Haven't read'"
    );
  }
}

function reloadForm() {
  ftitle.value = "";
  fauthor.value = "";
  resetReadingStatus();
}

function displayShelf() {
  clearShelf();
  loadShelf();
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

function Book(title, author, status) {
  (this.title = title), (this.author = author), (this.status = status);
}

function getReadingStatus() {
  if (read.checked) {
    currentStatus = read.value;
  } else if (notread.checked) {
    currentStatus = notread.value;
  }
}

function addInformationToList() {
  list.push(new Book(ftitle.value, fauthor.value, currentStatus));
}

function resetReadingStatus() {
  read.checked = false;
  notread.checked = false;
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

    const bookCardTitleAuthor = document.createElement("div");
    bookCardTitleAuthor.classList.add("bookCardTitleAuthor");
    oneBook.appendChild(bookCardTitleAuthor);

    const bookCardBtns = document.createElement("div");
    bookCardBtns.classList.add("bookCardBtns");
    bookCardBtns.classList.add(i);
    oneBook.appendChild(bookCardBtns);

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerHTML += list[i].title;
    bookCardTitleAuthor.appendChild(title);

    const author = document.createElement("div");
    author.classList.add("author");
    author.innerHTML += list[i].author;
    bookCardTitleAuthor.appendChild(author);

    readingStatusBtn(bookCardBtns, list[i].status);
    removeBookBtn(bookCardBtns);
    console.log("status on laodshelf: " + list[i].status);
  }
}

function readingStatusBtn(parentElement, status) {
  const readBtn = document.createElement("button");
  readBtn.classList.add("readBtn");
  readBtn.innerHTML = "Read";

  const notreadBtn = document.createElement("button");
  notreadBtn.classList.add("notreadBtn");
  notreadBtn.innerHTML = "Not read";

  if (status === "read") {
    readBtn.classList.add("active");
    parentElement.classList.add("active");
  } else if (status === "notread") {
    notreadBtn.classList.add("active");
    parentElement.classList.add("active");
  }

  parentElement.appendChild(readBtn);
  parentElement.appendChild(notreadBtn);

  readingStatusColorChoose(parentElement, status);

  readBtn.addEventListener("click", () =>
    readingStatusColor(readBtn, parentElement, "read", status)
  );
  notreadBtn.addEventListener("click", () =>
    readingStatusColor(notreadBtn, parentElement, "notread", status)
  );

  console.log("status on reading status btn: " + status);
}

function readingStatusColor(statusBtn, parentElem, state) {
  list[parseInt(parentElem.classList[1])].status = state;
  deactivateAllCardBtn(parentElem);
  statusBtn.classList.add("active");
  readingStatusColorChoose(parentElem, state);
}

function readingStatusColorChoose(parentElement, state) {
  const activeButton = parentElement.querySelector(".active");
  if (state === "read") {
    activeButton.style.backgroundColor = "#90ee90";
    activeButton.style.color = "#ffffff";
  } else if (state === "notread") {
    activeButton.style.backgroundColor = "#f08080";
    activeButton.style.color = "#ffffff";
  }
}

function deactivateAllCardBtn(parentElement) {
  const activeBtn = parentElement.querySelectorAll(".active");
  console.log("Tell me parent:" + parentElement);
  [].forEach.call(activeBtn, function (e) {
    setDefaultBtnColor(e);
    e.classList.remove("active");
  });
}

function setDefaultBtnColor(e) {
  e.style.backgroundColor = "white";
  e.style.color = "black";
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
