import User from '@modules/users/infra/typeorm/entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders(date?: IFindAllProvidersDTO): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
