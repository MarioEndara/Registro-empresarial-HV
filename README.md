# Registro Empresarial HV

## Desarrollo y nombre de la aplicación
El desarrollo de la aplicación llamada TalentFlow es una solución móvil como respuesta a la necesidad identificada por la empresa ficticia de TalenFlow S.A. En el área de recursos humanos la recepción de CV se realizaba mediante correo electrónico, ocasionando dificultades para clasificar, almacenar y consultar la información de postulantes a diferentes cargos.

Al presentar dicha situación, se desarrolló un producto mínimo viable (MVP) que solucione el problema, la aplicación movil permite el registro de los aspirantes a treavés de un formulario organizado y almacena la información directamente a un servicio en la nube Firebase. Por tanto se busca sustituir el manejo de documentos mediante emails por un mecanismo centralizado que facilite adminstración, conservación y consulta de perfiles profesionales. 

## Integrante
- [Mario Endara]

## Objetivo y funcionalidades implementadas
El objetivo principal era crear una app que permitiera registrar, validar, almacenar y consultar perfiles profesionales usando Ionic y Firebase.

Lo que logramos implementar fue:
- Un formulario completo por secciones con validaciones reales.
- Guardado persistente de cada candidato en Firestore.
- Una segunda pantalla para consultar el listado de todos los postulantes.
- Un sistema de vista de detalle con acordeón para no saturar la pantalla principal.
- Mensajes de éxito o error y un indicador de carga (spinner) para que el usuario sepa qué está pasando.
- Limpieza automática del formulario después de un registro exitoso.

## Tecnologías y componentes Ionic utilizados
- Frontend: Ionic Framework con Angular - modo Standalone
- Base de datos: Firebase Cloud Firestore.
- Librerías: AngularFire.

Componentes de Ionic utilizados:
Usamos más de 8 componentes para cumplir con la rúbrica: `ion-input`, `ion-datetime`, `ion-radio-group` con `ion-radio`, `ion-select`, `ion-checkbox`, `ion-textarea`, `ion-button`, `ion-list`, `ion-item`, `ion-card`, `ion-spinner`, `ion-accordion` y los `ion-toast`.

## Arquitectura (Estructura de carpetas y servicio Firebase)
El proyecto está estructurado de la siguiente manera:
- `src/app/home/`: Aquí vive la vista del formulario. En esta carpeta se inyecta el servicio de Firestore para usar `addDoc` y guardar los datos, además de contener la lógica de las validaciones y los toasts.
- `src/app/consultar/`: Aquí está la vista de consulta. Usa `getDocs` para traer el listado de candidatos y mostrarlos en tarjetas con su respectivo detalle.
- `src/environments/`: Aquí guardamos la configuración de Firebase (`environment.ts`).
- `src/app/app.config.ts`: Aquí se inicializa la app, se configuran las rutas y se inyectan los proveedores de Firebase (`provideFirebaseApp` y `provideFirestore`).

La conexión a Firebase se hace inyectando la instancia de `Firestore` en los componentes. Cuando el usuario le da guardar, el servicio intercepta los datos y los envía directo a la nube.

## Modelo de datos
Toda la información se guarda en la colección llamada `candidatos`. 

Campos y tipos de datos:
- `nombresApellidos` (string)
- `correo` (string)
- `telefono` (string)
- `fechaNacimiento` (string / fecha)
- `cargoPostula` (string)
- `nivelAcademico` (string)
- `aniosExperiencia` (number)
- `modalidadTrabajo` (string)
- `habilidadesTecnicas` (array de strings)
- `fechaDisponibleInicio` (string / fecha)
- `aspiracionSalarial` (number)
- `resumenProfesional` (string)
- `aceptaTratamientoDatos` (boolean)
- `fechaCreacion` (timestamp generado por `serverTimestamp()`)

Ejemplo de un documento ficticio:
```json
{
  "nombresApellidos": "Ana Gómez",
  "correo": "ana.gomez@email.com",
  "telefono": "0998765432",
  "fechaNacimiento": "1998-05-15",
  "cargoPostula": "Desarrollador de Software",
  "nivelAcademico": "universitario",
  "aniosExperiencia": 3,
  "modalidadTrabajo": "remoto",
  "habilidadesTecnicas": ["Angular", "Firebase"],
  "fechaDisponibleInicio": "2024-06-01",
  "aspiracionSalarial": 1200,
  "resumenProfesional": "Desarrolladora frontend con experiencia en Angular y creación de interfaces responsivas...",
  "aceptaTratamientoDatos": true,
  "fechaCreacion": "2024-05-20T14:30:00Z"
}
