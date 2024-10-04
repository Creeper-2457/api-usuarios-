const express = require('express');
const UserController = require('../controllers/userController');
// Importa el controlador de usuarios que contiene los métodos para manejar las operaciones CRUD y exportación a Excel

const { validateUser } = require('../middlewares/validation');
// Importa el middleware de validación de usuarios, que valida los datos de entrada para la creación y actualización de usuarios

const { authenticate } = require('../middlewares/auth');
// Importa el middleware de autenticación que verifica si la solicitud está autenticada

const router = express.Router();
// Crea una nueva instancia de router de Express para definir las rutas de los usuarios

// Rutas de los usuarios
router.get('/users', authenticate, UserController.getAllUsers);
// Ruta para obtener todos los usuarios. Requiere autenticación.

router.get('/users/:id', authenticate, UserController.getUserById);
// Ruta para obtener un usuario por su ID. Requiere autenticación.

router.post('/users', authenticate, validateUser, UserController.createUser);
// Ruta para crear un nuevo usuario. Requiere autenticación y validación de los datos de entrada.

router.put('/users/:id', authenticate, validateUser, UserController.updateUser);
// Ruta para actualizar un usuario por su ID. Requiere autenticación y validación de los datos de entrada.

router.delete('/users/:id', authenticate, UserController.deleteUser);
// Ruta para eliminar un usuario por su ID. Requiere autenticación.

router.get('/user/export/xls', UserController.exportUsersToXLS);
// Ruta para exportar la lista de usuarios a un archivo Excel. No requiere autenticación en este caso.

module.exports = router;
// Exporta el enrutador para que pueda ser utilizado en el archivo principal de rutas de la aplicación
