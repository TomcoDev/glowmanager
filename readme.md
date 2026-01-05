GlowManager - Sistema de Gestión para Peluquería y Estética
GlowManager es una solución integral diseñada para optimizar la administración de salones de belleza y servicios personalizados. Desarrollado específicamente para la peluquería de Minerva, el sistema combina una estética de alta gama con una funcionalidad robusta para el manejo de clientes, servicios y agendamientos.

Tecnologías Utilizadas
Este proyecto utiliza un stack moderno para garantizar velocidad, interactividad y escalabilidad:

Frontend: React.js con Vite para una experiencia de usuario fluida.

Backend: Node.js y Express siguiendo la arquitectura MVC.

Base de Datos: PostgreSQL / MySQL gestionado profesionalmente.

Interfaz y UX:

Framer Motion para animaciones fluidas.

SweetAlert2 para notificaciones y confirmaciones elegantes.

React-Select para búsqueda avanzada de datos (Select2 style).

React-Calendar para una gestión visual de turnos.

Características Principales
Gestión de Clientes
Registro completo de clientes (Nombre, WhatsApp, Email).

Borrado Lógico: Sistema de inactivación y reactivación de clientes para mantener la integridad de los datos.

Interfaz colapsable para optimizar el espacio de trabajo.

Configuración de Servicios
Administración de catálogo de servicios con precios y duraciones.

Buscador interactivo en tiempo real para agilizar la edición.

Agenda de Turnos
Calendario interactivo para filtrado de citas por día.

Sistema de agendamiento con búsqueda inteligente de clientes y servicios.

Seguimiento de estados de citas (Confirmado / Cancelado).

Estructura del Proyecto
Siguiendo los estándares de desarrollo profesional, el código se organiza de la siguiente manera:

GlowManager/
├── backend/
│   ├── config/       # Conexión a DB
│   ├── controllers/  # Lógica de negocio
│   ├── models/       # Funciones que tocan la DB
│   └── routes/       # Definición de Endpoints API
├── frontend/
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── pages/      # Vistas principales
│   │   └── App.jsx     # Enrutamiento y lógica global
└── .gitignore        # Archivos excluidos del repositorio

Instalación y Configuración
1- Clonar el repositorio:
´git clone https://github.com/TomcoDev/GlowManager.git´

2- Configurar el Backend:

Ir a la carpeta backend y ejecutar ´npm install.´

Configurar las variables de entorno en el archivo ´.env´.

Iniciar con ´npm start´ o ´nodemon server.js´.

Configurar el Frontend:

Ir a la carpeta ´frontend´ y ejecutar ´npm install´.

Iniciar el servidor de desarrollo con ´npm run dev´.

Autor
Néstor Martínez - Developer Full Stack Junior - GitHub