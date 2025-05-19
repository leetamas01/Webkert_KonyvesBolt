import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'registration',
        loadComponent: () => import('./pages/registration/registration.component').then(m =>m.RegistrationComponent)
    },
    {
        path: 'book',
        loadComponent: () => import('./book/book.component').then(m =>m.BookComponent)
    },
    {
        path: 'book-list',
        loadComponent: () => import('./book-list/book-list.component').then(m =>m.BookListComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];