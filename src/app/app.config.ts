import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { HomePage } from './home/home.page';
import { ConsultarPage } from './consultar/consultar.page';

// Importaciones para los íconos
import { addIcons } from 'ionicons';
import { arrowBack, refreshOutline } from 'ionicons/icons';

// Importaciones de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideRouter([
      { path: '', component: HomePage },
      { path: 'consultar', component: ConsultarPage }
    ]),
    
    // Conexión a Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
};

// AQUÍ ESTÁ LA LÍNEA QUE FALTABA: Registramos los íconos globalmente
addIcons({ arrowBack, refreshOutline });