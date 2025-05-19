import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData,CollectionReference , doc, docData, addDoc, updateDoc, deleteDoc,query,where,orderBy,limit,startAfter,getDocs, QueryDocumentSnapshot, DocumentData} from '@angular/fire/firestore';
import { Book } from '../../../Book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookCollection!: CollectionReference;

  constructor(private firestore: Firestore) {
    this.bookCollection = collection(this.firestore, 'books');
  }


  addBook(book: Partial<Book>): Promise<any> {
    const bookCollection = collection(this.firestore, 'books');
    return addDoc(bookCollection, book);
  }

  getBooks(): Observable<Book[]> {
    return collectionData(this.bookCollection, { idField: 'id' }) as Observable<Book[]>;
  }

  getBookById(id: string): Observable<Book> {
    const bookDoc = doc(this.firestore, `books/${id}`);
    return docData(bookDoc, { idField: 'id' }) as Observable<Book>;
  }

  updateBook(id: string, book: Partial<Book>): Promise<void> {
    const bookDoc = doc(this.firestore, `books/${id}`);
    return updateDoc(bookDoc, book);
  }


  deleteBook(id: string): Promise<void> {
    const bookDoc = doc(this.firestore, `books/${id}`);
    return deleteDoc(bookDoc);
  }

  getBooksByGenre(genre: string): Observable<Book[]> {
    const q = query(this.bookCollection, where('genre', '==', genre));
    return collectionData(q, { idField: 'id' }) as Observable<Book[]>;
  }

  getNewestBooks(limitCount: number): Observable<Book[]> {
    const q = query(this.bookCollection, orderBy('publishedYear', 'desc'), limit(limitCount));
    return collectionData(q, { idField: 'id' }) as Observable<Book[]>;
  }

  getBooksByAuthorSorted(author: string): Observable<Book[]> {
    const q = query(
      this.bookCollection,
      where('author', '==', author),
      orderBy('publishedYear', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Book[]>;
  }

  async getNextPage(lastDoc: QueryDocumentSnapshot<DocumentData>, pageSize: number): Promise<Book[]> {
    const q = query(
      this.bookCollection,
      orderBy('title'),
      startAfter(lastDoc),
      limit(pageSize)
    );

    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
  }
}
