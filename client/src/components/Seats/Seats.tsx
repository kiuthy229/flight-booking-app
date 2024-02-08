const Seats = (props) => {
  return (
    <div>
      {props.values.map((seat) => {
        return <div key={seat}>{seat}</div>
      })}
    </div>
  )
}
export default Seats
