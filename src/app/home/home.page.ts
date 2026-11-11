import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Para el botón de ir a consultar
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonLabel, IonInput, IonDatetime, IonSelect, 
  IonSelectOption, IonRadioGroup, IonRadio, IonSegment, 
  IonSegmentButton, IonCheckbox, IonTextarea, IonButton, 
  IonItemDivider, IonSpinner, ToastController 
} from '@ionic/angular/standalone';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterLink, // Importado para que funcione el botón de consultar
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
    IonItem, IonLabel, IonInput, IonDatetime, IonSelect, 
    IonSelectOption, IonRadioGroup, IonRadio, IonSegment, 
    IonSegmentButton, IonCheckbox, IonTextarea, IonButton, 
    IonItemDivider, IonSpinner
  ]
})
export class HomePage {
  fechaHoy = new Date().toISOString();
  guardando = false; 

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

  // --- AQUÍ ESTÁ LA FUNCIÓN ACTUALIZADA CON VALIDACIONES ---
  async guardarCandidato() {
    // 1. VALIDACIONES REALES ANTES DE ENVIAR A FIREBASE
    if (!this.candidato.nombresApellidos || this.candidato.nombresApellidos.length < 3) {
      return this.mostrarToast('El nombre debe tener al menos 3 caracteres', 'danger');
    }
    if (!this.candidato.correo || !this.candidato.correo.includes('@')) {
      return this.mostrarToast('El correo electrónico no es válido', 'danger');
    }
    if (!this.candidato.telefono || this.candidato.telefono.length < 7) {
      return this.mostrarToast('El teléfono debe tener al menos 7 dígitos', 'danger');
    }
    if (!this.candidato.habilidadesTecnicas || this.candidato.habilidadesTecnicas.length === 0) {
      return this.mostrarToast('Selecciona al menos una habilidad técnica', 'danger');
    }
    if (!this.candidato.resumenProfesional || this.candidato.resumenProfesional.length < 30) {
      return this.mostrarToast('El resumen profesional debe tener al menos 30 caracteres', 'danger');
    }
    if (!this.candidato.aceptaTratamientoDatos) {
      return this.mostrarToast('Debes aceptar el tratamiento de datos', 'danger');
    }

    // 2. SI PASA TODAS LAS VALIDACIONES, GUARDAMOS EN FIREBASE
    this.guardando = true; 
    
    try {
      const candidatosRef = collection(this.firestore, 'candidatos');
      
      await addDoc(candidatosRef, {
        ...this.candidato,
        fechaCreacion: serverTimestamp() 
      });
      
      this.mostrarToast('¡Candidato registrado exitosamente!', 'success');
      this.limpiarFormulario();

    } catch (error) {
      console.error('Error al guardar:', error);
      this.mostrarToast('Error al guardar. Revisa la consola.', 'danger');
    } finally {
      this.guardando = false; 
    }
  }

  // Función auxiliar para mostrar los mensajes de éxito o error
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      color: color,
      position: 'bottom'
    });
    await toast.present();
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
      nombresApellidos: '', correo: '', telefono: '', fechaNacimiento: '',
      cargoPostula: '', nivelAcademico: '', aniosExperiencia: null,
      modalidadTrabajo: '', habilidadesTecnicas: [], fechaDisponibleInicio: '',
      aspiracionSalarial: null, resumenProfesional: '', aceptaTratamientoDatos: false
    };
  }
}