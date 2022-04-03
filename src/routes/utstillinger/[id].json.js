import { calculateScore, combineResults, getPointsByNumDogs } from '../../scores-and-points';
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
    points: calculateScore(resultObj.result, resultObj.placement, resultObj.ck, response.body.contest.numberOfDogs),
    combinedResult: combineResults(resultObj.result, resultObj.placement, resultObj.ck),
  }));

  return {
    status: 200,
    body: {
      ...response.body.contest,
      pointsByNumDogs,
      results: mappedResults.sort((r1, r2) =>
        r1.points > r2.points ? -1 : 1
      ),
    }
  };
};
