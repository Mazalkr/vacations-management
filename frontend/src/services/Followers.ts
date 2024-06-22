import axios from "axios";
import FollowerModel from "../models/Follower";
import VacationModel from "../models/Vacation";
import appConfig from "../utils/AppConfig";
import { FollowersAction, FollowersActionType, followersStore } from "../redux/FollowersState";


class Followers {

    // Number of followers by vacation id: 
    public async countAllByVacation(vacationId: string): Promise<number> {
        const response = await axios.get<number>(`${appConfig.followersByVacationsUrl}/${vacationId}`);
        const numberOfFollowers = response.data;
        return numberOfFollowers;
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
    
    // Check if the user isFollowing on specific vacation:
    public async isFollowing(follower: FollowerModel): Promise<boolean> {
        const response = await axios.get<boolean>(`${appConfig.vacationsByUserFollowing}/${follower.userId}`);
        const isFollowing = response.data;
        console.log('isFollowing', isFollowing);  // I get an array of 
        return isFollowing;
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