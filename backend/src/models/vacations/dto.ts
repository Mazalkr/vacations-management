import { UploadedFile } from "express-fileupload";

export default interface DTO {  
    id: string,
    destination: string,
    startDate: Date,
    endDate: Date,
    price: number,
    description: string,
    imageName: string,
    image: UploadedFile
    imageUrl: string
}