import "./List.css";
import { useEffect, useState } from "react";
import notify from "../../../services/Notify";
import vacationsService from "../../../services/Vacations";
import Vacation from "../../../models/Vacation";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import getAbsoluteImageSrc from "../../../utils/getAbsoluteImageSrc";
import appConfig from "../../../utils/AppConfig";
import VacationCard from "../vacationCard/VacationCard";
import { vacationsStore } from "../../../redux/VacationsState";
// import RandomImageSource from '../../../../../backend/images/09719cc5-87be-4663-a2bc-acfb01b8aa67.jpg'


function List(): JSX.Element {

    // we need to use 'useState' because the data on the products is async and all the other commands are sync...
    const [vacations, setVacations] = useState<Vacation[]>([]);

    // we need to use 'useEffect' to avoid the refresh & re-render every time the vacations data is updated...
    useEffect(() => {
        vacationsService.getAll()
            .then(vacationsFromServer => setVacations(vacationsFromServer))
            .catch(error => notify.error(error));

        // if there is any changes on vacationsStore (REDUX) --> get the new state of data:
        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations([...vacationsStore.getState().vacations]);  
            // with spread operator '[...productStore]' we're making a clone of 'productStore',
            // and by that every change that we'll do on the clone wont effect on the original 'productStore'. 
        })

        return unsubscribe;  // it will unsubscribe after the component tehares (its happen when we click on another nav...)

    }, []);

    return (
        <div className="List">
            <br/>
            <br/>

            {/* <img src={RandomImageSource}/> */}

            {/* <table>
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
            </table> */}

            {vacations.map(v => <VacationCard key={v.id} vacation={v}/>)}




        </div>

        
    );
}

export default List;
