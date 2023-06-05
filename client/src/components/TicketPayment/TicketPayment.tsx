//
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Fragment, FunctionComponent } from 'react'
import { formatNumberWithCommas } from '../../utils/formatNumberWithCommas'

interface TicketPaymentProps {}

const TicketPayment: FunctionComponent<TicketPaymentProps> = () => {
  return (
    <Fragment>
      <Card sx={{ padding: 1 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            marginBottom: 1,
          }}
        >
          <TextField
            required
            id="outlined-required"
            label={'Name'}
            defaultValue={''}
            sx={{ minWidth: 400 }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            marginBottom: 1,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs(new Date())}
              format=" DD-MM-YYYY"
              sx={{ minWidth: 200 }}
            />
          </LocalizationProvider>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginBottom: 1,
          }}
        >
          <ButtonGroup aria-label="medium secondary button group">
            <Button key="1">Credit Card</Button>
            <Button key="2">Napas</Button>
            <Button key="3">Momo</Button>
          </ButtonGroup>
          <TextField
            required
            id="outlined-required"
            label={'Credit card'}
            defaultValue={''}
            sx={{ minWidth: 400 }}
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

        <Box sx={{ marginBottom: 1 }}>
          <TextField
            required
            id="outlined-required"
            label={'Mobile number'}
            defaultValue={''}
            sx={{ minWidth: 400 }}
          />
        </Box>
        <Box>
          <TextField
            required
            id="outlined-required"
            label={'Email'}
            defaultValue={''}
            sx={{ minWidth: 400 }}
          />
        </Box>

        <Box>
          <Typography
            variant="h5"
            component="h5"
            sx={{ fontWeight: 600, color: '#e1a20f' }}
          >
            {formatNumberWithCommas(3000000)} VND
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{ maxHeight: 40, minWidth: 100, fontWeight: 600, margin: 1 }}
          onClick={() => console.log('login')}
        >
          Confirm Payment
        </Button>
      </Card>
    </Fragment>
  )
}

export default TicketPayment
