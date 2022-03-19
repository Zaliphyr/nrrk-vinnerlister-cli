import { api } from '../../../_api';

export const post = async ({ params, request }) => {
  const body = await request.json();
  const response = await api('POST', `contests/${params.id}/results`, body);

  if (response.status >= 400) {
    return response;
  }

  return {
    status: 200,
  };
};

export const del = async ({ params }) => {
  const response = await api('DELETE', `contest-results/${params.id}`);

  if (response.status >= 400) {
    return response;
  }

  return {
    status: 200,
  };
}

export const patch = async ({ params, request }) => {
  const body = await request.json();
  const response = await api('PATCH', `contest-results/${params.id}`, body);

  if (response.status >= 400) {
    return response;
  }

  return {
    status: 200,
  };
};