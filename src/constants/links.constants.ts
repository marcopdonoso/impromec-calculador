export const noLoggedNavbarLinks = [
  {
    name: 'Inicio',
    path: '/',
  },
  {
    name: 'Calculador',
    path: '/#calculator',
  },
  {
    name: 'Productos',
    path: '/#products',
  },
  {
    name: 'Nosotros',
    path: '/#about',
  },
  {
    name: 'Contáctanos',
    path: '/#contact',
  },
]

export const loggedNavbarLinks = [
  {
    name: 'Inicio',
    path: '/',
  },
  {
    name: 'Calculador',
    path: '/dashboard/calculator',
  },
  {
    name: 'Productos',
    path: '/dashboard/products',
  },
  {
    name: 'Nosotros',
    path: '/#about',
  },
  {
    name: 'Contáctanos',
    path: '/#contact',
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
  forgotPass: {
    name: 'Olvidé mi contraseña',
    path: '/auth/forgot-password',
  },
  resetPass: {
    name: 'Restablecer contraseña',
    path: '/auth/reset-password',
  },
  successfulReg: {
    name: 'Registro exitoso',
    path: '/auth/register-email-sended',
  },
}

export const appLinks = {
  home: {
    name: 'Inicio',
    path: '/',
  },
  calculatorHome: {
    name: 'Calculador',
    path: '/dashboard/calculator',
  },
  calculatorNewProject: {
    name: 'Proyecto nuevo',
    path: '/dashboard/calculator/new-project',
  },
}
