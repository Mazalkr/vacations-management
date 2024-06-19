import Vacation from "../../../models/Vacation";
import "./VacationCard.css";
import formatDate from '../../../utils/formatDate'
import formatPrice from '../../../utils/formatPrice'
import { NavLink } from "react-router-dom";

interface VacationCardProps {
    vacation: Vacation;
    deleteVacation: Function;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard col">
                
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