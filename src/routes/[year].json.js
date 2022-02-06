import { api } from './_api';

export const get = async (event) => {
  // event.locals.userid comes from src/hooks.js
  const response = await api('GET', `/winner-list/${event.params.year}`);
  return response;
};
