import DTO from './dto';
import PaginationDTO from './pagination-dto';

export default interface Model {
    getAll(): Promise<DTO[]>;
    getAllPaginated(pagination: PaginationDTO): Promise<DTO[]>;  // getAll with pagination
    getOne(id: string): Promise<DTO>;  
    // getFutureVacations(): Promise<DTO[]>;
    getFutureVacations(pagination: PaginationDTO): Promise<DTO[]>; // with pagination
    getActiveVacations(): Promise<DTO[]>;
    add(vacation: DTO): Promise<DTO>;
    delete(id: string): Promise<boolean>;
    update(product: DTO): Promise<DTO>;
}