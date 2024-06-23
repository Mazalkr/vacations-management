export default interface DTO {  
    page: number, // offset - from which index to start? depends on page number
    limit: number // how many cards per page (the demand in the project: 10).
}