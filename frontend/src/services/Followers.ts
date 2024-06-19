import axios from "axios";
import FollowerModel from "../models/Follower";
import VacationModel from "../models/Vacation";
import appConfig from "../utils/AppConfig";
import { FollowersAction, FollowersActionType, followersStore } from "../redux/FollowersState";


class Followers {

    // Number of followers by vacation id: 
    public async countAllByVacation(vacationId: string): Promise<number> {
        const response = await axios.get<number>(`${appConfig.followersByVacationsUrl}/${vacationId}`);
        const vacations = response.data;
        return vacations;
    }

    // Vacations that the user is following:
    public async getAllByUserFollowing(userId: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsByUserFollowing}/${userId}`);
        const vacations = response.data;
        return vacations;
    }

    // All vacations- include isFollowing and number of followers per vacation:
    public async getAllVacations(userId: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsExtendedUrl}/${userId}`);
        const vacations = response.data;
        return vacations;
    }

    public async follow(follower: FollowerModel): Promise<FollowerModel> {
        
        const response = await axios.post<FollowerModel>(appConfig.followersUrl, follower);
        
        const addedFollow = response.data;

        const action: FollowersAction = {
            type: FollowersActionType.AddFollow,
            payload: addedFollow
        }

        followersStore.dispatch(action);

        return addedFollow;
    }

    public async unFollow(follower: FollowerModel): Promise<void> {
        await axios.delete(appConfig.followersUrl);

        const action: FollowersAction = {
            type: FollowersActionType.DeleteFollow,
            payload: follower.vacationId  
        }

        followersStore.dispatch(action);
    }

}

const followers = new Followers();
export default followers;