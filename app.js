let list = [];
const shelf = document.getElementById("shelf");
const addBookBtn = document.getElementById("add");
const fauthor = document.getElementById("fauthor");
const ftitle = document.getElementById("ftitle");
const fpages = document.getElementById("fpages");

function Book(title, author, pages) {
  (this.title = title), (this.author = author), (this.pages = pages);
}

function displayList(size) {
  for (let i = 0; i < size; i++) {
    const oneBook = document.createElement("div");
    oneBook.classList.add("bookCard");
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
  }
}

function displayForm(e) {
  if (e == "on") {
    document.getElementById("bookForm").style.display = "block";
  } else {
    document.getElementById("bookForm").style.display = "none";
  }
}

function submitForm() {
  document.getElementById("form1");
  console.log("form subbmited)");
  addBook();
  reloadForm();
}

function addBook() {
  list.push(
    new Book(
      document.getElementById("ftitle").value,
      document.getElementById("fauthor").value,
      document.getElementById("fpages").value
    )
  );
}

function reloadForm() {
  ftitle.value = "";
  fauthor.value = "";
  fpages.value = "";
}
