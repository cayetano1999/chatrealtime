import { UserModel } from './user-model';
export class AnonymousModel {
    user: UserModel = new UserModel();
    comment: string = '';
    urlPiture: string = '';
    date: Date = new Date();


}

