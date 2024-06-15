import FollowerDTO from './follower-dto';
import CsvDTO from './csv-dto';
import VacationDTO from '../vacations/dto';

export default interface Model {
    getAllFollowersPerVacation(): Promise<CsvDTO[]>;  // table with number of followers for every vacation 
    countAllByVacation(vacationId: string): Promise<number>;  // number of followers by vacation id. 
    getAllByUserFollowing(userId: string): Promise<VacationDTO[]>;  // vacations that the user is following. 
    getAllVacations(userId: string): Promise<VacationDTO[]>;  // include isFollowing and count of followers per vacation.
    // isUserFollowing(follower: DTO): Promise<boolean>;  // I need userId and vacationId. ---CONSIDER TO DELETE!---
    // getOneByUser(vacationId: string, userId: string): Promise<VacationDTO>;  
    follow(follower: FollowerDTO): Promise<FollowerDTO>;
    unFollow(follower: FollowerDTO): Promise<boolean>;
}