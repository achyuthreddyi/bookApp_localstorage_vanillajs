//bookclass :represent a book
class Book {
    constructor(title, author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//ui class : handle tasks
class UI {
    static displaybooks(){
      
        const books = Store.getBooks();
        // add book to list in the ui class
        books.forEach( (book)=>UI.addBookToList(book))
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row  = document.createElement('tr');
        row.innerHTML = `
        <td> ${book.title}</td>
        <td> ${book.author}</td>
        <td> ${book.isbn}</td>
        <td> <a href="#" class="btn btn-danger btn-sm delete"> </a></td>
        `;
        list.appendChild(row)
    }

    static clearfield(){
        document.getElementById('title').value =''
        document.getElementById('author').value =''
        document.getElementById('isbn').value =''
    }
    // static show_alert(message,className){
    //     console.log(message);
    //     console.log(className);        
    //     const div = document.createElement('div');
    //     div.className = `alert alert-${className}`
    //     div.appendChild(document.createTextNode(message));
    //     // const container = document.querySelector('.container');
    //     // const form = document.querySelector('#book-form');
    //     // container.insertBefore(div,form);
    //     const container = document.querySelector('.container');
    //     const form = document.querySelector('#book-form');
    //     container.insertBefore(div, form);

    // }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        console.log(div.className);
        
        div.appendChild(document.createTextNode(message));
        // const container = document.getElementsByClassName('container')
        // const table = document.getElementsByClassName('table')
        // const form = document.getElementById('book-form');

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // make vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)  
      }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }
    }
}


//storeclass : storage is handled
class Store{
    static getBooks(){ 
        let books ;
        if (localStorage.getItem(`books`) === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;

    }
    static addBook(book){
        const books = Store.getBooks()
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))

    }
    static removeBook(isbn){
        const books = Store.getBooks()
        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        });
        localStorage.setItem('books',JSON.stringify(books))
    }
}


//events : display books
document.addEventListener('DOMContentLoaded', UI.displaybooks)


// event: add a book
document.querySelector('#book-form').addEventListener('submit',(e) =>{
    // prevent the default action
    e.preventDefault();
    // get form values    
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value
    // validate a book
    if ( title === '' || author === '' || isbn === ''){
        // UI.show_alert('please fill something' ,'danger')
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else{
        // instanciate a book
    const book = new Book(title,author,isbn);

    // add book to ui
    UI.addBookToList(book)
    // add book to local storege
    Store.addBook(book)
    // show success message
    UI.showAlert('book added' , 'success')
    //clear fields
    UI.clearfield()
    } 
    
})


// event : remove a book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    // remove book from UI
    UI.deleteBook(e.target)  
    // remove book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    // show delete message
    UI.showAlert('book deleted' , 'success')  
})

