let list = [];
const shelf = document.getElementById("shelf");

function Book(title, author, pages) {
  (this.title = title), (this.author = author), (this.pages = pages);
}

const book1 = new Book("Revenge on cupcakes", "A. L. Smith", "236");
const book2 = new Book("Lust", " A. Don Carlos", "147");
const book3 = new Book("Harry Potter", "J. K. Rowling", "598");

function addToList(book1, book2, book3) {
  list.push(book1, book2, book3);
  displayList(list.length);
}

addToList(book1, book2, book3);

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
