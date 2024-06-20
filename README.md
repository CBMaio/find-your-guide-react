# TourFinder

Bienvenido a TourFinder, tu aplicación de referencia para encontrar guías locales en todo el mundo. Este proyecto es el componente frontend de la aplicación TourFinder, diseñado para conectar a turistas con guías locales que ofrecen tours y servicios personalizados.

## Comenzando

### Prerrequisitos

Antes de comenzar, asegúrate de tener Node.js instalado en tu máquina. Si no lo tienes, puedes descargarlo desde el [sitio oficial de Node.js](https://nodejs.org/).

### Instalación

Clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/CBMaio/find-your-guide-react.git
cd find-your-guide-react
```

Instala las dependencias necesarias:

```bash
npm install
```

### Ejecutando la Aplicación

Para ejecutar la aplicación en modo de desarrollo:

```bash
npm start
```

Esto iniciará la aplicación frontend en [http://localhost:3000](http://localhost:3000). Asegúrate de que los servicios de backend estén ejecutándose en [http://localhost:8080](http://localhost:8080) para manejar las solicitudes de API. Si tu backend se está ejecutando en una URL diferente, actualiza la `API_URL` en el archivo `src/features/constants.js` según corresponda.

## Características

TourFinder permite a los usuarios:

- Registrarse como turista o guía utilizando correo electrónico/contraseña o servicios de terceros (Google, Apple ID, Facebook).
- Gestionar perfiles, incluyendo la carga de fotos de perfil y especificando ubicaciones de servicio para los guías.
- Agregar o eliminar servicios como tours individuales, tours grupales y servicios de traducción (solo guías).
- Buscar guías basado en ubicación, idiomas hablados y servicios ofrecidos.
- Ver perfiles detallados de los guías incluyendo credenciales, viajes pasados, reseñas y calificaciones.
- Reservar guías con verificaciones de disponibilidad en tiempo real y gestionar reservas a través de la aplicación.

## Recursos Adicionales

- [Repositorio Frontend](https://github.com/CBMaio/find-your-guide-react)
- [Backend de Chat Typescript.js](https://github.com/gregoriocarranza/findYourGuide-ChatTypescript)
- [Repositorio Backend Java](https://github.com/FacuMartinezVidal/findyourguide)

## Contribuyendo

¡Invitamos contribuciones a TourFinder! Por favor lee nuestras directrices de contribución y envía pull requests a nuestro repositorio.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.
