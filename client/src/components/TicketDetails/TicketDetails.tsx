import { Fragment, FunctionComponent } from 'react'

interface TicketDetailsProps {}

const TicketDetails: FunctionComponent<TicketDetailsProps> = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m6">
          <span className="title">Ticket Details</span>

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
              onClick={() => console.log('')}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TicketDetails
