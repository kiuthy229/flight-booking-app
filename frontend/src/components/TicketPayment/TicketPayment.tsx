import { Fragment, FunctionComponent, useState } from 'react'
import { formatNumberWithCommas } from '../../utils/formatNumberWithCommas'

interface TicketPaymentProps {}

const TicketPayment: FunctionComponent<TicketPaymentProps> = () => {
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Credit Card')

  const handlePayment = () => {
    // Handle payment logic here
    console.log('Payment processed')
  }

  return (
    <Fragment>
      <div className="p-4 bg-white shadow-md rounded-md">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="payment-method"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Method
          </label>
          <div className="mt-1 flex gap-2">
            <button
              className={`px-4 py-2 rounded-md ${
                paymentMethod === 'Credit Card'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setPaymentMethod('Credit Card')}
            >
              Credit Card
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                paymentMethod === 'Napas'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setPaymentMethod('Napas')}
            >
              Napas
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                paymentMethod === 'Momo'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setPaymentMethod('Momo')}
            >
              Momo
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            type="text"
            id="card-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="expiry-date"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry Date
          </label>
          <input
            type="text"
            id="expiry-date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mobile-number"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile-number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <h5 className="text-xl font-bold text-yellow-600">
            {formatNumberWithCommas(3000000)} VND
          </h5>
        </div>

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          onClick={handlePayment}
        >
          Confirm Payment
        </button>
      </div>
    </Fragment>
  )
}

export default TicketPayment
