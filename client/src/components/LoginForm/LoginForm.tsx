import { Fragment, FunctionComponent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function Login() {
    return axios
      .post('http://localhost:8080/users/login', {
        email: email,
        password: password,
      })
      .then(function ({ data }: any) {
        console.log(data?.user_id)
        // axios get user by id
        // navigate to user with that id home page
        navigate('/session-timed-out')
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
                  onClick={() => Login()}
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
