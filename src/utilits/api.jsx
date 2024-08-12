// Mock API utility functions for user data

const USER_KEY = 'user';

export const getUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const updateUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
