export interface Book {
  id: string;              
  title: string;          
  author: string;         
  publishedYear: number;   
  genre: string;           
  isbn: string;            
  pages: number;           
  available: boolean;      
  coverUrl?: string;      
  description?: string;    
}