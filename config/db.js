require('dotenv').config();  
// Carga las variables de entorno desde un archivo .env para que estén disponibles en process.env

const { Pool } = require('pg');
// Importa la clase Pool del módulo 'pg' (pg es el cliente de PostgreSQL para Node.js), que se utiliza para gestionar conexiones a la base de datos

// Crea una nueva instancia de Pool para gestionar conexiones a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,          // Dirección del host donde está alojada la base de datos, obtenida de las variables de entorno
  user: process.env.DB_USER,          // Nombre de usuario para conectar a la base de datos
  password: process.env.DB_PASSWORD,  // Contraseña del usuario para la conexión
  database: process.env.DB_NAME,      // Nombre de la base de datos a la que se va a conectar
  port: process.env.DB_PORT || 5432,  // Puerto en el que está escuchando PostgreSQL; si no se define en .env, usa el puerto por defecto (5432)
});

module.exports = pool;
// Exporta la instancia de Pool para que pueda ser utilizada en otras partes de la aplicación
