import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from '../store/counter/actionTypes'

interface IncrementCounterAction {
  type: typeof INCREMENT_COUNTER
}
interface DecrementCounterAction {
  type: typeof DECREMENT_COUNTER
}
export type CounterActionTypes = IncrementCounterAction | DecrementCounterAction

export interface SystemState {
  count: {
    value: number
  }
}

export interface UserDetails {
  user_id: number
  username: string
  full_name: string
  date_of_birth: string
  phone_number: number
  email: string
  password: string
}
