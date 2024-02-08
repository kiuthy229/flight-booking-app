import React, { useState } from 'react'
import Seats from '../Seats/Seats'

const createSeats = (rows, startIndex) => {
  let i = 0
  let j = startIndex
  let k = 'A'
  const section = []
  while (i < 6 && j <= rows) {
    if (k > 'F') {
      k = 'A'
      j++
    }
    if (j < rows + 1) {
      section.push(j + k)
      k = String.fromCharCode(k.charCodeAt(0) + 1)
    }
  }
  return section
}

const BookMySeats = () => {
  const premiumSeats = createSeats(2, '1')
  const normalSeats = createSeats(10, '3')
  const [availableSeats, setAvailableSeats] = useState([
    '1A',
    '1B',
    '2A',
    '2B',
    '10A',
    '10B',
  ])
  const [bookedSeats, setBookedSeats] = useState([])
  const [bookedStatus, setBookedStatus] = useState('')
  const addSeat = (ev) => {
    if (numberOfSeats && !ev.target.className.includes('disabled')) {
      const seatsToBook = parseInt(numberOfSeats, 10)
      if (bookedSeats.length <= seatsToBook) {
        if (bookedSeats.includes(ev.target.innerText)) {
          const newAvailable = bookedSeats.filter(
            (seat) => seat !== ev.target.innerText
          )
          setBookedSeats(newAvailable)
        } else if (bookedSeats.length < numberOfSeats) {
          setBookedSeats([...bookedSeats, ev.target.innerText])
        } else if (bookedSeats.length === seatsToBook) {
          bookedSeats.shift()
          setBookedSeats([...bookedSeats, ev.target.innerText])
        }
      }
    }
  }

  const confirmBooking = () => {
    setBookedStatus('You have successfully booked the following seats:')
    bookedSeats.forEach((seat) => {
      setBookedStatus((prevState) => {
        return prevState + seat + ' '
      })
    })
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat)
    )
    setAvailableSeats(newAvailableSeats)
    setBookedSeats([])
    setNumberOfSeats(0)
  }
  const [numberOfSeats, setNumberOfSeats] = useState(0)

  return (
    <React.Fragment>
      <p>How many seats would you like to book?</p>
      <input
        value={numberOfSeats}
        onChange={(ev) => setNumberOfSeats(ev.target.value)}
      />
      <Seats
        values={premiumSeats}
        availableSeats={availableSeats}
        bookedSeats={bookedSeats}
        addSeat={addSeat}
      />
      <Seats
        values={normalSeats}
        availableSeats={availableSeats}
        bookedSeats={bookedSeats}
        addSeat={addSeat}
      />

      <button onClick={confirmBooking}>Book seats</button>
      <p>{bookedStatus}</p>
    </React.Fragment>
  )
}

export default BookMySeats
