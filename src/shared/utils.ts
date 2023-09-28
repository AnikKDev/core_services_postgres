export const asyncForeach = async (arr: any[], callback: any) => {
  if (!Array.isArray(arr)) {
    throw new Error('Expected an array');
  }
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
};
