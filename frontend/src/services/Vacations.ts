import axios from "axios";
import Vacation from "../models/Vacation";
import Pagination from "../models/Pagination";
import appConfig from "../utils/AppConfig";
import { VacationsAction, VacationsActionType, vacationsStore } from "../redux/VacationsState";

class Vacations {

    public async getAll(): Promise<Vacation[]> {

        // GET the vacations from REDUX:
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {
            // GET the vacations from remote server if the array vacations[] in vacationsStore (from redux) is empty:
            const response = await axios.get<Vacation[]>(appConfig.vacationsUrl);
        
            // EXTRACT the data from the response:
            vacations = response.data;


            // INFORM the redux to load new data:
            const action: VacationsAction = {
                type: VacationsActionType.SetVacations,
                payload: vacations
            }

            // SEND this action to 'redux':
            vacationsStore.dispatch(action);  // dispatch --> send the parameter 'action' to 'vacationsStore' in REDUX.
        }
        
        return vacations;
    }

    // getAll with pagination without REDUX:
    public async getAllPaginated(pagination: Pagination): Promise<Vacation[]> {
        const response = await axios.get<Vacation[]>(`${appConfig.vacationsUrl}/${pagination.page}/${pagination.limit}`);
        const vacations = response.data;
        return vacations;
    }

    // // getAll with pagination with REDUX:
    // public async getAllPaginated(pagination: Pagination): Promise<Vacation[]> {

    //     // GET the vacations from REDUX:
    //     let vacations = vacationsStore.getState().vacations;

    //     if (vacations.length === 0) {
    //         // GET the vacations from remote server if the array vacations[] in vacationsStore (from redux) is empty:
    //         const response = await axios.get<Vacation[]>(`${appConfig.vacationsUrl}/${pagination.page}/${pagination.limit}`);
        
    //         // EXTRACT the data from the response:
    //         vacations = response.data;


    //         // INFORM the redux to load new data:
    //         const action: VacationsAction = {
    //             type: VacationsActionType.SetVacations,
    //             payload: vacations
    //         }

    //         // SEND this action to 'redux':
    //         vacationsStore.dispatch(action);  // dispatch --> send the parameter 'action' to 'vacationsStore' in REDUX.
    //     }
        
    //     return vacations;
    // }

    public async getOne(id: string): Promise<Vacation | undefined> {

        let vacations = vacationsStore.getState().vacations;

        let vacation = vacations.find(v => v.id === id);

        if (!vacation) {
            
            await this.getAll();

            vacations = vacationsStore.getState().vacations;

            vacation = vacations.find(v => v.id === id);

        }

        return vacation;
    }

    // public async getFutureVacations(): Promise<Vacation[]> {
    //     const response = await axios.get<Vacation[]>(appConfig.futureVacationsUrl);
    //     const futureVacations = response.data;
    //     return futureVacations;
    // }

    // future vacations with pagination:
    public async getFutureVacations(pagination: Pagination): Promise<Vacation[]> {
        const response = await axios.get<Vacation[]>(`${appConfig.futureVacationsUrl}/${pagination.page}/${pagination.limit}`);
        const futureVacations = response.data;
        return futureVacations;
    }

    public async getActiveVacations(): Promise<Vacation[]> {
        const response = await axios.get<Vacation[]>(appConfig.activeVacationsUrl);
        const activeVacations = response.data;
        return activeVacations;
    }

    public async add(vacation: Vacation): Promise<Vacation> {
        
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axios.post<Vacation>(appConfig.vacationsUrl, vacation, options);
        
        const addedVacation = response.data;

        const action: VacationsAction = {
            type: VacationsActionType.AddVacations,
            payload: addedVacation
        }

        vacationsStore.dispatch(action); 

        return addedVacation;
    }

    public async remove(id: string): Promise<void> {
        await axios.delete(`${appConfig.vacationsUrl}/${id}`);

        const action: VacationsAction = {
            type: VacationsActionType.DeleteVacations,
            payload: id  
        }

        vacationsStore.dispatch(action);
    }

    public async edit(vacation: Vacation): Promise<Vacation> {
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axios.patch<Vacation>(`${appConfig.vacationsUrl}/${vacation.id}`, vacation, options);
        
        const updatedVacation = response.data;

        const action: VacationsAction = {
            type: VacationsActionType.UpdateVacations,
            payload: updatedVacation 
        }

        vacationsStore.dispatch(action);

        return updatedVacation;
    }

}

const vacations = new Vacations();
export default vacations;