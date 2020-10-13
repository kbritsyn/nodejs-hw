import { Response } from 'express';
import { mocked } from 'ts-jest/utils';
import { User } from '../db/models/user';
import { UserDTO } from './user.dto';
import { usersController } from './users.controller';
import { usersService } from './users.service';

jest.mock('./users.service');

const resMock: Partial<Response> = {
    json: jest.fn()
};

const userDto: UserDTO = {
    login: 'login',
    password: 'pwd',
    age: 20
}

const user: Partial<User> = {
    ...userDto,
    id: 'id'
};

const params = { id: user.id };


describe('Users controller', () => {
    beforeEach(() => {
        resMock.status = jest.fn().mockReturnValue(resMock);
    });

    describe('getUsers method', () => {
        it('should call getUsers service method and return json', async () => {
            const query = { limit: '3', loginSubstring: 'Test' };
            await usersController.getUsers({ query } as any, resMock as any);
            expect(usersService.getUsers).toBeCalledWith(query.loginSubstring, +query.limit);
            expect(resMock.json).toBeCalled();
        });
    });

    describe('getUserById method', () => {        
        describe('if user exists', () => {
            it('should call service and json the user', async () => {
                const getByIdMock = mocked(usersService.getUserById).mockImplementation(() => Promise.resolve(user as User));
                await usersController.getUserById({ params } as any, resMock as any);
                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).not.toBeCalled();
                expect(resMock.json).toBeCalledWith(user);
            });
        });
        
        describe('if user doesn\'t exist', () => {
            it('should call getUserById service method and return 404 error', async () => {
                const getByIdMock = mocked(usersService.getUserById).mockImplementation(() => Promise.resolve(null));
                await usersController.getUserById({ params } as any, resMock as any);
                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).toBeCalledWith(404);
                expect(resMock.json).toBeCalled();
            });
        });
    });

    describe('createUser method', () => {
        it('should call createUser service method and return json', async () => {
            const createUserMock = mocked(usersService.createUser).mockImplementation(() => Promise.resolve(user as User));
            await usersController.createUser({ body: userDto } as any, resMock as any);
            expect(createUserMock).toBeCalledWith(userDto);
            expect(resMock.json).toBeCalledWith(user);
        });
    });

    describe('updateUser method', () => {
        const updatedUserDto = {
            ...userDto,
            age: 40
        }
        const updatedUser = {
            ...user,
            ...updatedUserDto
        };

        describe('if user exists', () => {
            it('should call service and json the user', async () => {
                const getByIdMock = mocked(usersService.getUserById).mockImplementation(() => Promise.resolve(user as User));
                mocked(usersService.updateUser).mockImplementation(() => Promise.resolve(updatedUser as User));

                await usersController.updateUser({ params, body: updatedUserDto } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(usersService.updateUser).toBeCalledWith(user, updatedUserDto);
                expect(resMock.status).not.toBeCalled();
                expect(resMock.json).toBeCalledWith(updatedUser);
            });
        });
        
        describe('if user doesn\'t exist', () => {
            it('shouldn\'t call updateUser service method but return 404 error instead', async () => {
                const getByIdMock = mocked(usersService.getUserById).mockImplementation(() => Promise.resolve(null));

                await usersController.updateUser({ params, body: updatedUserDto } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).toBeCalledWith(404);
                expect(usersService.updateUser).not.toBeCalled();
                expect(resMock.json).toBeCalled();
            });
        });
    });

    describe('removeUser method', () => {
        describe('if user exists', () => {
            it('should call service and json the user', async () => {
                const getByIdMock = mocked(usersService.getUserById).mockImplementation(() => Promise.resolve(user as User));
                mocked(usersService.removeUser).mockImplementation(() => Promise.resolve(user as User));

                await usersController.removeUser({ params } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(usersService.removeUser).toBeCalledWith(user);
                expect(resMock.status).not.toBeCalled();
                expect(resMock.json).toBeCalledWith(user);
            });
        });
        
        describe('if user doesn\'t exist', () => {
            it('shouldn\'t call removeUser service method but return 404 error instead', async () => {
                const getByIdMock = mocked(usersService.getUserById).mockImplementation(() => Promise.resolve(null));

                await usersController.removeUser({ params } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).toBeCalledWith(404);
                expect(usersService.removeUser).not.toBeCalled();
                expect(resMock.json).toBeCalled();
            });
        });
    });
});
