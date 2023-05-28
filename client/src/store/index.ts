import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './users/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

export { default as CounterReducer } from './counter/counterReducer'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
