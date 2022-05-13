import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserData } from '../../libs/interfaces'

export interface CounterState {
  authToken: string,
  userData: IUserData,
}

const initialState: CounterState = {
  authToken: '',
  userData: {
    email: '',
    password: '',
    id: '',
    address: '',
    name: '',
    phone: '',
    image: '',
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_AUTH_TOKEN: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        authToken: action.payload
      }
    },
    SET_USER_DATA: (state, action: PayloadAction<IUserData>) => {
      return {
        ...state,
        userData: action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { SET_AUTH_TOKEN, SET_USER_DATA } = userSlice.actions

export default userSlice.reducer