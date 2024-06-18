import "./List.css";
import { ChangeEvent, useEffect, useState } from "react";
import notify from "../../../services/Notify";
import vacationsService from "../../../services/Vacations";
import Vacation from "../../../models/Vacation";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import getAbsoluteImageSrc from "../../../utils/getAbsoluteImageSrc";
import appConfig from "../../../utils/AppConfig";
import VacationCard from "../vacationCard/VacationCard";
import { vacationsStore } from "../../../redux/VacationsState";
import Spinner from "../../common/spinner/Spinner";

function List(): JSX.Element {

    // we need to use 'useState' because the data on the products is async and all the other commands are sync...
    const [vacations, setVacations] = useState<Vacation[]>([]);

    // we need to use 'useEffect' to avoid the refresh & re-render every time the vacations data is updated...
    useEffect(() => {
        console.log('useEffect from LIST')
        vacationsService.getAll()
            .then(vacationsFromServer => setVacations([...vacationsFromServer]))
            .catch(error => notify.error(error));


        // REDUX:
        // if there is any changes on vacationsStore (REDUX) --> get the new state of data:
        const unsubscribe = vacationsStore.subscribe(() => {
            console.log('vacations store has been modified!');
            setVacations([...vacationsStore.getState().vacations]);  
            // with spread operator '[...productStore]' we're making a clone of 'productStore',
            // and by that every change that we'll do on the clone wont effect on the original 'productStore'. 
        })

        return unsubscribe;  // it will unsubscribe after the component tehares (its happen when we click on another nav...)

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
                notify.success(`deleted vacation with id ${id}`);
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
                </select>
            </div>

            {vacations.length === 0 && <Spinner/>}

            <div className="container">
                <div className="row">
                    {vacations.map(v => <VacationCard key={v.id} vacation={v} deleteVacation={deleteCardVacation}/>)}
                </div>
            </div>

        </div>
    );
}

export default List;