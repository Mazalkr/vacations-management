import { createStore } from "redux";
import Vacation from "../models/Vacation";

// 1. Global State for vacations:
export class VacationsState {
    public vacations: Vacation[] = []; 
}

// 2. Action Type:
export enum VacationsActionType {  
    SetVacations = 'SetVacations',
    AddVacations = 'AddVacations',
    DeleteVacations = 'DeleteVacations',
    UpdateVacations = 'UpdateVacations'
}

// 3. Action object:

export type VacationPayLoad = Vacation[] | Vacation | number | string;  
export interface VacationsAction {
    type: VacationsActionType,  
    payload?: VacationPayLoad, 
}

// 4. Reducer():
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = {...currentState};  

    // reduce commands:
    switch(action.type) {
        case VacationsActionType.SetVacations:  
            newState.vacations = action.payload as Vacation[];  
            break;
        case VacationsActionType.AddVacations: 
            const singleVacation = action.payload as Vacation;
            newState.vacations.push(singleVacation);
            break;
        case VacationsActionType.DeleteVacations: 
            const vacationId = action.payload as string;
            const indexToDelete = newState.vacations.findIndex(vacation => vacation.id === vacationId);
            if (indexToDelete !== -1) newState.vacations.splice(indexToDelete, 1);  
            break;
        case VacationsActionType.UpdateVacations: 
            const vacationToUpdate = action.payload as Vacation;
            const indexToUpdate = newState.vacations.findIndex(vacation => vacation.id === vacationToUpdate.id);
            if (indexToUpdate !== -1) newState.vacations[indexToUpdate] = vacationToUpdate;
            break;
    }

    return newState;
}

// 5. Store::
export const vacationsStore = createStore(vacationsReducer);