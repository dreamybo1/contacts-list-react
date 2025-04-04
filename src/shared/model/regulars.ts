import { IUser } from "../types";

export const regulars: Record<keyof Omit<IUser, 'id'>, RegExp> = {
    name: /^[A-Z][a-z]+(?:[- ][A-Z][a-z]+)*$/,
    vacancy: /^[A-Za-z0-9\s\-&,()]+$/,
    phone: /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
}