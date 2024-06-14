import Vacation from "../../../models/Vacation";
import appConfig from "../../../utils/AppConfig";
import "./VacationCard.css";
import formatDate from '../../../utils/formatDate'
import formatPrice from '../../../utils/formatPrice'
import { NavLink } from "react-router-dom";

// 'CHILD ELEMENT' = CARD, 'PARENT ELEMENT' = LIST.

// PROPS:
// props = properties.
// 1) first create interface of the props.
interface VacationCardProps {
    vacation: Vacation;
    deleteVacation: Function;
}

// 2) use the props in the 'child element'
function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
            <div>
                {/* <img src={props.vacation.imageName ? `${appConfig.imagesUrl}/${props.vacation.imageName}` : ''}/> */}
                <img src={props.vacation.imageUrl ? props.vacation.imageUrl : ''} />
                <br/>
                {props.vacation.destination}
                <br/>
                {/* <div>{props.vacation.startDate ? formatDate(props.vacation.startDate) : ''} - {props.vacation.endDate ? formatDate(props.vacation.endDate): ''} */}
                <div>{formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}
                </div>
                description: {props.vacation.description}
                <br/>
                price: {formatPrice(props.vacation.price)}
                <br/>
                followers: 
                <br/>
                <NavLink to={`/vacations/edit/${props.vacation.id}`}><button>Edit</button></NavLink>
                <button onClick={() => (props.deleteVacation(props.vacation.id))}>Delete</button>
                
            </div>
			
        </div>
    );
}

export default VacationCard;

// 3) create a call to the props in the 'parent element', in that case it will be in file 'List'.