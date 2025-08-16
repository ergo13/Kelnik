export function useFormatPrice(price: number): string {
  return price.toLocaleString('ru-RU');
}