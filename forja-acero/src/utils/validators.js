export function validate({ nombre, email, direccion }) {
  const errores = {}
  if (!nombre || nombre.length < 3) errores.nombre = 'Debe ingresar su nombre completo.'
  if (!email || !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) errores.email = 'Correo inválido.'
  if (!direccion || direccion.length < 5) errores.direccion = 'Dirección demasiado corta.'
  return errores
}