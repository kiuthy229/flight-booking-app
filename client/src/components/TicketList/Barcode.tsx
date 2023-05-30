import { useBarcode } from '@createnextapp/react-barcode'
import { FunctionComponent } from 'react'

interface BarcodeProps {
  value: string
}

const Barcode: FunctionComponent<BarcodeProps> = ({ value }) => {
  const { inputRef } = useBarcode({
    value: value,
    options: {
      displayValue: false,
    },
  })

  return <img ref={inputRef} style={{ transform: 'rotate(90deg)' }} />
}

export default Barcode
