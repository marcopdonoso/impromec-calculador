export const navlinks = [
  {
    name: 'Inicio',
    path: '/',
    logged_path: '/',
  },
  {
    name: 'Calculador',
    path: '#calculator',
    logged_path: 'dashboard/calculator',
  },
  {
    name: 'Productos',
    path: '#products',
    logged_path: 'dashboard/products',
  },
  {
    name: 'Nosotros',
    path: '#about',
    logged_path: '#about',
  },
  {
    name: 'Contáctanos',
    path: '#contact',
    logged_path: '#contact',
  },
]

export const authLinks = {
  login: {
    name: 'Iniciar Sesión',
    path: '/auth/login',
  },
  register: {
    name: 'Registrarme',
    path: '/auth/register',
  },
  forgot_pass: {
    name: 'Olvidé mi contraseña',
    path: '/auth/forgot-password',
  },
  reset_pass: {
    name: 'Restablecer contraseña',
    path: '/auth/reset-password',
  },
  successful_reg: {
    name: 'Registro exitoso',
    path: '/auth/register-email-sended',
  },
}
