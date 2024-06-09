import axios from "axios";
import Vacation from "../models/Vacation";
import appConfig from "../utils/AppConfig";
import { VacationsAction, VacationsActionType, vacationsStore } from "../redux/VacationsState";

class Vacations {

    //////////////////////////// GET:
    // public async getAll(): Promise<Vacation[]> {

    //     // GET vacations from the remote server:
    //     const response = await axios.get<Vacation[]>(appConfig.vacationsUrl);

    //     // EXTRACT the data from the response:
    //     const vacations = response.data;

    //     return vacations;
    // }

    public async getAll(): Promise<Vacation[]> {

        // GET the vacations from REDUX:
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {
            // GET the vacations from remote server if the array vacations[] in vacationsStore is empty:
            const response = await axios.get<Vacation[]>(appConfig.vacationsUrl);
        
            // EXTRACT the data from the response:
            vacations = response.data;

            // INFORM the redux to load new data:
            // create an action to set the vacations into the state,
            // and set the action to payload, to hold the vacations themselves
            const action: VacationsAction = {
                type: VacationsActionType.SetVacations,
                payload: vacations
            }

            // send this action to 'redux':
            vacationsStore.dispatch(action);  // dispatch --> send the parameter 'action' to 'vacationsStore' in REDUX.
            // dispatch means:
            // first - update the data in the vacationsStore,
            // second - inform all the other component that lain on vacationsStore that there have been a change.
        }
        
        return vacations;
    }

    // public async getOne(id: string): Promise<Vacation> {
    //     const response = await axios.get<Vacation>(`${appConfig.vacationsUrl}/${id}`);
    //     const vacation = response.data;
    //     return vacation;
    // }

    public async getOne(id: string): Promise<Vacation | undefined> {
        // GET the products from REDUX:
        let vacations = vacationsStore.getState().vacations;

        let vacation = vacations.find(v => v.id === id);

        if (!vacation) {
            // // GET the products from remote server if the array products[] in productsStore is empty:
            // const response = await axios.get<Product>(appConfig.productsUrl + `/${id}`);
        
            // // EXTRACT the data from the response:
            // product = response.data;

            // to overcome the delay after refresh the page in specific product details page:
            // for that we add to the promise 'undefined'
            await this.getAll();

            vacations = vacationsStore.getState().vacations;

            vacation = vacations.find(v => v.id === id);

            // the disadvantage in that case: if we search for a vacation that doesn't exist we'll see endless spinner...
            // in the first method we can get an error message...
        }

        return vacation;
    }

    public async getFutureVacations(): Promise<Vacation[]> {
        const response = await axios.get<Vacation[]>(appConfig.futureVacationsUrl);
        const futureVacations = response.data;
        return futureVacations;
    }

    public async getActiveVacations(): Promise<Vacation[]> {
        const response = await axios.get<Vacation[]>(appConfig.activeVacationsUrl);
        const activeVacations = response.data;
        return activeVacations;
    }

    //////////////////////////////////// POST:
    // public async add(vacation: Vacation): Promise<Vacation> {
    //     const response = await axios.post<Vacation>(appConfig.vacationsUrl, vacation);
    //     const addedVacation = response.data;
    //     return addedVacation;
    // }

    public async add(vacation: Vacation): Promise<Vacation> {
        // How to overcome the fact that when the user upload an image file it undefined:
        // the image file defined as binary (mostly gibberish), and POST automatically work with JSON format.
        // in that way we tell the axios don't send the POST request as JSON,
        // instead send the request that divided multi parts: few parts as JSON and the other as binary.
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axios.post<Vacation>(appConfig.vacationsUrl, vacation, options);
        
        const addedVacation = response.data;

        // create an AddVacation action for redux:
        const action: VacationsAction = {
            type: VacationsActionType.AddVacations,
            payload: addedVacation
        }

        // preform the action on redux:
        vacationsStore.dispatch(action);  // this command activate the action.

        return addedVacation;
    }

    ////////////////////////////////// DELETE
    // public async remove(id: string): Promise<void> {
    //     await axios.delete(`${appConfig.vacationsUrl}/${id}`);
    // }

    public async remove(id: string): Promise<void> {
        await axios.delete(`${appConfig.vacationsUrl}/${id}`);

        // we need to do the redux after we delete it from the server.

        // create an DeleteVacation action for redux:
        const action: VacationsAction = {
            type: VacationsActionType.DeleteVacations,
            payload: id  
        }

        // preform the action on redux:
        vacationsStore.dispatch(action);
    }

    /////////////////////////////// UPDATE:
    // public async edit(vacation: Vacation): Promise<Vacation> {
    //     const options = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }

    //     // check if it works with PATCH/PUT:
    //     const response = await axios.patch<Vacation>(`${appConfig.vacationsUrl}/${vacation.id}`, vacation, options);
    //     const updatedVacation = response.data;
    //     return updatedVacation;
    // }

    public async edit(vacation: Vacation): Promise<Vacation> {
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // we can use 'put' if we want to replace all the data of the product,
        // or 'patch' if we want to update part of the data. ----> patch didn't work...
        const response = await axios.patch<Vacation>(`${appConfig.vacationsUrl}/${vacation.id}`, vacation, options);
        
        const updatedVacation = response.data;

        // create an UpdatedVacation action for redux:
        const action: VacationsAction = {
            type: VacationsActionType.UpdateVacations,
            payload: updatedVacation 
        }

        // preform the action on redux:
        vacationsStore.dispatch(action);

        return updatedVacation;
    }
}

const vacations = new Vacations();
export default vacations;