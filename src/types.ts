export interface Message {
    date: Date,
    user: User,
    content: string
};

export interface User {
    name: string,
    color: string
}

export const emptyUser = {
    name: "",
    color: "#000000"
}
