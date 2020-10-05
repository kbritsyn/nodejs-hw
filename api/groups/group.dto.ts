import { Permission } from '../db/models/group';

export interface GroupDTO {
    name: string;
    permissions: Permission[];
}
