/** Вспомогательный метод для проверки, является ли строка хэшем */
export function isHashed(password: string): boolean {
  // Проверка на длину (например, bcrypt = 60 символов)
  if (password.length < 30) {
    return false;
  }

  // Проверка на префикс хэша
  // Пример для bcrypt
  return /^(?:\$2[ayb]?\$|[\w+/]{20,})/.test(password);
}
