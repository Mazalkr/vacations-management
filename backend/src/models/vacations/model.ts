import DTO from './dto';
import PaginationDTO from './pagination-dto';

export default interface Model {
    getAll(): Promise<DTO[]>;
    getAllPaginated(pagination: PaginationDTO): Promise<DTO[]>;  
    getOne(id: string): Promise<DTO>;  
    getFutureVacations(pagination: PaginationDTO): Promise<DTO[]>; 
    getActiveVacations(pagination: PaginationDTO): Promise<DTO[]>;
    add(vacation: DTO): Promise<DTO>;
    delete(id: string): Promise<boolean>;
    update(product: DTO): Promise<DTO>;
}