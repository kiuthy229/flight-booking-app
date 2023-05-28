import { Fragment, FunctionComponent } from 'react'

interface UserAuthenticationProps {}

const UserAuthentication: FunctionComponent<UserAuthenticationProps> = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m6">
          <div className="card ">
            <div className="card-content">
              <span className="card-title">
                Please enter the code we just sent to your email
              </span>
            </div>
            <div className="card-action">
              <div className="group">
                <input type="text" placeholder="" />
              </div>
              <div className="group">
                <button
                  className="waves-effect waves-teal btn-flat green"
                  type="button"
                  data-qa="decrement-counter"
                  onClick={() => console.log('authen')}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default UserAuthentication
