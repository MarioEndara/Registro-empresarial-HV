import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonLabel, IonInput, IonDatetime, IonSelect, 
  IonSelectOption, IonRadioGroup, IonRadio, IonSegment, 
  IonSegmentButton, IonCheckbox, IonTextarea, IonButton, 
  IonItemDivider, ToastController // <-- Importamos Toast
} from '@ionic/angular/standalone';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // <-- Importamos Firestore

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
    IonItem, IonLabel, IonInput, IonDatetime, IonSelect, 
    IonSelectOption, IonRadioGroup, IonRadio, IonSegment, 
    IonSegmentButton, IonCheckbox, IonTextarea, IonButton, 
    IonItemDivider
  ]
})
export class HomePage {
  fechaHoy = new Date().toISOString();

  candidato = {
    nombresApellidos: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    cargoPostula: '',
    nivelAcademico: '',
    aniosExperiencia: null as number | null,
    modalidadTrabajo: '',
    habilidadesTecnicas: [] as string[],
    fechaDisponibleInicio: '',
    aspiracionSalarial: null as number | null,
    resumenProfesional: '',
    aceptaTratamientoDatos: false
  };

  listaHabilidades = [
    'Angular', 'Ionic', 'React', 'Node.js', 
    'Python', 'Java', 'SQL', 'Firebase'
  ];

  constructor(
    private firestore: Firestore,
    private toastCtrl: ToastController
  ) {}

  async guardarCandidato() {
    // 1. Creamos la referencia a la colección 'candidatos'
    const candidatosRef = collection(this.firestore, 'candidatos');
    
    // 2. Guardamos los datos en Firestore (addDoc genera el ID automático)
    try {
      await addDoc(candidatosRef, this.candidato);
      
      // 3. Mostramos un mensaje de éxito
      const toast = await this.toastCtrl.create({
        message: '¡Candidato registrado exitosamente!',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();

      // 4. Limpiamos el formulario
      this.limpiarFormulario();

    } catch (error) {
      console.error('Error al guardar:', error);
      const toast = await this.toastCtrl.create({
        message: 'Error al guardar. Revisa la consola.',
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
    }
  }

  toggleHabilidad(habilidad: string, event: any) {
    if (event.detail.checked) {
      this.candidato.habilidadesTecnicas.push(habilidad);
    } else {
      this.candidato.habilidadesTecnicas = this.candidato.habilidadesTecnicas.filter(h => h !== habilidad);
    }
  }

  limpiarFormulario() {
    this.candidato = {
      nombresApellidos: '',
      correo: '',
      telefono: '',
      fechaNacimiento: '',
      cargoPostula: '',
      nivelAcademico: '',
      aniosExperiencia: null,
      modalidadTrabajo: '',
      habilidadesTecnicas: [],
      fechaDisponibleInicio: '',
      aspiracionSalarial: null,
      resumenProfesional: '',
      aceptaTratamientoDatos: false
    };
  }
}