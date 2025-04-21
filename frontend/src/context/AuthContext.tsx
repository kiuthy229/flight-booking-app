import { createContext, useEffect, useReducer, ReactNode } from 'react'

interface User {
  username: string
  photo?: string
  // Add other user properties as needed
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

interface AuthAction {
  type: string
  payload?: any
}

const initialState: AuthState = {
  user:
    localStorage.getItem('user') !== undefined
      ? JSON.parse(localStorage.getItem('user')!)
      : null,
  loading: false,
  error: null,
}

export const AuthContext = createContext<
  AuthState & { dispatch: React.Dispatch<AuthAction> }
>(initialState as AuthState & { dispatch: React.Dispatch<AuthAction> })

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.data,
        loading: false,
        error: null,
      }
    case 'LOGIN_FAILED':
      return {
        user: null,
        loading: false,
        error: action.payload,
      }
    case 'REGISTER_SUCCESS':
      return {
        user: null,
        loading: false,
        error: null,
      }
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
