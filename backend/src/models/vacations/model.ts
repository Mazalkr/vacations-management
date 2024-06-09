import DTO from './dto';
import FollowerDTO from '../followers/dto';


export default interface Model {
    getAll(): Promise<DTO[]>;
    getOne(id: string): Promise<DTO>;  // CONSIDER NOT TO SHOW IT... 
    getFutureVacations(): Promise<DTO[]>;
    getActiveVacations(): Promise<DTO[]>;
    // getAllByUserFollowing(follower: FollowerDTO): Promise<DTO[]>;
    add(vacation: DTO): Promise<DTO>;
    delete(id: string): Promise<boolean>;
    update(product: DTO): Promise<DTO>;
}