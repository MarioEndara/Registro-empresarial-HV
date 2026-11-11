import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs } from '@angular/fire/firestore'; // <-- Usamos getDocs
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
  IonSpinner, IonItem, IonLabel, IonAccordion, 
  IonAccordionGroup, IonButton, IonIcon, IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonSpinner, IonItem, IonLabel, IonAccordion, 
    IonAccordionGroup, IonButton, IonIcon, IonButtons
  ]
})
export class ConsultarPage implements OnInit {
  candidatos: any[] = []; // <-- Ahora es un arreglo normal
  cargando = true;

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.cargarCandidatos();
  }

  async cargarCandidatos() {
    this.cargando = true;
    try {
      const candidatosRef = collection(this.firestore, 'candidatos');
      const querySnapshot = await getDocs(candidatosRef); // <-- getDocs aquí
      
      this.candidatos = [];
      querySnapshot.forEach((doc) => {
        // Agregamos el ID del documento a los datos
        this.candidatos.push({ id: doc.id, ...doc.data() });
      });
      
    } catch (error) {
      console.error('Error al cargar candidatos:', error);
    } finally {
      this.cargando = false;
    }
  }
}