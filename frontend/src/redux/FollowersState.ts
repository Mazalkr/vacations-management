import { createStore } from "redux";
import Follower from "../models/Follower";

// 1. Global State for followers:
export class FollowersState {
    public followers: Follower[] = []; 
}

// 2. Action Type:
// what types of actions do we want to enable on the data itself. (here we want CRUD actions).
export enum FollowersActionType { 
    SetFollowers = 'SetFollowers', 
    AddFollow = 'AddFollow',
    DeleteFollow = 'DeleteFollow',
}

// 3. Action object:
export type FollowerPayLoad = Follower[] | Follower | number | string; // CONSIDER TO DELETE NUMBER! 
export interface FollowersAction {
    type: FollowersActionType,  // set/delete = follow/unfollow
    payload?: FollowerPayLoad, 
}

// 4. Reducer():
export function followersReducer(currentState = new FollowersState(), action: FollowersAction): FollowersState {
    const newState = {...currentState};  // this is called cloning (שכפול).

    // reduce commands:
    switch(action.type) {
        case FollowersActionType.SetFollowers:  // payload here will be an array of followers: Follower[].
            newState.followers = action.payload as Follower[];
            break;
        case FollowersActionType.AddFollow:  
            const singleFollower = action.payload as Follower;
            newState.followers.push(singleFollower);
            break;
        case FollowersActionType.DeleteFollow:  // payload here will be vacationId: string.
            const vacationId = action.payload as string;
            const indexToDelete = newState.followers.findIndex(follower => follower.vacationId === vacationId);
            // findIndex --> return the index if it find something or return -1 if it didn't find.
            if (indexToDelete !== -1) newState.followers.splice(indexToDelete, 1);  
            break;
    }

    return newState;
}

// 5. Store (אחסון):
export const followersStore = createStore(followersReducer);