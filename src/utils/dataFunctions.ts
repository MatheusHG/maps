export function formatNumber(number: number) {
  return number?.toLocaleString('pt-br', {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}
export function removeSpecialChars(string: string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
