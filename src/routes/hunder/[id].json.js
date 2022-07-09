import {
  calculateScore,
  combineResults,
  pointsByResult,
} from "../../scores-and-points";
import { api } from "../_api";

export const get = async (event) => {
  const response = await api("GET", `dogs/${event.params.id}`);

  if (response.status >= 400) {
    return response;
  }

  let dogResultCounts = Object.entries(pointsByResult).map((awardAndPoint) => ({
    awardName: awardAndPoint[0],
    count: 0,
    points: awardAndPoint[1],
  }));
  const dogContests = [];

  // Stupid, but can't be bothered to fix editor's auto-convert of '0' to 0
  dogResultCounts.push({
    awardName: "0",
    count: dogResultCounts[0].count,
    points: 0,
  });
  dogResultCounts = dogResultCounts.slice(1);

  for (let resultObj of response.body.results) {
    dogContests.push({
      ...resultObj,
      points: calculateScore(
        resultObj.result,
        resultObj.placement,
        resultObj.ck,
        resultObj.contestNumberOfDogs
      ),
      combinedResult: combineResults(
        resultObj.result,
        resultObj.placement,
        resultObj.ck
      ),
    });

    ["result", "placement", "ck"].forEach((resultType) => {
      if (!resultObj[resultType]) {
        return;
      }

      let resultIndex;
      let awardName;

      if (resultType === "ck") {
        resultIndex = dogResultCounts.findIndex(
          (resCount) => resCount.awardName === "CK"
        );
        awardName = "CK";
      } else {
        resultIndex = dogResultCounts.findIndex(
          (resCount) => resCount.awardName === resultObj[resultType]
        );
        awardName = resultObj[resultType];
      }

      if (resultIndex === -1) {
        dogResultCounts.push({ awardName: awardName, count: 1, points: 0 });
      } else {
        dogResultCounts[resultIndex].count += 1;
      }
    });
  }

  return {
    status: 200,
    body: {
      dog: response.body.dog,
      contests: dogContests.sort((c1, c2) =>
        c1.contestDate > c2.contestDate ? -1 : 1
      ),
      awards: dogResultCounts,
    },
  };
};
