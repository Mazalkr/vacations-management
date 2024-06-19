export default function formatPrice(price: number | undefined): string {
    return price ? `$${price}` : '';
}