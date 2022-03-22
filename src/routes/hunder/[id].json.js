import { getPointsByNumDogs, getPointsByResult, pointsByResult } from '../../scores-and-points';
import { api } from '../_api';

export const get = async (event) => {
  const response = await api('GET', `dogs/${event.params.id}`);

  if (response.status >= 400) {
    return response;
  }

  const dogResultCounts = Object.entries(pointsByResult).map(awardAndPoint => ({
    awardName: awardAndPoint[0],
    count: 0,
    points: awardAndPoint[1],
  }));
  const dogContests = [];

  for (let resultObj of response.body.results) {
    const pointsByAward = getPointsByResult(resultObj.result);
    const pointsByNumDogs = getPointsByNumDogs(resultObj.contestNumberOfDogs, resultObj.result);
    dogContests.push({
      ...resultObj,
      pointsByResult: pointsByAward,
      pointsByNumDogs,
    });

    let resultIndex = dogResultCounts.findIndex(resCount => resCount.awardName === resultObj.result);
    if (resultIndex === -1) {
      dogResultCounts.push({ awardName: resultObj.result, count: 1, points: 0 })
    } else {
      dogResultCounts[resultIndex].count += 1
    }
  }

  return {
    status: 200,
    body: {
      dog: response.body.dog,
      contests: dogContests.sort((c1, c2) => c1.contestDate > c2.contestDate ? -1 : 1),
      awards: dogResultCounts,
    }
  };
};
