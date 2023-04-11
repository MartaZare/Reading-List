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
  displayForm(false);
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
  } else {
    alert(
      "To add book to the library add the author, title and choose if you've had read this book :)"
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
  if (e == true) {
    registerBook.style.display = "block";
    addBookBtn.style.display = "none";
  } else if (e == false) {
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
  }
}

function readingStatusBtn(btnContainer, readingStatus) {
  const readBtn = document.createElement("button");
  readBtn.classList.add("readBtn");
  readBtn.innerHTML = "Read";

  const notReadBtn = document.createElement("button");
  notReadBtn.classList.add("notreadBtn");
  notReadBtn.innerHTML = "Not read";

  if (readingStatus === "read") {
    readBtn.classList.add("active");
    btnContainer.classList.add("active");
  } else if (readingStatus === "notread") {
    notReadBtn.classList.add("active");
    btnContainer.classList.add("active");
  }

  btnContainer.appendChild(readBtn);
  btnContainer.appendChild(notReadBtn);

  colorActiveBtn(btnContainer, readingStatus);

  readBtn.addEventListener("click", () =>
    activateBtn(readBtn, btnContainer, "read")
  );
  notReadBtn.addEventListener("click", () =>
    activateBtn(notReadBtn, btnContainer, "notread")
  );
}

function activateBtn(statusBtn, btnContainer, readingStatus) {
  deactivateAllCardBtn(btnContainer);
  list[parseInt(btnContainer.classList[1])].status = readingStatus;
  statusBtn.classList.add("active");
  colorActiveBtn(btnContainer, readingStatus);
}

function colorActiveBtn(btnContainer, readingStatus) {
  const activeButton = btnContainer.querySelector(".active");
  if (readingStatus === "read") {
    activeButton.style.backgroundColor = "#90ee90";
    activeButton.style.color = "#ffffff";
  } else if (readingStatus === "notread") {
    activeButton.style.backgroundColor = "#f08080";
    activeButton.style.color = "#ffffff";
  }
}

function deactivateAllCardBtn(btnContainer) {
  const activeBtn = btnContainer.querySelectorAll(".active");
  [].forEach.call(activeBtn, function (e) {
    setDefaultBtnColor(e);
    e.classList.remove("active");
  });
}

function setDefaultBtnColor(e) {
  e.style.backgroundColor = "white";
  e.style.color = "black";
}

function removeBookBtn(btnContainer) {
  const remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = "Remove";
  btnContainer.appendChild(remove);
  remove.addEventListener("click", function (e) {
    list.splice(e.target.btnContainer.classList.item(1), 1);
    displayShelf();
  });
}
