import DTO from './dto';

export default interface Model {
    getAll(): Promise<DTO[]>;
    getOne(id: string): Promise<DTO>;  
    getFutureVacations(): Promise<DTO[]>;
    getActiveVacations(): Promise<DTO[]>;
    add(vacation: DTO): Promise<DTO>;
    delete(id: string): Promise<boolean>;
    update(product: DTO): Promise<DTO>;
}