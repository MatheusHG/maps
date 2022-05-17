export function formatNumber(number: number) {
  return number?.toLocaleString('pt-br', {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}
