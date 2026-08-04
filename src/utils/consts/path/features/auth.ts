export const authPaths = {
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  // Backwards compatibility for any leftover links (to be removed later if needed)
  asisten: {
    login: '/login?role=asisten',
    requestReset: '/forgot-password',
  },
  calas: {
    login: '/login?role=calas',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  }
};
