export const words = (c: number) => c / 5;

export const minutes = (s: number) => s / 60;

export const wpm = (c: number, s: number) =>
  Math.round(words(c) / minutes(s)) || 0;

export const countCorrectCharacters = (text: string, input: string) => {
  const tc = text.replace(' ', '');
  const ic = input.replace(' ', '');
  return ic.split('').filter((c, i) => c === tc[i]).length;
};