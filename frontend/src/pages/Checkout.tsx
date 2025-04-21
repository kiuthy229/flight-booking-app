import React, { useState, useMemo } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useMutation } from 'react-query'
import '../styles/checkout.css'
import { post } from '../utils/api'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!)

interface CardErrors {
  cardNumber: string
  expiryDate: string
  cvc: string
}

interface SplitFormProps {
  onPaymentMethodCreated: (paymentMethodId: string) => void
}

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    []
  )

  return options
}

const SplitForm: React.FC<SplitFormProps> = ({ onPaymentMethodCreated }) => {
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()

  const [cardErrors, setCardErrors] = useState<CardErrors>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  })

  const handleCardChange = (field: keyof CardErrors, event: any) => {
    if (event.error) {
      setCardErrors((prev) => ({ ...prev, [field]: event.error.message }))
    } else {
      setCardErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      alert('Stripe.js has not loaded yet.')
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement)!,
    })

    if (error) {
      console.error('[PaymentMethod Error]', error)
      console.log(error.message)
    } else if (paymentMethod) {
      console.log('[PaymentMethod]', paymentMethod)
      onPaymentMethodCreated(paymentMethod.id)
      console.log('Payment method created successfully!')
    } else {
      console.log('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <form className="split-form" onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement
          options={options}
          onChange={(event) => handleCardChange('cardNumber', event)}
        />
        {cardErrors.cardNumber && (
          <p className="error-message">{cardErrors.cardNumber}</p>
        )}
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onChange={(event) => handleCardChange('expiryDate', event)}
        />
        {cardErrors.expiryDate && (
          <p className="error-message">{cardErrors.expiryDate}</p>
        )}
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onChange={(event) => handleCardChange('cvc', event)}
        />
        {cardErrors.cvc && <p className="error-message">{cardErrors.cvc}</p>}
      </label>
      <button disabled={!stripe} type="submit">
        Verify
      </button>
    </form>
  )
}

const Checkout: React.FC = () => {
  const location = useLocation()
  const { tourId, title, price, guestSize, date } = location.state as {
    tourId: string
    title: string
    price: number
    guestSize: number
    date: string
  }
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''

  const mutation = useMutation(
    async () => {
      const userString = localStorage.getItem('user')
      const userId = userString ? JSON.parse(userString)._id : null

      if (!userId) {
        throw new Error('User not logged in.')
      }

      await post(
        '/payments',
        {
          userId,
          bookingId: tourId,
          amount: price * guestSize + 10,
          currency: 'usd',
          paymentMethodId,
        },
        token
      )
    },
    {
      onSuccess: () => {
        alert('Payment successful!')
        navigate('/thank-you')
      },
      onError: () => {
        alert('Payment failed. Please try again.')
      },
    }
  )

  const handlePayment = () => {
    if (!paymentMethodId) {
      alert('Please create a payment method first.')
      return
    }

    mutation.mutate()
  }

  return (
    <section className="checkout">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <h2 className="checkout__title">Checkout</h2>
            <div className="booking__summary">
              <h5>Booking Summary</h5>
              <p>
                <strong>Tour:</strong> {title}
              </p>
              <p>
                <strong>Travelers:</strong> {guestSize}
              </p>
              <p>
                <strong>Booking Date:</strong> {date}
              </p>
              <p>
                <strong>Total Price:</strong> ${price * guestSize + 10}
              </p>
            </div>
            <Elements stripe={stripePromise}>
              <SplitForm onPaymentMethodCreated={setPaymentMethodId} />
            </Elements>
            <Button
              color="primary"
              className="btn primary__btn w-100 mt-4"
              onClick={handlePayment}
              disabled={!paymentMethodId || mutation.isLoading}
            >
              {mutation.isLoading ? 'Processing...' : 'Confirm Payment'}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Checkout
