import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "konyvesbolt-89b12", appId: "1:686014106855:web:5885c653163e6d9700e642", storageBucket: "konyvesbolt-89b12.firebasestorage.app", apiKey: "AIzaSyBtWD8UIp-IyPjm3IF7WwH3b4UHlxlS108", authDomain: "konyvesbolt-89b12.firebaseapp.com", messagingSenderId: "686014106855" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
