import Vacation from "../../../models/Vacation";
import appConfig from "../../../utils/AppConfig";
import "./VacationCard.css";
import formatDate from '../../../utils/formatDate'
import formatPrice from '../../../utils/formatPrice'

// 'CHILD ELEMENT' = CARD, 'PARENT ELEMENT' = LIST.

// PROPS:
// props = properties.
// 1) first create interface of the props.
interface VacationCardProps {
    vacation: Vacation;
}

// 2) use the props in the 'child element'
function VacationCard(props: VacationCardProps): JSX.Element {


    return (
        <div className="VacationCard">
            <div>
                <img src={props.vacation.imageName ? `${appConfig.imagesUrl}/${props.vacation.imageName}` : ''}/>
                <br/>
                {props.vacation.destination}
                <br/>
                <div>{formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}
                </div>
                description: {props.vacation.description}
                <br/>
                price: {formatPrice(props.vacation.price)}
            </div>
			
        </div>
    );
}

export default VacationCard;

// 3) create a call to the props in the 'parent element', in that case it will be in file 'List'.


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
