export const reverseLikertCoding = (value: number, likertScale = 7) => {
  return likertScale + 1 - value;
};
