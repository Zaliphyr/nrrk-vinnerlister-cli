import { getPointsByNumDogs, getPointsByResult } from '../../scores-and-points';
import { api } from '../_api';

export const get = async (event) => {
  // event.locals.userid comes from src/hooks.js
  const response = await api('GET', `contests/${event.params.id}`);

  if (response.status >= 400) {
    return response;
  }

  const pointsByNumDogs = getPointsByNumDogs(response.body.contest.numberOfDogs);

  const mappedResults = response.body.results.map(resultObj => ({
    ...resultObj,
    pointsByAward: getPointsByResult(resultObj.result),
    pointsByNumDogs: getPointsByNumDogs(response.body.contest.numberOfDogs, resultObj.result),
  }));

  return {
    status: 200,
    body: {
      ...response.body.contest,
      pointsByNumDogs,
      results: mappedResults.sort((r1, r2) =>
        r1.pointsByAward + r1.pointsByNumDogs > r2.pointsByAward + r2.pointsByNumDogs ? -1 : 1
      ),
    }
  };
};
