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
import Spinner from "../../common/spinner/Spinner";
// import RandomImageSource from '../../../../../backend/images/09719cc5-87be-4663-a2bc-acfb01b8aa67.jpg'

function List(): JSX.Element {

    // we need to use 'useState' because the data on the products is async and all the other commands are sync...
    const [vacations, setVacations] = useState<Vacation[]>([]);

    // we need to use 'useEffect' to avoid the refresh & re-render every time the vacations data is updated...
    useEffect(() => {
        console.log('useEffect')
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

    async function allVacations() {
        try {
            const allVacations = await vacationsService.getAll();
            setVacations([...allVacations]);
        } catch (err) {
            notify.error(err);
        }
    }

    async function futureVacations() {
        try {
            const futureVacations = await vacationsService.getFutureVacations();
            setVacations([...futureVacations]);
        } catch (err) {
            notify.error(err);
        }
    }

    async function activeVacations() {
        try {
            const activeVacations = await vacationsService.getActiveVacations();
            setVacations([...activeVacations]);
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
            <br/>
            <br/>

            <button onClick={allVacations}>All vacations</button>
            <button onClick={futureVacations}>Future vacations</button>
            <button onClick={activeVacations}>Active vacations</button>
            <br/>
            <br/>

            {vacations.length === 0 && <Spinner/>}

            {vacations.map(v => <VacationCard key={v.id} vacation={v} deleteVacation={deleteCardVacation}/>)}

        </div>
       
    );
}

export default List;
