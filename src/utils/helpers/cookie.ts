export const setCookie = (key: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${key}=${value}; expires=${expires}; path=/`;
};

export const getCookie = (key: string): string | undefined => {
  const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, cookie) => {
    const [k, v] = cookie.split('=');
    acc[k] = v;
    return acc;
  }, {});
  return cookies[key];
};

export const deleteCookie = (key: string) => {
  // Clear on specific path and root, with and without domain to ensure deletion
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/lepkom;`;
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
};
