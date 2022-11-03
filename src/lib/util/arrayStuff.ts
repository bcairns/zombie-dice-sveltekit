// We're probably going to be splitting up a lot of arrays
// Stolen from:
// https://codereview.stackexchange.com/questions/162878/partitioning-an-array-based-on-a-condition-in-javascript
const partitionArray = (arrayToPartition, condition) => arrayToPartition.reduce(
  (result, element) => {
    result[condition(element) ? 0 : 1].push(element);
    return result;
  },
  [[], []]
);

export {
  partitionArray,
};
