import { api } from '../_api';

export const get = async (event) => {
  // event.locals.userid comes from src/hooks.js
  const response = await api('GET', `contests/${event.params.id}`);
  return response;
};
