//
import { Box, Button, Card, TextField } from '@mui/material'
import { Fragment, FunctionComponent } from 'react'

interface TicketPaymentProps {}

const TicketPayment: FunctionComponent<TicketPaymentProps> = () => {
  return (
    <Fragment>
      <Card>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <TextField
            required
            id="outlined-required"
            label={'Name'}
            defaultValue={''}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
          }}
        >
          <TextField
            required
            id="outlined-required"
            label={'Date of birth'}
            defaultValue={''}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
          }}
        >
          <TextField
            required
            id="outlined-required"
            label={'Credit card'}
            defaultValue={''}
          />

          <TextField
            required
            id="outlined-required"
            label={'Expire date'}
            defaultValue={''}
          />

          <TextField
            required
            id="outlined-required"
            label={'CVV'}
            defaultValue={''}
          />
        </Box>

        <Box>
          <TextField
            required
            id="outlined-required"
            label={'Mobile number'}
            defaultValue={''}
          />
          <TextField
            required
            id="outlined-required"
            label={'Email'}
            defaultValue={''}
          />
        </Box>

        <Button
          variant="contained"
          sx={{ maxHeight: 40, minWidth: 100, fontWeight: 600 }}
          onClick={() => console.log('login')}
        >
          Confirm Payment
        </Button>
      </Card>
    </Fragment>
  )
}

export default TicketPayment
