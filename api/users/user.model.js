import { v4 as uuid } from 'uuid';

export class User {
    constructor(user) {
        this.login = user.login;
        this.password = user.password;
        this.age = user.age;
        this.id = uuid();
        this.isDeleted = false;
    }
}

