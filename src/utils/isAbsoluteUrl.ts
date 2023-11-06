const isAbsoluteUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export default isAbsoluteUrl;
