export const AUTH = {
  register: "/api/auth/register",
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  me: "/api/auth/me",
};

export const BOOKS = {
  all: "/api/books",
};

export const MYBOOKS = {
  base: "/api/mybooks",
  add: (bookId) => `/api/mybooks/${bookId}`,
  status: (bookId) => `/api/mybooks/${bookId}/status`,
  rating: (bookId) => `/api/mybooks/${bookId}/rating`,
  update: (bookId) => `/api/mybooks/${bookId}`,
};