export const loadJS = (file: string, appendTo: "body" | "head" = "head") => {
  const jsElm = document.createElement("script");
  jsElm.type = "application/javascript";
  jsElm.src = file;
  document[appendTo].appendChild(jsElm);
};
