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
        <div className="VacationCard col-md-12 col-md-8 col-lg-6 col-xl-3">
                
            <div className="card border-secondary mb-3 h-100" style={{ width: '18rem' }}>
                <img src={props.vacation.imageUrl ? props.vacation.imageUrl : ''} className="card-img-top" alt="destination" />
                <div className="card-body">
                    <h3 className="card-title">{props.vacation.destination}</h3>
                    <h6 className="card-text">{formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}</h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><p className="card-text">{props.vacation.description}</p></li>
                        <li className="list-group-item"><h6 className="card-text">Price: {formatPrice(props.vacation.price)}</h6></li>
                        <li className="list-group-item"><h6 className="card-text">Followers:</h6></li>
                        <li className="list-group-item">
                            <NavLink to={`/vacations/edit/${props.vacation.id}`}><button className="btn btn-primary">Edit</button></NavLink>
                            <button className="btn btn-danger" onClick={() => (props.deleteVacation(props.vacation.id))}>Delete</button>
                        </li>
                    </ul>
                </div>
            </div>

                
			
        </div>
    );
}

export default VacationCard;

// 3) create a call to the props in the 'parent element', in that case it will be in file 'List'.