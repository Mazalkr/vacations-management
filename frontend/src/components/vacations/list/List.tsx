import "./List.css";
import { ChangeEvent, useEffect, useState } from "react";
import notify from "../../../services/Notify";
import vacationsService from "../../../services/Vacations";
import followersService from "../../../services/Followers";
import Vacation from "../../../models/Vacation";
import VacationCard from "../vacationCard/VacationCard";
import { vacationsStore } from "../../../redux/VacationsState";
import Spinner from "../../common/spinner/Spinner";
import User from "../../../models/User";
import { authStore } from "../../../redux/AuthState";
import Follower from "../../../models/Follower";
import { followersStore } from "../../../redux/FollowersState";
import { useParams } from "react-router-dom";

function List(): JSX.Element {


    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        setUser(authStore.getState().user); 
        
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
        
        return unsubscribe;
    }, [])

    useEffect(() => {

        vacationsService.getAll()
            .then(vacationsFromServer => setVacations([...vacationsFromServer]))
            .catch(error => notify.error(error));

        // REDUX:
        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations([...vacationsStore.getState().vacations]);  
            
        })

        return unsubscribe;

    }, []);
   
    async function filteredVacations(event: ChangeEvent<HTMLSelectElement>) {
        const filterType = event.target.value;
        try {
            switch(filterType) {
                case 'allVacations':
                    const allVacations = await vacationsService.getAll();
                    setVacations([...allVacations]);
                    break;
                case 'futureVacations':
                    const futureVacations = await vacationsService.getFutureVacations();
                    setVacations([...futureVacations]);
                    break;
                case 'activeVacations':
                    const activeVacations = await vacationsService.getActiveVacations();
                    setVacations([...activeVacations]);
                    break;
                case 'isFollowingVacations':
                    if (user?.id) {
                        const isFollowing = await followersService.getAllByUserFollowing(user?.id);
                        (isFollowing.length !== 0) ? setVacations([...isFollowing]) : notify.error('You don\'t have any vacations you follow yet');
                    }
                    break;
            }
        } catch (err) {
            notify.error(err);
        }
    }

    async function deleteCardVacation(id: string | undefined) {
        if(!id) return;

        if(window.confirm('Are you sure you want to delete this vacation?')) {
            try {
                await vacationsService.remove(id);
                const updatedVacations = await vacationsService.getAll();
                setVacations([...updatedVacations]);
                notify.success(`deleted vacation successfully`);
            } catch (err) {
                notify.error(err);
            }
        }
    }

    return (
        <div className="List">

            <div className="selectContainer">
                <label htmlFor="form-select" className="form-label">Filter by:</label>
                <select className="form-select" onChange={filteredVacations} defaultValue={'allVacations'}>
                    <option value={'allVacations'}>All Vacations</option>
                    <option value={'futureVacations'}>Future Vacations</option>
                    <option value={'activeVacations'}>Active Vacations</option>
                    {user?.roleId === 2 && <option value={'isFollowingVacations'}>Vacations I follow</option>}
                </select>
            </div>

            {vacations.length === 0 && <Spinner/>}

            <div className="container">
                <div className="row">
                    {vacations.map(v => <VacationCard key={v.id} vacation={v} deleteVacation={deleteCardVacation} />)}
                </div>
            </div>

        </div>
    );
}

export default List;