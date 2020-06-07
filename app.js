//  book class : represent a book

class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

//  ui class : handle ui tasks
class UI{
    static displaybooks(){
       
        const books  = store.getBooks()
        books.forEach(book => UI.addBookToList(book));

    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr')
        // console.log(book.title);
        

        row.innerHTML = 
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class = "btn btn-danger btn-sm danger"><i class="fas fa-trash-alt"></i></a></td>
        <td><a class = "btn btn-info btn-sm info"><i class="fas fa-pencil-alt"></i></a></td>`

        list.appendChild(row)
    }
    static show_alert(message,className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div,form)
        //  vanish in threee seconds
        setTimeout(()=>{document.querySelector('.alert').remove()},3000)

    }
    static clearFields(){
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''

    }    
    static deletebook(el){
        if(el.classList.contains('danger')){
            console.log('coming');            
            el.parentElement.parentElement.remove()
        }

    }
}

//  store class :handles storage

class store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = []
        }else{
            books =JSON.parse(localStorage.getItem('books'))
        }
        return books;



    }
    static addBook(book){
        const books = store.getBooks();
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))

    }
    static removeBooks(isbn){
        console.log('coming in remove books',isbn);
        
        const books = store.getBooks()
        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books))

    }
}

// events to display books
document.addEventListener('DOMContentLoaded',UI.displaybooks)

// event to add the book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    //  prevent actual submit
    e.preventDefault()
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

   
    //  validate the input data
    if (title === '' || author === '' || isbn === ''){
        // alert('please fill all fields')
        UI.show_alert('please fill in all fields','dark')

    }
    else{
        // need to instatiate the book
        const book = new Book(title,author,isbn)
        //  adding book to UI
        UI.addBookToList(book)
         // clear fields
        UI.clearFields()   
        // showing alert message
        UI.show_alert('book added successfully','success')
        // showing alert message
        store.addBook(book)
        
    } 
})

//  event to remove book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    // deleteing from the UI
    UI.deletebook(e.target);
    // console.log(e.target.parentElement.pare);
    
   
    store.removeBooks(e.target.parentElement.parentElement.previousElementSibling.textContent)

    UI.show_alert('book removed','danger')
    // need to delete from the storage
    // console.log(e.target.parentElement.previousElementSibling.textContent);
    
    
    
})
