import { createSlice } from '@reduxjs/toolkit'

export interface User {
    login: string,
    password: string
}

export interface UserList {
    userList: User[]
}

const initialState: UserList = {
    userList: []
}

export const slice = createSlice({
    name: 'userList',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userList = [...state.userList, action.payload];
        }
    }
})

export const { addUser } = slice.actions;
export default slice.reducer;