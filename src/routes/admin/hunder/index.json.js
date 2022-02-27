import { api } from '../../_api';

export const post = async ({ request }) => {
  const body = await request.json();
  console.log(body);
  const response = await api('POST', 'dogs', body);

  if (response.status >= 400) {
    return response;
  }

  return {
    status: 200,
  };
};
