import { IEntry } from './entry.model';

export interface ITag {
    id?: number;
    name?: string;
    entries?: IEntry[];
}

export class Tag implements ITag {
    constructor(public id?: number, public name?: string, public entries?: IEntry[]) {}
}
