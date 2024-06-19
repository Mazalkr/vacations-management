export default function formatDate(date: Date | undefined | string): string {
    if (!date) return '';
    const stringDate = (date as Date).toString();
    const fullDate = stringDate.split('T')[0];
    return fullDate.split('-')[2] + '/' + fullDate.split('-')[1] + '/' + fullDate.split('-')[0];
}