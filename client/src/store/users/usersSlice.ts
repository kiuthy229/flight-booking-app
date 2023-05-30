/* eslint-disable @typescript-eslint/default-param-last */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserDetails } from '../../types/types'

const initialState = {
  user: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDetails>) => {
      return Object.assign({}, state, { user: action.payload })
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = usersSlice.actions

export const usersReducer = usersSlice.reducer

export const isAuthSelector = (state: any) => state.users.user !== null
