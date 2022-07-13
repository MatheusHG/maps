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
    .replace(/[ÀÁÂÃÄÅ]/, 'A')
    .replace(/[èéêẽë]/, 'e')
    .replace(/[ÈÉÊẼË]/, 'E')
    .replace(/[ìíîĩï]/, 'i')
    .replace(/[ÌÍÎĨÏ]/, 'I')
    .replace(/[òóôõö]/, 'o')
    .replace(/[ÒÓÔÕÖ]/, 'O')
    .replace(/[ùúûũü]/, 'u')
    .replace(/[ÙÚÛŨÜ]/, 'U')
    .replace(/[ç]/, 'c')
    .replace(/[Ç]/, 'C');
}
