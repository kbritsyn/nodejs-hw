import { Response } from 'express';
import { mocked } from 'ts-jest/utils';
import { Group } from '../db/models/group';
import { GroupDTO } from './group.dto';
import { groupsController } from './groups.controller';
import { groupsService } from './groups.service';

jest.mock('./groups.service');

const resMock: Partial<Response> = {
    json: jest.fn()
};

const groupDto: GroupDTO = {
    name: 'name',
    permissions: ['READ']
}

const group: Partial<Group> = {
    ...groupDto,
    id: 'id'
};

const params = { id: group.id };

describe('Groups controller', () => {
    beforeEach(() => {
        resMock.status = jest.fn().mockReturnValue(resMock);
    });

    describe('getGroups method', () => {
        it('should call getGroups service method and return json', async () => {
            const expectedGroups = [group as Group]
            const getGroupsMock = mocked(groupsService.getGroups).mockImplementation(() => Promise.resolve(expectedGroups));
            await groupsController.getGroups(null as any, resMock as any);
            expect(getGroupsMock).toBeCalled();
            expect(resMock.json).toBeCalledWith(expectedGroups);
        });
    });

    describe('getGroupById method', () => {        
        describe('if group exists', () => {
            it('should call getGroupById service and json the group', async () => {
                const getByIdMock = mocked(groupsService.getGroupById).mockImplementation(() => Promise.resolve(group as Group));
                await groupsController.getGroupById({ params } as any, resMock as any);
                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).not.toBeCalled();
                expect(resMock.json).toBeCalledWith(group);
            });
        });
        
        describe('if group doesn\'t exist', () => {
            it('should call getGroupById service method and return 404 error', async () => {
                const getByIdMock = mocked(groupsService.getGroupById).mockImplementation(() => Promise.resolve(null));
                await groupsController.getGroupById({ params } as any, resMock as any);
                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).toBeCalledWith(404);
                expect(resMock.json).toBeCalled();
            });
        });
    });

    describe('createGroup method', () => {
        it('should call createGroup service method and return json', async () => {
            const createGroupMock = mocked(groupsService.createGroup).mockImplementation(() => Promise.resolve(group as Group));
            await groupsController.createGroup({ body: groupDto } as any, resMock as any);
            expect(createGroupMock).toBeCalledWith(groupDto);
            expect(resMock.json).toBeCalledWith(group);
        });
    });

    describe('updateGroup method', () => {
        const updatedGroupDto: GroupDTO = {
            ...groupDto,
            permissions: ['READ', 'WRITE']
        }
        const updatedGroup = {
            ...group,
            ...updatedGroupDto
        };
        describe('if group exists', () => {
            it('should call updateGroup service method and json the group', async () => {
                const getByIdMock = mocked(groupsService.getGroupById).mockImplementation(() => Promise.resolve(group as Group));
                mocked(groupsService.updateGroup).mockImplementation(() => Promise.resolve(updatedGroup as Group));

                await groupsController.updateGroup({ params, body: updatedGroupDto } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(groupsService.updateGroup).toBeCalledWith(group, updatedGroupDto);
                expect(resMock.status).not.toBeCalled();
                expect(resMock.json).toBeCalledWith(updatedGroup);
            });
        });
        
        describe('if group doesn\'t exist', () => {
            it('shouldn\'t call updateGroup service method but return 404 error instead', async () => {
                const getByIdMock = mocked(groupsService.getGroupById).mockImplementation(() => Promise.resolve(null));

                await groupsController.updateGroup({ params, body: updatedGroupDto } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).toBeCalledWith(404);
                expect(groupsService.updateGroup).not.toBeCalled();
                expect(resMock.json).toBeCalled();
            });
        });
    });

    describe('removeGroup method', () => {
        describe('if group exists', () => {
            it('should call service and json the group', async () => {
                const removalResult = true;
                const getByIdMock = mocked(groupsService.getGroupById).mockImplementation(() => Promise.resolve(group as Group));
                mocked(groupsService.removeGroup).mockImplementation(() => Promise.resolve(removalResult));

                await groupsController.removeGroup({ params } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(groupsService.removeGroup).toBeCalledWith(group);
                expect(resMock.status).not.toBeCalled();
                expect(resMock.json).toBeCalledWith(removalResult);
            });
        });
        
        describe('if group doesn\'t exist', () => {
            it('shouldn\'t call removeGroup service method but return 404 error instead', async () => {
                const getByIdMock = mocked(groupsService.getGroupById).mockImplementation(() => Promise.resolve(null));

                await groupsController.removeGroup({ params } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).toBeCalledWith(404);
                expect(groupsService.removeGroup).not.toBeCalled();
                expect(resMock.json).toBeCalled();
            });
        });
    });

    describe('addUsersToGroup method', () => {
        const userIds = ['1', '2'];

        describe('if group exists', () => {
            it('should call addUsersToGroup service and json the group', async () => {
                const getByIdMock = mocked(groupsService.getGroupById).mockImplementation(() => Promise.resolve(group as Group));
                mocked(groupsService.addUsersToGroup).mockImplementation(() => Promise.resolve());

                await groupsController.addUsersToGroup({ params, body: userIds } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(groupsService.addUsersToGroup).toBeCalledWith(group, userIds);
                expect(resMock.status).not.toBeCalled();
                expect(resMock.json).toBeCalledWith();
            });
        });
        
        describe('if group doesn\'t exist', () => {
            it('shouldn\'t call addUsersToGroup service method but return 404 error instead', async () => {
                const getByIdMock = mocked(groupsService.getGroupById).mockImplementation(() => Promise.resolve(null));

                await groupsController.addUsersToGroup({ params, body: userIds } as any, resMock as any);

                expect(getByIdMock).toBeCalledWith(params.id);
                expect(resMock.status).toBeCalledWith(404);
                expect(groupsService.addUsersToGroup).not.toBeCalled();
                expect(resMock.json).toBeCalled();
            });
        });
    });
});
