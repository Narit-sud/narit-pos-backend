import { StringDecoder } from "node:string_decoder";

export interface StoreInterface {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: StringDecoder;
    createdBy: string;
    updatedBy: string;
}
