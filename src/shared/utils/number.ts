export const addPrefix = (num: number | string) => {
  if (typeof num === "string") {
    num = parseInt(num, 10);
  }
  return num < 10 ? `0${num}` : num;
};

export const numberWithComma = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
