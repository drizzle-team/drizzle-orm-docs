const containsSubstringFromArray = (
  inputString: string,
  substringsArray: string[],
) => substringsArray.some((substring) => inputString.includes(substring));

export default containsSubstringFromArray;
