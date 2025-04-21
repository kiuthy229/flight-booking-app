import React, { useState, useContext } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import registerImg from '../assets/register.png'
import userIcon from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/register.css'
import { AuthContext } from '../context/AuthContext'
import { post } from '../utils/api'
import { useMutation } from 'react-query'

interface Credentials {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const mutation = useMutation(
    (newUser: Omit<Credentials, 'confirmPassword'>) =>
      post('/auth/register', newUser),
    {
      onSuccess: () => {
        dispatch({ type: 'REGISTER_SUCCESS' })
        alert('Registration successful!')
        navigate('/login')
      },
      onError: () => {
        alert('Registration failed. Please try again.')
      },
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()

    if (credentials.password !== credentials.confirmPassword) {
      return alert('Passwords do not match')
    }

    mutation.mutate({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    })
  }

  return (
    <section className="register">
      <Container>
        <Row>
          <Col lg="10" className="m-auto">
            <div className="register__container d-flex justify-content-between">
              <div className="register__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="register__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>

                <h2 className="register__title">Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Username"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
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
                  <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
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
                    {mutation.isLoading ? 'Registering...' : 'Create Account'}
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register
