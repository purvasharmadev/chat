export const getDataFromLocal = (key, defaultValue) => {
  const keyCheck = localStorage.getItem(key);
  if (keyCheck) {
    return JSON.parse(keyCheck);
  } else {
    return defaultValue;
  }
};

export const setDataToLocal = (key, value, defaultValue) => {
  if (value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
};
