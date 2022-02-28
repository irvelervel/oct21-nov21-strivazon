import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'

const Cart = ({ cart, removeFromCart }) => (
  <Row>
    <Col sm={12}>
      <ul style={{ listStyle: 'none' }}>
        {cart.map((element, i) => (
          <li key={i} className='my-4'>
            <Button variant='danger' onClick={() => removeFromCart(i)}>
              <FaTrash />
            </Button>
            <img
              className='book-cover-small'
              src={element.book.imageUrl}
              alt='book selected'
            />
            {element.book.title}
          </li>
        ))}
      </ul>
    </Col>
    <Row>
      <Col sm={12} className='font-weight-bold'>
        TOTAL:{' '}
        {cart.reduce(
          (acc, currentValue) =>
            acc + parseFloat(currentValue.book.price) * currentValue.qty,
          0
        )}
      </Col>
    </Row>
  </Row>
)

export default Cart
