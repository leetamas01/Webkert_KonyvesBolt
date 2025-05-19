import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { Book } from '../../Book';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
   standalone: true,
   imports: [CommonModule, FormsModule],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  genres = ['Sci-fi', 'Fantasy', 'Horror', 'Romance'];
  selectedGenre: string = '';
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
  pageSize = 50;

  constructor(private bookService: BookService) {}

  currentBook: Partial<Book> = {
    id: '',
    title: '',
    author: '',
    genre: '',
    publishedYear: 0,
  };

  ngOnInit(): void {
    this.loadNewestBooks();
  }

  loadNewestBooks(): void {
    this.bookService.getNewestBooks(this.pageSize).subscribe((data) => {
      this.books = data;
    });
  }

  filterByGenre(): void {
    this.bookService.getBooksByGenre(this.selectedGenre).subscribe((data) => {
      this.books = data;
    });
  }

  sortByAuthor(): void {
    this.bookService.getBooksByAuthorSorted('J. K. Rowling').subscribe((data) => {
      this.books = data;
    });
  }

  async nextPage(): Promise<void> {
    if (this.books.length > 0) {
      const last = this.books[this.books.length - 1];
      const docs = await this.bookService.getNextPage(this.lastDoc!, this.pageSize);
      this.books = docs;
    }
  }
  async onSubmit() {
    if (this.currentBook.id) {
      await this.bookService.updateBook(this.currentBook.id, this.currentBook);
    } else {
      await this.bookService.addBook(this.currentBook);
    }
    this.resetForm();
    this.loadNewestBooks(); 
  }

  resetForm() {
    this.currentBook = {
      id: '',
      title: '',
      author: '',
      genre: '',
      publishedYear: 0,
    };
  }

  editBook(book: Book) {
    this.currentBook = { ...book };
  }

  async deleteBook(bookId: string) {
    await this.bookService.deleteBook(bookId);
    this.loadNewestBooks();
  }
}

