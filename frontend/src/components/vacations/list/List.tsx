import "./List.css";
import { useEffect, useState } from "react";
import notify from "../../../services/Notify";
import vacationsService from "../../../services/Vacations";
import Vacation from "../../../models/Vacation";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import getAbsoluteImageSrc from "../../../utils/getAbsoluteImageSrc";
import appConfig from "../../../utils/AppConfig";
// import RandomImageSource from '../../../../../backend/images/09719cc5-87be-4663-a2bc-acfb01b8aa67.jpg'


function List(): JSX.Element {

    const [vacations, setVacations] = useState<Vacation[]>([]);

    useEffect(() => {
        vacationsService.getAll()
            .then(setVacations)
            .catch(notify.error)
    }, []);

    return (
        <div className="List">
            <br/>
            <br/>

            {/* <img src={RandomImageSource}/> */}

            <table>
                <thead>
                    <tr>
                        <th>destination</th>
                        <th>description</th>
                        <th>start date</th>
                        <th>end date</th>
                        <th>price</th>
                        <th>image name</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {vacations.map(vacation => <tr key={vacation.id}>
                        <td>{vacation.destination}</td>
                        <td>{vacation.description}</td>
                        <td>{formatDate(vacation.startDate)}</td>
                        <td>{formatDate(vacation.endDate)}</td>
                        <td>{formatPrice(vacation.price)}</td>
                        <td>{vacation.imageName}</td>
                        <td><img src={vacation.imageName ? `${appConfig.imagesUrl}/${vacation.imageName}` : ''}/></td>
                    </tr>)}
                </tbody>
            </table>
        </div>

        
    );
}

export default List;
