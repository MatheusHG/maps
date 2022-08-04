export function formatNumber(number: number) {
  return number?.toLocaleString('pt-br', {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export function removeSpecialChars(string: string) {
  return string
    .replace(/[àáâãäå]/, 'a')
    .replace(/[ÀÁÂÃÄÅ]/, 'a')
    .replace(/[èéêẽë]/, 'e')
    .replace(/[ÈÉÊẼË]/, 'e')
    .replace(/[ìíîĩï]/, 'i')
    .replace(/[ÌÍÎĨÏ]/, 'i')
    .replace(/[òóôõö]/, 'o')
    .replace(/[ÒÓÔÕÖ]/, 'o')
    .replace(/[ùúûũü]/, 'u')
    .replace(/[ÙÚÛŨÜ]/, 'u')
    .replace(/[ç]/, 'c')
    .replace(/[Ç]/, 'C');
}
