const pool = require('../config/db');
// Importa el pool de conexiones a la base de datos desde el archivo de configuración de la base de datos

class User {
  
  // Método estático para obtener todos los usuarios
  static async findAll() {
    const result = await pool.query('SELECT * FROM users');
    // Ejecuta una consulta SQL para seleccionar todos los usuarios de la tabla 'users'
    
    return result.rows;
    // Devuelve las filas resultantes de la consulta
  }

  // Método estático para obtener un usuario por su ID
  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    // Ejecuta una consulta SQL para seleccionar un usuario específico donde el 'id' coincida
    
    return result.rows[0];
    // Devuelve la primera fila (el usuario encontrado) o undefined si no se encuentra
  }

  // Método estático para crear un nuevo usuario
  static async create(data) {
    const { name, email } = data;
    // Extrae los valores de 'name' y 'email' del objeto 'data'

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    // Ejecuta una consulta SQL para insertar un nuevo usuario en la tabla 'users'
    // Utiliza valores parametrizados para evitar inyecciones SQL
    // Retorna el nuevo usuario creado usando RETURNING *

    return result.rows[0];
    // Devuelve el usuario recién creado
  }

  // Método estático para actualizar un usuario por su ID
  static async update(id, data) {
    const { name, email } = data;
    // Extrae los valores de 'name' y 'email' del objeto 'data'

    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    // Ejecuta una consulta SQL para actualizar un usuario en la tabla 'users' donde el 'id' coincida
    // Utiliza valores parametrizados para evitar inyecciones SQL

    return result.rows[0];
    // Devuelve el usuario actualizado
  }

  // Método estático para eliminar un usuario por su ID
  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    // Ejecuta una consulta SQL para eliminar un usuario de la tabla 'users' donde el 'id' coincida

    return { message: 'User deleted successfully' };
    // Devuelve un mensaje indicando que el usuario fue eliminado exitosamente
  }
}

module.exports = User;
// Exporta la clase User para que pueda ser utilizada en otras partes de la aplicación
