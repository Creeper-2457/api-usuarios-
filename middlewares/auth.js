const authenticate = (req, res, next) => {
  const { authorization } = req.headers; 
  // Extrae el encabezado 'Authorization' de la solicitud HTTP

  if (authorization && authorization === 'Bearer mi_secreto') {
    next(); 
    // Si el encabezado de autorización existe y coincide con el token 'Bearer mi_secreto', llama a next() para continuar con el siguiente middleware o controlador
  } else {
    res.status(401).json({ message: 'Unauthorized' });
    // Si no hay token o es incorrecto, responde con un error 401 (No autorizado)
  }
};

module.exports = { authenticate }; 
// Exporta la función de autenticación para que pueda ser utilizada en otras partes de la aplicación
