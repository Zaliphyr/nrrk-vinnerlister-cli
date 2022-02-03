import { api } from './_api';

export const get = async () => {
  // event.locals.userid comes from src/hooks.js
  const response = await api('GET', 'dogs');
  return response;
};
