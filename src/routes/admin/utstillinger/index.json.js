import { api } from '../../_api';

export const post = async ({ request }) => {
  const body = await request.json();
  const response = await api('POST', 'contests', body);

  if (response.status >= 400) {
    return response;
  }

  return {
    status: 200,
  };
};
