import { Box, Card, CardContent, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConnectingAirports } from '@mui/icons-material'
import Barcode from './Barcode'

interface ReviewTicketProps {
  ticket: TicketDetails
}

export type TicketDetails = {
  ticket_id: number
  transport_no: string
  departure_date: string
  origin: string
  arrival_date: string
  destination: string
  stops: number
  passenger_type: string
  total_price: number
  user_id: number
  airline: string
}

const ReviewTicket: FunctionComponent<ReviewTicketProps> = ({ ticket }) => {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        display: 'flex',
        maxWidth: 800,
        minHeight: 250,
        alignContent: 'center',
        alignItems: 'center',
        margin: 3,
      }}
      key={ticket.ticket_id}
      onClick={() => navigate('/ticket-payment')}
    >
      <Barcode value={ticket.ticket_id + '' + ticket.user_id} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 1,
            pb: 1,
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              {ticket.departure_date}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {ticket.origin}
            </Typography>
          </Box>
          <ConnectingAirports sx={{ fontSize: 40, marginBottom: 2 }} />
          <Box>
            <Typography variant="h5" gutterBottom>
              {ticket.arrival_date}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {ticket.destination}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          <Box>
            <Typography component="div" variant="h5">
              Passenger
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {ticket.user_id}
            </Typography>
          </Box>

          <Box>
            <Typography component="div" variant="h5">
              Gate
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {ticket.transport_no}
            </Typography>
          </Box>

          <Box>
            <Typography component="div" variant="h5">
              Departure
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {ticket.departure_date}
            </Typography>
          </Box>
        </Box>
      </Box>
      <CardContent>
        <Box sx={{ justifyContent: 'center' }} marginLeft={5}>
          <Typography component="div" variant="h2">
            {ticket.ticket_id}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="h4">
            {ticket.transport_no}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ReviewTicket
