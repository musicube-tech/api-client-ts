export function isValidEmail(email: string) {
  /* Wow, much email! */
  return email.match(/.+@.+\..+/);
}
