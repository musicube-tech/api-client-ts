export function isValidEmail(email: unknown): boolean {
  /* Wow, much email! */
  return typeof email === 'string' && Boolean(email.match(/.+@.+\..+/));
}
