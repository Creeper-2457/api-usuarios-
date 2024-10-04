const User = require('../models/userModel');  
// Importa el modelo de usuario para interactuar con la base de datos

const ExcelJS = require('exceljs'); 
// Importa la librería ExcelJS, que se usa para manipular archivos de Excel

class UserController {
  
  // Método estático para obtener todos los usuarios
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll(); // Llama al método findAll del modelo User para obtener todos los usuarios
      res.json(users); // Devuelve los usuarios como JSON
    } catch (error) {
      res.status(500).json({ error: error.message }); // Devuelve un error 500 si algo sale mal
    }
  }

  // Método estático para obtener un usuario por ID
  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id); // Busca el usuario por su ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); // Si no encuentra el usuario, devuelve un error 404
      }
      res.json(user); // Devuelve el usuario encontrado como JSON
    } catch (error) {
      res.status(500).json({ error: error.message }); // Devuelve un error 500 si ocurre un problema
    }
  }

  // Método estático para crear un nuevo usuario
  static async createUser(req, res) {
    try {
      const user = await User.create(req.body); // Crea un nuevo usuario con los datos del cuerpo de la solicitud
      res.status(201).json(user); // Devuelve el usuario creado con un código de estado 201 (creado)
    } catch (error) {
      res.status(500).json({ error: error.message }); // Devuelve un error 500 si algo sale mal
    }
  }

  // Método estático para actualizar un usuario existente
  static async updateUser(req, res) {
    try {
      const userId = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL
      const userData = req.body; // Obtiene los datos para actualizar del cuerpo de la solicitud
      const updatedUser = await User.update(userId, userData); // Llama al método update del modelo User
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' }); // Si no se encuentra el usuario, devuelve un error 404
      }
      res.json(updatedUser); // Devuelve el usuario actualizado
    } catch (error) {
      res.status(500).json({ error: error.message }); // Devuelve un error 500 si algo sale mal
    }
  }

  // Método estático para eliminar un usuario
  static async deleteUser(req, res) {
    try {
      const userId = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL
      const result = await User.delete(userId); // Llama al método delete del modelo User
      res.json(result); // Devuelve el resultado de la operación de eliminación
    } catch (error) {
      res.status(500).json({ error: error.message }); // Devuelve un error 500 si algo sale mal
    }
  }

  // Método estático para exportar la lista de usuarios a un archivo Excel
  static async exportUsersToXLS(req, res) {
    try {
      const users = await User.findAll(); // Obtiene todos los usuarios de la base de datos
      const workbook = new ExcelJS.Workbook(); // Crea un nuevo libro de trabajo de Excel
      const worksheet = workbook.addWorksheet('Usuarios'); // Añade una nueva hoja de cálculo llamada 'Usuarios'

      // Define las columnas del archivo Excel
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Fecha de Creación', key: 'fecha_creacion', width: 20 },
        { header: 'Estado', key: 'estado', width: 15 },
      ];

      // Añade cada usuario como una nueva fila en la hoja de cálculo
      users.forEach(user => {
        worksheet.addRow({
          id: user.id,
          nombre: user.name,
          email: user.email,
          fecha_creacion: user.fecha_creacion,
          estado: user.estado,
        });
      });

      // Configura los encabezados HTTP para descargar el archivo Excel
      res.setHeader('Content-Disposition', 'attachment; filename="usuarios.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // Escribe el archivo Excel en la respuesta HTTP
      await workbook.xlsx.write(res);
      res.end(); // Termina la respuesta
    } catch (error) {
      res.status(500).json({ error: error.message }); // Devuelve un error 500 si algo sale mal
    }
  }
}

module.exports = UserController; 
// Exporta la clase UserController para que pueda ser utilizada en otras partes de la aplicación
