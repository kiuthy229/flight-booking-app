type SeatsType = {
  values: string[]
  availableSeats?: string[]
  bookedSeats?: string[]
  addSeat?: Function
}

const Seats: React.FC<SeatsType> = ({ values }) => {
  return (
    <div>
      {values.map((seat) => {
        return <div key={seat}>{seat}</div>
      })}
    </div>
  )
}
export default Seats
