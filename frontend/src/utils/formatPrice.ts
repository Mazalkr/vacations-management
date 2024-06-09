// we add 'undefined' because there was an error. 
// export default function formatPrice(price: number | undefined): string {
//     return price ? `₪${price.toFixed(2)}` : '';
// }

// add the sign $ to the price.
// I don't need to use .toFixed(2) because I already set this in mySQL.... 
export default function formatPrice(price: number | undefined): string {
    return price ? `$${price}` : '';
}