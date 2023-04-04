// CLASSES APPROACH //

// Declaring used varibales
const listContainer = document.querySelector('.list_container');
const bookListContainer = document.querySelector('.list_wrapper');
const addBookContainer = document.querySelector('.add_book');
const contactContainer = document.querySelector('.contact');
const linkItem = document.querySelectorAll('.nav_links');
const form = document.getElementById('form');
const date = document.getElementById('date');
const subHeading = document.querySelector('#sub--heading');

// Populating the Date
function populateDate() {
  const today = new Date();
  date.innerHTML = `${today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} ${today.toLocaleTimeString()}`;
}

setInterval(populateDate, 1000);

// Class Book ('Creating the Booklist')
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static addBook(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static removeBook(id) {
    const books = Book.getBooks();
    let flag = false;
    books.forEach((book, index) => {
      if (book.id === parseInt(id, 10)) {
        books.splice(index, 1);
        flag = true;
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
    return flag;
  }

  static displayBooks() {
    const books = Book.getBooks();

    books.forEach((book) => {
      const bookMarkup = `<div class="book_list">
        <span class="book_text">"${book.title}" by ${book.author} </span>
        <button class="remove" id=${book.id}>Remove</button>
        </div>`;
      listContainer.innerHTML += bookMarkup;
      const deleteBtn = document.querySelectorAll('.remove');
      deleteBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          const res = Book.removeBook(btn.id);
          btn.parentElement.remove();
          if (res) {
            btn.parentElement.remove();
          }
          if (listContainer.innerHTML === '') {
            listContainer.style.border = 'none';
            subHeading.innerHTML = '"No books to display"';
          }
        });
      });
    });
  }
}

// Code to add book to the list
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const msg = document.querySelector('.error-message');
  function clear() { msg.innerHTML = ''; }

  // Declaring variables for the booklist, and book's properties
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const id = books.length + 1;

  if (title.value === '' || author.value === '') {
    msg.classList.remove('success');
    msg.innerHTML = 'Please enter the book title and author';
    setTimeout(clear, 2000);
  } else {
    const b = new Book(id, title.value, author.value);
    Book.addBook(b);
    form.reset();
    msg.classList.add('success');
    msg.innerHTML = 'The book is added successfully';
    setTimeout(clear, 1000);
    listContainer.innerHTML = '';
    if (listContainer.innerHTML === '') {
      listContainer.style.border = '2px solid #000';
      subHeading.innerHTML = '';
    }
    Book.displayBooks();
  }
});

Book.displayBooks();

// Creating Single Page Application (SPA)
function spa() {
// Function to hide & display different sections
  function openPage(i) {
    addBookContainer.style.display = 'none';
    contactContainer.style.display = 'none';
    bookListContainer.style.display = 'none';

    linkItem.forEach((item) => {
      item.classList.remove('active');
    });

    if (i === 1) {
      addBookContainer.style.display = 'flex';
      linkItem[i].classList.add('active');
    } else if (i === 2) {
      contactContainer.style.display = 'flex';
      linkItem[i].classList.add('active');
    } else {
      bookListContainer.style.display = 'flex';
      linkItem[i].classList.add('active');
    }
  }

  for (let i = 0; i < linkItem.length; i += 1) {
    linkItem[i].addEventListener('click', () => {
      openPage(i);
    });
  }
}
spa();
