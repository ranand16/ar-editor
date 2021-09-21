export const doesElementHaveText = (htmlString: string) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;
  return tempElement.innerText ? true : false;
};
