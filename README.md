# TalentFlow SA - Registro de Hojas de Vida

Este es el proyecto que hicimos para el taller de Desarrollo de Aplicaciones Móviles. La idea era armar un prototipo (MVP) para que la empresa TalentFlow SA pueda registrar los datos de los postulantes en un formulario y guardarlos en la nube, en lugar de andar recibiendo hojas de vida por correo.

Lo hicimos usando Ionic con Angular (en modo Standalone) y Firebase Cloud Firestore para la base de datos.

## ¿Qué hace la app?

La aplicación tiene dos partes principales:

1. **Registrar Candidato:** Es un formulario bien completo, dividido por secciones (datos personales, perfil profesional, disponibilidad, presentación y un consentimiento). Tiene validaciones para que no se guarden datos incompletos, el típico mensaje de "éxito" abajo cuando guardas, y un spinner que da vueltas mientras se sube la info a Firebase. Cuando terminas, el formulario se limpia solo.
2. **Consultar Candidatos:** Es la otra pantalla. Aquí se carga la lista de todas las personas que hemos registrado, trayendo los datos directo de Firestore. Se muestran en tarjetas con un resumen rápido, y si haces clic en "Ver detalle completo", se abre un acordeón con toda la información (teléfono, habilidades, resumen, etc.). También le pusimos un botón de recargar arriba por si acaso.

## Componentes de Ionic que usamos

Para cumplir con lo que pedía la rúbrica, usamos un montón de componentes. Los principales son:
`ion-input`, `ion-datetime`, `ion-radio-group` con `ion-radio`, `ion-select`, `ion-checkbox`, `ion-textarea`, `ion-button`, `ion-list`, `ion-item`, `ion-card`, `ion-spinner`, `ion-accordion` y los `ion-toast` para las notificaciones.

## ¿Cómo correrlo en local?

Si quieres probarlo en tu compu, solo tienes que hacer lo siguiente:

1. Clonar el repo:
   ```bash
   git clone https://github.com/MarioEndara/Registro-empresarial-HV.git