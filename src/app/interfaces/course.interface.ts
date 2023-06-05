import { User } from "./user.interface";

export interface Course {
    id: number;
    name: string;
    description: string;
    isTopRated: boolean;
    date: string;
    authors: Array<User>
    length: number;  
}
