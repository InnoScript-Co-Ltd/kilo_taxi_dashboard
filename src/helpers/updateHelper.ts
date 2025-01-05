export const getId = ({ lists, value }: { lists: any; value: any }) => {
  const result = lists.find(
    (list: any) => String(list.value) === String(value) // Ensure proper comparison
  );
  return result?.id;
};
