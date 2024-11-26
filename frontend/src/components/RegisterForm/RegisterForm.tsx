import axios from 'axios'
import { Fragment, FunctionComponent, useState } from 'react'

interface RegisterFormProps {}

const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  async function createAccount() {
    await axios
      .post('http://localhost:8080/users', {
        username: username,
        full_name: firstName + lastName,
        date_of_birth: birthDate,
        phone_number: phoneNumber,
        email: email,
        password: password,
      })
      .then(function (response: any) {
        console.log(response)
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
              <span className="card-title">Register</span>
            </div>
            <div className="card-action">
              <div className="group">
                <input
                  type="text"
                  placeholder="First name"
                  onChange={(e: any) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  onChange={(e: any) => setLastName(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e: any) => setUsername(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="date"
                  placeholder="Birth date"
                  onChange={(e: any) => setBirthDate(e.target.value)}
                />
              </div>

              <div className="group">
                <input
                  type="text"
                  placeholder="Phone number"
                  onChange={(e: any) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="group">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <div className="group">
                <button
                  className="waves-effect waves-teal btn-flat green"
                  type="button"
                  data-qa="decrement-counter"
                  onClick={() => createAccount()}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default RegisterForm
