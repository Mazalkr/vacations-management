import { createStore } from "redux";
import Follower from "../models/Follower";
import Report from "../models/Report";

// 1. Global State for followers:
export class FollowersState {
    public followers: Follower[] = []; 
    public followersPerVacation: Report[] = [];
}

// 2. Action Type:
export enum FollowersActionType { 
    SetFollowers = 'SetFollowers', // followers per vacation (for report and csv).
    AddFollow = 'AddFollow',
    DeleteFollow = 'DeleteFollow',
}

// 3. Action object:
export type FollowerPayLoad = Follower[] | Follower | Report[] | number | string;
export interface FollowersAction {
    type: FollowersActionType,
    payload?: FollowerPayLoad, 
}

// 4. Reducer():
export function followersReducer(currentState = new FollowersState(), action: FollowersAction): FollowersState {
    const newState = {...currentState};

    // reduce commands:
    switch(action.type) {
        case FollowersActionType.SetFollowers: 
            newState.followersPerVacation = action.payload as Report[];
            break;
        case FollowersActionType.AddFollow:  
            const singleFollower = action.payload as Follower;
            newState.followers.push(singleFollower);
            break;
        case FollowersActionType.DeleteFollow:  
            const vacationId = action.payload as string;
            const indexToDelete = newState.followers.findIndex(follower => follower.vacationId === vacationId);
            if (indexToDelete !== -1) newState.followers.splice(indexToDelete, 1);  
            break;
    }

    return newState;
}

// 5. Store:
export const followersStore = createStore(followersReducer);