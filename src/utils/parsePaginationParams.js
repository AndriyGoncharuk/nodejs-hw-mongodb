export const parseNumber = (value, defaultValue) => {
  if (typeof value !== "string") {
    return defaultValue;
  }

  const parsedValue = parseInt(value);

  if (Number.isNaN(parsedValue) === true) {
    return defaultValue;
  } else {
    return parsedValue;
  }
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
