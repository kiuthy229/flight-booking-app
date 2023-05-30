import axios from 'axios'
import { Fragment, FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../store/users/usersSlice'
import { useDispatch } from 'react-redux'

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function login() {
    return axios
      .post('http://localhost:8080/users/login', {
        email: email,
        password: password,
      })
      .then(function (response: any) {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        navigate('/about')
        dispatch(setUser(response.data))
        return response.data
      })
      .catch(function (error: any) {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m6">
          <div className="card ">
            <div className="card-content">
              <span className="card-title">Log In</span>
            </div>
            <div className="card-action">
              <div className="group">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="group">
                <button
                  className="waves-effect waves-teal btn-flat green"
                  type="button"
                  data-qa="decrement-counter"
                  onClick={() => login()}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LoginForm
