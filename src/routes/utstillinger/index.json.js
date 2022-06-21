import { api } from "../_api";

export const get = async () => {
  // event.locals.userid comes from src/hooks.js
  const response = await api("GET", "contests");
  if (response.status === 200) {
    return {
      status: 200,
      body: response.body.sort((c1, c2) => (c1.id > c2.id ? -1 : 1)),
    };
  }
  return response;
};
