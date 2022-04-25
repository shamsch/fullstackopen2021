export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);
  if (bmi < 18.5) {
    return "underweight (unhealthy)";
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    return "normal range (healthy)";
  } else if (bmi >= 23.0 && bmi <= 24.9) {
    return "overweight (at risk)";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return "overweight II (moderately obese)";
  } else if (bmi >= 30) {
    return "overweight III (severely obese)";
  }
  return "abnormal weight and height, ur probably an alien"
};

console.log(calculateBmi(180, 74));
