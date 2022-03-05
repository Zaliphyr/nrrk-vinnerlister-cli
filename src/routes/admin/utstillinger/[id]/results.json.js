import { api } from '../../../_api';

export const post = async ({ params, request }) => {
  const body = await request.json();
  console.log(params.id)
  const response = await api('POST', `contests/${params.id}/results`, body);

  if (response.status >= 400) {
    return response;
  }

  return {
    status: 200,
  };
};