import axios from "axios";
import FollowerModel from "../models/Follower";
import VacationModel from "../models/Vacation";
import appConfig from "../utils/AppConfig";
import { FollowersAction, FollowersActionType, followersStore } from "../redux/FollowersState";


class Followers {

    // number of followers by vacation id. 
    public async countAllByVacation(vacationId: string): Promise<number> {
        const response = await axios.get<number>(`${appConfig.followersByVacationsUrl}/${vacationId}`);
        const vacations = response.data;
        return vacations;
    }

    // vacations that the user is following. 
    public async getAllByUserFollowing(userId: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsByUserFollowing}/${userId}`);
        const vacations = response.data;
        return vacations;
    }

    // include isFollowing and count of followers per vacation.
    public async getAllVacations(userId: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsExtendedUrl}/${userId}`);
        const vacations = response.data;
        return vacations;
    }

    // isUserFollowing(follower: DTO): Promise<boolean>;  // I need userId and vacationId. ---CONSIDER TO DELETE!---
    // getOneByUser(vacationId: string, userId: string): Promise<VacationDTO>;  

    public async follow(follower: FollowerModel): Promise<FollowerModel> {
        
        const response = await axios.post<FollowerModel>(appConfig.followersUrl, follower);
        
        const addedFollow = response.data;

        // create an AddFollow action for redux:
        const action: FollowersAction = {
            type: FollowersActionType.AddFollow,
            payload: addedFollow
        }

        // preform the action on redux:
        followersStore.dispatch(action);  // this command activate the action.

        return addedFollow;
    }

    public async unFollow(follower: FollowerModel): Promise<void> {
        await axios.delete(appConfig.followersUrl);

        // we need to do the redux after we delete it from the server.

        // create an DeleteVacation action for redux:
        const action: FollowersAction = {
            type: FollowersActionType.DeleteFollow,
            payload: follower.vacationId  
        }

        // preform the action on redux:
        followersStore.dispatch(action);
    }

}

const followers = new Followers();
export default followers;