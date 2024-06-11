import config from "config";
import DTO from "../models/vacations/dto";

export default function getImageUrl(vacation: DTO) {
    const vacationWithImageUrl = {
        ...vacation,
        imageUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${vacation.imageName}`
    }
    delete vacationWithImageUrl.image;
    return vacationWithImageUrl;
}