import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import CartIndicator from './components/CartIndicator'
import BookStore from './components/BookStore'
import Cart from './components/Cart'
import { Col, Container, Row } from 'react-bootstrap'

// how do we provide a cart state property into App?
// 2 options:
// 1) convert it into a Class Component
// 2) use a Hook -> useState()

const App = () => {
  const [cart, setCart] = useState([])

  const addToCart = (bookToAdd) => {
    let newCart = [...cart, bookToAdd]
    setCart(newCart)
  }

  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col sm={12} className='text-center background-div'>
            <Link to='/'>
              <h1>Strivazon Book Store</h1>
            </Link>
          </Col>
          <CartIndicator cartLength={cart.length} />
          {/* cartLength is 0 initially */}
        </Row>
        <hr />
        <Routes>
          <Route path='/' element={<BookStore addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart cart={cart} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
