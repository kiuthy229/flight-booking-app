/* eslint-disable @typescript-eslint/default-param-last */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserDetails } from '../../types/types'

const initialState: UserDetails = {
  user_id: 0,
  username: '',
  full_name: '',
  date_of_birth: '',
  phone_number: 0,
  email: '',
  password: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDetails>) => {
      return action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = usersSlice.actions

export const usersReducer = usersSlice.reducer
