import Button from 'react-bootstrap/Button'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// this is a functional component!

const CartIndicator = ({ cartLength }) => {
  const navigate = useNavigate()

  return (
    <div className='ml-auto mt-2'>
      <Button color='primary' onClick={() => navigate('/cart')}>
        <FaShoppingCart />
        <span className='ml-2'>{cartLength}</span>
      </Button>
    </div>
  )
}

export default CartIndicator
