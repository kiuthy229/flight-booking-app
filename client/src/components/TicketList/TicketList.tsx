import axios from 'axios'
import authHeader from '../../services/header'
import Barcode from './Barcode'

import { FunctionComponent, useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { ConnectingAirports } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { isAuthSelector } from '../../store/users/usersSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface TicketDetailsProps {}

interface TicketDetails {
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
}

const TicketList: FunctionComponent<TicketDetailsProps> = () => {
  const [tickets, setTickets] = useState<TicketDetails[]>([])
  const isAuth = useSelector(isAuthSelector)
  const navigate = useNavigate()

  async function getTickets() {
    return axios
      .get('http://localhost:8080/tickets', { headers: authHeader() })
      .then(function (response: any) {
        console.log(response.data)
        setTickets(
          response.data.filter(
            (ticket: TicketDetails) => ticket.user_id === null
          )
        )
      })
      .catch(function (error: any) {
        console.log(error)
      })
  }

  useEffect(() => {
    getTickets()
  }, [])

  return isAuth ? (
    <>
      {tickets ? (
        tickets.map((ticket) => (
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
                <Typography variant="h3" gutterBottom>
                  {ticket.origin}
                </Typography>
                <ConnectingAirports sx={{ fontSize: 40, marginBottom: 2 }} />
                <Typography variant="h3" gutterBottom>
                  {ticket.destination}
                </Typography>
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
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="h4"
                >
                  {ticket.transport_no}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h2" gutterBottom>
          There is no ticket that matched your need
        </Typography>
      )}
    </>
  ) : (
    <Navigate to="/login" />
  )
}

export default TicketList
