import { UserModel } from './user-model';
export class AnonymousMessage {
    user: UserModel = new UserModel();
    message: string = '';
    date: string = '';
}