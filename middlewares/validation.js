const { body, validationResult } = require('express-validator');
// Importa funciones del paquete 'express-validator' para validar y gestionar errores en los datos de la solicitud

const validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  // Valida que el campo 'name' no esté vacío; si lo está, devuelve un mensaje de error 'Name is required'

  body('email').isEmail().withMessage('Invalid email format'),
  // Valida que el campo 'email' tenga un formato válido de correo electrónico; si no lo tiene, devuelve el mensaje 'Invalid email format'

  (req, res, next) => {
    const errors = validationResult(req);
    // Recoge los posibles errores de validación acumulados durante la validación de los campos

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      // Si hay errores de validación, responde con un código 400 (Bad Request) y devuelve los errores en un array
    }
    
    next();
    // Si no hay errores, pasa al siguiente middleware o controlador
  },
];

module.exports = { validateUser };
// Exporta el middleware validateUser para que pueda ser utilizado en rutas que requieran validación
