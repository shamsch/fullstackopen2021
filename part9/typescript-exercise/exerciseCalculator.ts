const arrayWithoutZero = (arr: Array<number>) => {
  return arr.map((ele) => ele !== 0);
};

const determineRating = (target: number, average: number) => {
  const diff = target - average;
  if (diff > 1) {
    return 1;
  } else if (diff > 0.5) {
    return 2;
  } else {
    return 3;
  }
};

const ratingText = ["not so good", "kinda good", "pretty good"];

const calculateExercise = (exerciseData: Array<number>, target: number) => {
  const days = exerciseData.length;
  const trainingDays = arrayWithoutZero(exerciseData).length;
  const average: number =
    exerciseData.reduce((prev, current) => prev + current, 0) / days;
  const success: boolean = average >= target;
  const rating: number = determineRating(target, average);
  return {
    periodLength: days,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingText[rating - 1],
    target,
    average,
  };
};

console.log(calculateExercise([0, 0, 0, 0, 0, 2, 1], 2));
