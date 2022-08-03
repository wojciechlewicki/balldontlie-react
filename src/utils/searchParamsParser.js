export default function searchParamsParser(params) {
  let urlParams = "";

  for (const key in params) {
    const value = params[key];

    if (value !== null) {
      if (Array.isArray(value)) {
        let tableContent = "";
        value.forEach((element) => {
          tableContent += `&${key}[]=${element}`;
        });
        urlParams += tableContent;
      } else urlParams += `&${key}=${value}`;
    }
  }

  return urlParams;
}
