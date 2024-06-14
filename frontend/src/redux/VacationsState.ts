import { createStore } from "redux";
import Vacation from "../models/Vacation";

// Imagine all this approach as cache.
// we want to overcome the delay of uploading the products. 
// we doesn't want to fetch the data *every* time from the server.

// the easiest way to explain redux is from the last line to the top line.

// 1. Global State for vacations:
export class VacationsState {
    public vacations: Vacation[] = []; 
}

// 2. Action Type:
// what types of actions do we want to enable on the data itself. (here we want CRUD actions).
export enum VacationsActionType {  
    SetVacations = 'SetVacations',
    AddVacations = 'AddVacations',
    DeleteVacations = 'DeleteVacations',
    UpdateVacations = 'UpdateVacations'
}

// 3. Action object:
// payload (מטען) - which data I send for this action. here we defined it as 'any'.
// this is the specific data that delivered with the action.
// to overcome on 'payload?: any' I used the method 'union type':
export type VacationPayLoad = Vacation[] | Vacation | number | string; // CONSIDER TO DELETE NUMBER! 
export interface VacationsAction {
    type: VacationsActionType,  // set/delete/update/add = CRUD
    payload?: VacationPayLoad, 
}

// 4. Reducer():
// why reducer? it gets the changes on the global state, and it need to return just ONE thing --> the new state.
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    // currentState = new VacationsState() --> 
    // new because if it's the first time we upload the app, no one already create new VacationsState, so we create it.

    const newState = {...currentState};  // this is called cloning (שכפול). 
    //I don't make the changes directly on the current state, first I clone it to 'new state',
    // I return it, and redux will change the global state.
    // const newState = currentState; // in that case every change in 'newState' affect on the data in 'currentState'.
    // בצורה הזאת אנחנו כאילו שומרים את הכתובת שבזיכרון של המצב העכשווי בתוך המצב החדש, 
    // ואז כל שינוי שנעשה במצב החדש יגולם גם במצב העכשווי

    // reduce commands:
    switch(action.type) {
        case VacationsActionType.SetVacations:  // payload here will be an array of vacations: Vacation[].
            newState.vacations = action.payload as Vacation[];  // if it wasn't 'any' so we add here 'as Vacation[]'.
            break;
        case VacationsActionType.AddVacations:  // payload here will be a single vacation: Vacation.
            const singleVacation = action.payload as Vacation;
            newState.vacations.push(singleVacation);
            break;
        case VacationsActionType.DeleteVacations:  // payload here will be vacation id: string.
            const vacationId = action.payload as string;
            const indexToDelete = newState.vacations.findIndex(vacation => vacation.id === vacationId);
            // findIndex --> return the index if it find something or return -1 if it didn't find.
            if (indexToDelete !== -1) newState.vacations.splice(indexToDelete, 1);  
            break;
        case VacationsActionType.UpdateVacations:  // payload here will be a single vacation: Vacation.
            const vacationToUpdate = action.payload as Vacation;
            const indexToUpdate = newState.vacations.findIndex(vacation => vacation.id === vacationToUpdate.id);
            if (indexToUpdate !== -1) newState.vacations[indexToUpdate] = vacationToUpdate;
            break;
    }

    return newState;
    // I return the new state (clone of current state) to REDUX, it will change the current based on that. 
}

// 5. Store (אחסון):
export const vacationsStore = createStore(vacationsReducer);