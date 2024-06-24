export const convertToTitleCase = (str: string) => {
  if (typeof str !== 'string') {
    throw new Error('A string must be passed to this function');
  }

  const letters = str.split('');
  letters[0] = letters[0].toUpperCase();
  
  return letters.join('');
};
