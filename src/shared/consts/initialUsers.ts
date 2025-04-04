import { IContacts } from "../types";
import { letters } from "./letter";

export const initialContacts: IContacts = letters.reduce((acc, curr) => {
    acc[curr] = [];
    return acc;
  }, {} as IContacts);

