import React, { useState, useContext } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import loginImg from '../assets/login.png'
import userIcon from '../assets/user.png'
import { AuthContext } from '../context/AuthContext'
import { post } from '../utils/api'
import { useMutation } from 'react-query'

interface Credentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  role: string
  success: boolean
  message: string
  data: {
    _id: string
    username: string
    email: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  })
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''

  const mutation = useMutation(
    (userCredentials: Credentials) =>
      post('/auth/login', userCredentials, token) as Promise<LoginResponse>,
    {
      onSuccess: (data: LoginResponse) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data })
        localStorage.setItem('token', data.token)
        alert('Login successful!')
        navigate('/')
      },
      onError: () => {
        dispatch({ type: 'LOGIN_FAILED', payload: 'Something went wrong' })
        alert('Login failed. Please try again.')
      },
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    mutation.mutate(credentials)
  }

  return (
    <section className="login">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>

                <h2 className="login__title">Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button
                    color="primary"
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
