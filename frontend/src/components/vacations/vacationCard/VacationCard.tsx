import Vacation from "../../../models/Vacation";
import "./VacationCard.css";
import formatDate from '../../../utils/formatDate'
import formatPrice from '../../../utils/formatPrice'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStore } from "../../../redux/AuthState";
import User from "../../../models/User";
import Report from "../../../models/Report";
import Follower from "../../../models/Follower";
import followersService from "../../../services/Followers";
import reportService from "../../../services/Report";
import notify from "../../../services/Notify";
import { followersStore } from "../../../redux/FollowersState";

interface VacationCardProps {
    vacation: Vacation;
    deleteVacation: Function;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [user, setUser] = useState<User>();
    const [numberOfFollowers, setNumberOfFollowers] = useState<number>();
    const [isFollowing, setIsFollowing] = useState<boolean>();

    useEffect(() => {
        setUser(authStore.getState().user); 
        
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
        
        return unsubscribe;
    }, []);

    useEffect(() => {
        followersService.countAllByVacation(props.vacation.id as string)
            .then(followersFromServer => setNumberOfFollowers(followersFromServer))
            .catch(error => notify.error(error));
    }, []);

    // useEffect(() => {
    //     followersService.isFollowing(user?.id as string, props.vacation.id as string)
    //         .then(isFollowingFromServer => {console.log(props.vacation?.id); setIsFollowing(isFollowingFromServer)})
    //         .catch(error => notify.error(error));
    // }, []);

    useEffect(() => {
        const follower: Follower = { userId: user?.id, vacationId: props.vacation.id }
        followersService.isFollowing(follower)
            .then(isFollowingFromServer => setIsFollowing(isFollowingFromServer))
            .catch(error => notify.error(error));
    }, []);

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
                        {user?.roleId === 2 && <>
                            <li className="list-group-item">
                                <h6 className="card-text">Followers: {numberOfFollowers}</h6>
                            </li>
                            <li className="list-group-item">
                                <h6 className="card-text">is following? {isFollowing ? 'true' : 'false' }</h6>
                                <span>number of followers: {props.vacation.numberOfFollowers}</span><br/>
                                <span>isFollowing: {props.vacation.isFollowing}</span>
                            </li>
                            <li className="list-group-item">
                            <button className="btn btn-success" data-bs-toggle="button">Follow</button>
                            </li>
                        </>}
                        
                        {user?.roleId === 3 && <li className="list-group-item">
                            <NavLink to={`/vacations/edit/${props.vacation.id}`}><button className="btn btn-primary">Edit</button></NavLink>
                            <button className="btn btn-danger" onClick={() => (props.deleteVacation(props.vacation.id))}>Delete</button>
                        </li>}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default VacationCard;