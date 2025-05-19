import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../shared/services/book.service';
import { Book } from '../../Book';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];

  genres: string[] = [];
  selectedGenre: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.filteredBooks = data;
      this.genres = [...new Set(data.map(book => book.genre))];
    });
  }

  filterByGenre() {
    if (this.selectedGenre === '') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(
        book => book.genre === this.selectedGenre
      );
    }
  }

  sortByAuthor() {
    this.filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
  }

  loadNewestBooks() {
   this.filteredBooks = [...this.books].sort((a, b) => b.publishedYear - a.publishedYear);
  }

  pageSize = 5;
currentPage = 1;

get pagedBooks(): Book[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  return this.filteredBooks.slice(startIndex, startIndex + this.pageSize);
}

nextPage() {
  const maxPage = Math.ceil(this.filteredBooks.length / this.pageSize);
  if (this.currentPage < maxPage) {
    this.currentPage++;
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

  async createBook(book: Book) {
    await this.bookService.addBook(book);
  }

  async updateBook(bookId: string, updated: Partial<Book>) {
    await this.bookService.updateBook(bookId, updated);
  }

  async deleteBook(bookId: string) {
    await this.bookService.deleteBook(bookId);
  }

  async loadSingleBook(id: string) {
    const book = await firstValueFrom(this.bookService.getBookById(id));
    console.log('Single book:', book);
  }
}

