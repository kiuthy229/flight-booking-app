import axios from 'axios'
import authHeader from '../../services/header'

import { FunctionComponent, useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { ConnectingAirports } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { isAuthSelector } from '../../store/users/usersSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { TicketDetails } from '../ReviewTicket/ReviewTicket'

interface TicketDetailsProps {}

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
          <Card sx={{ margin: 3 }} key={ticket.ticket_id}>
            <Typography variant="h4" color="text.primary" component="h1">
              {ticket.airline}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                minHeight: 180,
                alignContent: 'center',
                alignItems: 'center',
              }}
              key={ticket.ticket_id}
              onClick={() => navigate('/ticket-payment')}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
                    <ConnectingAirports
                      sx={{ fontSize: 40, marginBottom: 2 }}
                    />
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
                    <Typography variant="h5" gutterBottom>
                      Duration:{' '}
                      {Number(ticket.arrival_date) -
                        Number(ticket.departure_date)}
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                      Transits:
                      {ticket.stops}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ justifyContent: 'flex-end' }} marginLeft={5}>
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{ fontWeight: 600, color: '#e1a20f' }}
                  >
                    {ticket.total_price} VND
                    <span style={{ fontWeight: 600, color: '#9d9d9d' }}>
                      {' /pax'}
                    </span>
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      maxHeight: 40,
                      minWidth: 200,
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                    onClick={() => console.log('login')}
                  >
                    Choose ticket
                  </Button>
                </Box>
              </CardContent>
            </Box>
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
