import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router'; 
import { Firestore, collection, getDocs } from '@angular/fire/firestore'; 
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
  candidatos: any[] = []; 
  cargando = true;

  // Inyectamos Router y Location
  constructor(private firestore: Firestore, private router: Router, private location: Location) {}

  async ngOnInit() {
    await this.cargarCandidatos();
  }

  // Función para el botón de la flechita en la pantalla
  volverAlFormulario() {
    this.router.navigate(['/']);
  }

  // --- ESTA ES LA PARTE DEL BOTÓN FÍSICO DE ANDROID ---
  // Escucha cuando el usuario usa el gesto o botón de atrás en el celular
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // Si el usuario intenta ir atrás, lo mandamos al inicio de forma limpia
    this.location.back(); 
  }
  // ----------------------------------------------------

  async cargarCandidatos() {
    this.cargando = true;
    try {
      const candidatosRef = collection(this.firestore, 'candidatos');
      const querySnapshot = await getDocs(candidatosRef);
      
      this.candidatos = [];
      querySnapshot.forEach((doc) => {
        this.candidatos.push({ id: doc.id, ...doc.data() });
      });
      
    } catch (error) {
      console.error('Error al cargar candidatos:', error);
    } finally {
      this.cargando = false;
    }
  }
}