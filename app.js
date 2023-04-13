let list = [];

const addBookBtn = document.getElementById("addBookBtn");
const bookshelfDiv = document.getElementById("bookshelfDiv");
const submitFormBtn = document.getElementById("submitFormBtn");
const fullFormDivForDispay = document.getElementById("fullFormDivForDispay");
const formAuthorInput = document.getElementById("formAuthorInput");
const formTitleInput = document.getElementById("formTitleInput");
const isReadInput = document.getElementById("isReadInput");
const isNotReadInput = document.getElementById("isNotReadInput");

submitFormBtn.addEventListener("click", () => addBook());

function addBook() {
  displayForm(false);
  submitForm();
  resetFormFields();
  displayShelf();
}

function submitForm() {
  if (formAuthorInput.value === "") {
    alert("To add book to the library add the author.");
    return;
  }

  if (formTitleInput.value === "") {
    alert("To add book to the library add the author.");
    return;
  }

  if (!isReadInput.checked && !isNotReadInput.checked) {
    alert("To add book to the library mark if you've read the book.");
    return;
  }

  addInformationToList();
}

function resetFormFields() {
  formTitleInput.value = "";
  formAuthorInput.value = "";
  isReadInput.checked = false;
  isNotReadInput.checked = false;
}

function displayShelf() {
  clearShelf();
  loadShelf();
}

function displayForm(isDisplayed) {
  if (isDisplayed) {
    fullFormDivForDispay.style.display = "block";
    addBookBtn.style.display = "none";
  } else {
    fullFormDivForDispay.style.display = "none";
    addBookBtn.style.display = "block";
  }
}

function Book(title, author, isRead) {
  (this.title = title), (this.author = author), (this.isRead = isRead);
}

function addInformationToList() {
  list.push(
    new Book(formTitleInput.value, formAuthorInput.value, isReadInput.checked)
  );
}

function clearShelf() {
  bookshelfDiv.innerHTML = "";
}

function loadShelf() {
  for (let i = 0; i < list.length; i++) {
    const book = list[i];

    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.classList.add(i);
    bookshelfDiv.appendChild(bookCard);

    const bookCardTitleAuthor = document.createElement("div");
    bookCardTitleAuthor.classList.add("bookCardTitleAuthor");
    bookCard.appendChild(bookCardTitleAuthor);

    const bookCardBtns = document.createElement("div");
    bookCardBtns.classList.add("bookCardBtns");
    bookCardBtns.classList.add(i);
    bookCard.appendChild(bookCardBtns);

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerHTML += book.title;
    bookCardTitleAuthor.appendChild(title);

    const author = document.createElement("div");
    author.classList.add("author");
    author.innerHTML += book.author;
    bookCardTitleAuthor.appendChild(author);

    createReadingStatusBtn(bookCardBtns, book.isRead);
    createRemoveBookBtn(bookCardBtns);
  }
}

function createReadingStatusBtn(btnContainer, isRead) {
  const readBtn = document.createElement("button");
  readBtn.classList.add("readBtn");
  readBtn.innerHTML = "Read";

  const notReadBtn = document.createElement("button");
  notReadBtn.classList.add("notreadBtn");
  notReadBtn.innerHTML = "Not read";

  if (isRead) {
    readBtn.classList.add("active");
    btnContainer.classList.add("active");
  } else if (!isRead) {
    notReadBtn.classList.add("active");
    btnContainer.classList.add("active");
  }

  btnContainer.appendChild(readBtn);
  btnContainer.appendChild(notReadBtn);

  colorActiveBtn(btnContainer, isRead);

  readBtn.addEventListener("click", () =>
    activateBtn(readBtn, btnContainer, true)
  );
  notReadBtn.addEventListener("click", () =>
    activateBtn(notReadBtn, btnContainer, false)
  );
}

function activateBtn(statusBtn, btnContainer, isRead) {
  deactivateAllCardBtn(btnContainer);
  const bookIndex = parseInt(btnContainer.classList[1]);
  list[bookIndex].isRead = isRead;
  statusBtn.classList.add("active");
  colorActiveBtn(btnContainer, isRead);
}

function colorActiveBtn(btnContainer, isRead) {
  const activeButton = btnContainer.querySelector(".active");
  if (isRead === true) {
    activeButton.style.backgroundColor = "#90ee90";
    activeButton.style.color = "#ffffff";
  } else if (isRead === false) {
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

function setDefaultBtnColor(btn) {
  btn.style.backgroundColor = "#ffffff";
  btn.style.color = "#000000";
}

function createRemoveBookBtn(btnContainer) {
  const remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = "Remove";
  btnContainer.appendChild(remove);
  remove.addEventListener("click", function (e) {
    list.splice(e.target.btnContainer.classList.item(1), 1);
    displayShelf();
  });
}
