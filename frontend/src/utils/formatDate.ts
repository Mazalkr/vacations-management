export default function formatDate(date: Date | undefined | string): string {
    // console.log(date);
    const stringDate = (date as Date).toString();
    const fullDate = stringDate.split('T')[0];
    return fullDate.split('-')[2] + '/' + fullDate.split('-')[1] + '/' + fullDate.split('-')[0];
}

// explanation:
// Date(): 1995-12-17T03:24:00