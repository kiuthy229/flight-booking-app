import { Fragment, FunctionComponent } from 'react'

interface BuyTicketProps {}

const BuyTicket: FunctionComponent<BuyTicketProps> = () => {

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
                <input type="text" placeholder="Username or email" />
              </div>
              <div className="group">
                <input type="password" placeholder="Password" />
              </div>
              <div className="group">
                <button
                  className="waves-effect waves-teal btn-flat green"
                  type="button"
                  data-qa="decrement-counter"
                  onClick={() => console.log('login')}
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

export default BuyTicket
