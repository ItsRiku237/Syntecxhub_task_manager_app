const AUTH_KEY = 'mern-task-manager-auth';

export const getStoredAuth = () => {
  const value = localStorage.getItem(AUTH_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

export const setStoredAuth = (auth) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};
