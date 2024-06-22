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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';


interface VacationCardProps {
    vacation: Vacation;
    deleteVacation: Function;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [user, setUser] = useState<User>();
    const [numberOfFollowers, setNumberOfFollowers] = useState<number>(0);
    const [isFollowing, setIsFollowing] = useState<boolean>();

    useEffect(() => {
        setUser(authStore.getState().user); 
        
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
        
        return unsubscribe;
    }, [user]);

    useEffect(() => {
        followersService.countAllByVacation(props.vacation.id as string)
            .then(followersFromServer => setNumberOfFollowers(followersFromServer))
            .catch(error => notify.error(error));
    }, [props.vacation.id]);

    useEffect(() => {
        if (user?.id) {
            followersService.isFollowing({ userId: user?.id, vacationId: props.vacation.id })
                .then(isFollowingFromServer => setIsFollowing(isFollowingFromServer))
                .catch(error => notify.error(error));
        }
    }, [user]);

    async function handleFollow(): Promise<void> {
        const userId = user?.id;
        const vacationId = props.vacation.id;
        // if the user isFollowing & click on button --> UNFOLLOW
        // else --> FOLLOW
        if (isFollowing) {
            followersService.unFollow({ userId, vacationId })
                .then(() => {
                    setIsFollowing(false);
                    setNumberOfFollowers(curr => curr - 1);
                })
                .catch(error => notify.error(error));
        } else {
            followersService.follow({ userId, vacationId })
                .then(() => {
                    setIsFollowing(true);
                    setNumberOfFollowers(curr => curr + 1);
                })
                .catch(error => notify.error(error))
        }
    }

    return (
        <div className="VacationCard col">
                
            <div className="card border-secondary mb-3 h-100" style={{ width: '18rem' }}>
                <img src={props.vacation.imageUrl ? props.vacation.imageUrl : ''} className="card-img-top" alt="destination" />
                <div className="card-img-overlay">
                    {user?.roleId === 2 && <>
                        <button className="btn" 
                            style={{
                                backgroundColor: isFollowing ? 'salmon' : 'grey',
                                color: 'white', position: "absolute", top: 0, right: 0
                            }}
                            onClick={handleFollow}>
                            <FontAwesomeIcon icon={isFollowing ? solidHeart : regularHeart} /> {numberOfFollowers}
                        </button> <br/><br/><br/>
                    </>}
                    <h5 className="card-title" style={{position: "absolute", top: 120, left: 10}}>{props.vacation.destination}</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><h6 className="card-text">{formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}</h6></li>
                        <li className="list-group-item"><p className="card-text">{props.vacation.description}</p></li>
                        <li className="list-group-item"><h6 className="card-text">Price: {formatPrice(props.vacation.price)}</h6></li>

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