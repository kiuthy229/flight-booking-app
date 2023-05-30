export interface SystemState {
  count: {
    value: number
  }
  user: {
    user_id: number
    username: string
    full_name: string
    date_of_birth: string
    phone_number: number
    email: string
    password: string
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
