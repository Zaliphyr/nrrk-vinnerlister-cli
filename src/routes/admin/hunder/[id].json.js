import { api } from '../../_api';

export const patch = async ({ params, request }) => {
  const body = await request.json();
  const response = await api('PATCH', `dogs/${params.id}`, body);

  if (response.status >= 400) {
    return response;
  }

  return {
    status: 200,
  };
};


export const del = async ({ params }) => {
  const response = await api('DELETE', `dogs/${params.id}`);

  if (response.status >= 400) {
    return response;
  }

  return {
    status: 200,
  };
};
