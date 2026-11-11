import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { HomePage } from './home/home.page';
import { ConsultarPage } from './consultar/consultar.page'; // <-- Importamos la nueva página

// Importaciones de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideRouter([
      { path: '', component: HomePage },
      { path: 'consultar', component: ConsultarPage } // <-- Agregamos la ruta
    ]),
    
    // Conexión a Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
};