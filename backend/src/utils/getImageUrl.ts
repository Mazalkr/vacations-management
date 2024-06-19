import config from "config";
import DTO from "../models/vacations/dto";

export default function getImageUrl(vacation: DTO) {
    try {

        const vacationWithImageUrl = {
            ...vacation,
            imageUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${vacation.imageName}`
        }
        delete vacationWithImageUrl.image;
        return vacationWithImageUrl;
    } catch (err) {
        console.log(err);
    }
}