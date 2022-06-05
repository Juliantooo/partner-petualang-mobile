export const filterDataById = <T extends { id: string }>(
  data: T[],
  id: string,
): T[] => {
  const filteredData = data.filter((datum: T) => datum.id !== id);
  return filteredData;
};
