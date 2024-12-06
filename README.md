
# **Sports Management System**

Un sistema de gestión de reservas de instalaciones deportivas desarrollado con una arquitectura **frontend-backend** utilizando React, Node.js y MongoDB.

## **Características**
- **Autenticación:**
  - Registro de usuarios con encriptación de contraseñas.
  - Inicio de sesión con **JSON Web Tokens (JWT)**.
  - Redirección basada en estado de autenticación.
- **Gestión de Reservas:**
  - Crear, actualizar, y eliminar reservas de instalaciones deportivas.
  - Selección de instalaciones predefinidas.
  - Restricción de selección de horas en incrementos de 15 minutos.
- **Interfaz de Usuario:**
  - Interfaz moderna y responsiva construida con **React** y estilizada con **Tailwind CSS**.
  - Animaciones modernas, incluyendo un logo animado geométrico.
- **Backend API:**
  - API RESTful construida con **Node.js** y **Express**.
  - Validaciones y manejo de errores.
- **Base de Datos:**
  - Base de datos MongoDB para persistir usuarios y reservas.

---

## **Tecnologías Usadas**
### **Frontend:**
- React.js
- Tailwind CSS
- Axios (para consumir la API)
  
### **Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose (ORM para MongoDB)
- JWT (Autenticación)

---

## **Instalación**

Sigue estos pasos para configurar el proyecto en tu máquina:

### **1. Clonar el repositorio**
```bash
git clone <URL_DEL_REPOSITORIO>
```

### **2. Configurar el Backend**
1. Ve al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env` en el directorio `backend` y agrega:
     ```env
     MONGO_URI=mongodb://127.0.0.1:27017/sports_management
     JWT_SECRET=tu_secreto_jwt
     PORT=5001
     ```
4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   El servidor se ejecutará en `http://localhost:5001`.

### **3. Configurar el Frontend**
1. Ve al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```
   La aplicación se abrirá en `http://localhost:3000`.

---

## **Uso**
### **1. Registro e Inicio de Sesión**
- Regístrate como nuevo usuario.
- Inicia sesión para acceder al sistema de reservas.

### **2. Reservar Instalaciones**
- Selecciona una instalación predefinida desde el menú desplegable.
- Elige la fecha y hora (incrementos de 15 minutos).
- Crea, edita o elimina reservas según sea necesario.

---

## **Estructura del Proyecto**
```plaintext
sports-management-system/
│
├── backend/
│   ├── models/         # Modelos de datos de MongoDB (Usuarios y Reservas)
│   ├── routes/         # Rutas de la API
│   ├── controllers/    # Lógica de negocio para cada endpoint
│   ├── server.js       # Configuración principal del servidor
│   └── .env            # Variables de entorno (configuración de base de datos, JWT, etc.)
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── pages/      # Páginas principales (Login, Reservas, etc.)
│   │   ├── services/   # Lógica para interactuar con la API
│   │   └── index.js    # Punto de entrada de React
│   ├── tailwind.config.js # Configuración de Tailwind CSS
│   └── .env            # Variables de entorno para el frontend
│
└── README.md            # Documentación del proyecto
```

---

## **API Endpoints**

### **Autenticación**
| Método | Endpoint         | Descripción               |
|--------|------------------|---------------------------|
| POST   | `/api/users/register` | Registro de un nuevo usuario |
| POST   | `/api/users/login`    | Inicio de sesión            |

### **Reservas**
| Método | Endpoint                 | Descripción                  |
|--------|--------------------------|------------------------------|
| GET    | `/api/reservations`      | Obtener todas las reservas   |
| POST   | `/api/reservations`      | Crear una nueva reserva      |
| PUT    | `/api/reservations/:id`  | Actualizar una reserva       |
| DELETE | `/api/reservations/:id`  | Eliminar una reserva         |

---

## **Próximas Mejoras**
1. **Roles de Usuario:**
   - Agregar roles (Administrador, Usuario).
2. **Validaciones Avanzadas:**
   - Prevenir reservas en horarios ya ocupados.
3. **Despliegue:**
   - Subir la aplicación a servicios como **Vercel** (Frontend) y **Render** (Backend).
4. **Notificaciones:**
   - Enviar correos electrónicos al crear o modificar una reserva.

---

## **Contribuciones**
Las contribuciones son bienvenidas. Si tienes sugerencias o mejoras, siéntete libre de abrir un issue o hacer un pull request.
