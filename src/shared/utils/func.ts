export const createKeyValueFromQueryString = (value: string) => {
  const final: any = {};
  const data = value.slice(1).split("&");
  if (data.length) {
    data.forEach((el: string) => {
      const item = el.split("=");
      if (item.length && item[0] && item[1]) {
        final[item[0]] = item[1];
      }
    });
  }
  return final;
};

export const truncateString = (
  name: string,
  desiredLength = 12,
  suffix = "..."
) => {
  const stringLength = name.length;
  if (stringLength <= desiredLength) {
    return name;
  }
  return name.substr(0, desiredLength).concat(suffix);
};

export const captilizeFirstLetter = (text = "") => {
  return [...text]
    .map((char, index) => (index ? char : char.toUpperCase()))
    .join("");
};
