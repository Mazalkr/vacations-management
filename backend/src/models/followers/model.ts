import FollowerDTO from './follower-dto';
import ReportDTO from './report-dto';
import VacationDTO from '../vacations/dto';

export default interface Model {
    getAllFollowersPerVacation(): Promise<ReportDTO[]>;  
    countAllByVacation(vacationId: string): Promise<number>;  
    getAllByUserFollowing(userId: string): Promise<VacationDTO[]>;  
    getAllVacations(userId: string): Promise<VacationDTO[]>;  // include isFollowing and number of followers per vacation.
    follow(follower: FollowerDTO): Promise<FollowerDTO>;
    unFollow(follower: FollowerDTO): Promise<boolean>;
}