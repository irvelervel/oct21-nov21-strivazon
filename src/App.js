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

// simple cart, with just the books into it
// [{...}, {...}, etc.]

// a cart with a quantity concept for every element
// [
//    {
//      book: {title: 'How to Eat Better', description: '', ...}
//      qty: 1
//    },
//    {
//      book: {title: 'Ella's Kitchen', description: '', ...}
//      qty: 2
//    }
// ]

const App = () => {
  const [cart, setCart] = useState([])

  // const addToCart = (bookToAdd) => {
  //   let newCart = [...cart, bookToAdd]
  //   setCart(newCart)
  // }

  const addToCartWithQty = (bookToAdd) => {
    // let's create a copy of our current cart
    let newCart = [...cart]
    // let's try to find the bookToAdd in our current cart, using its id
    let indexOfElementInCart = cart.findIndex(
      (element) => element.book.id === bookToAdd.id
    )
    if (indexOfElementInCart !== -1) {
      // match found! we have already that book in the cart
      newCart[indexOfElementInCart].qty++
    } else {
      // we don't have that book currently in our cart
      // let's add it from scratch
      newCart.push({
        book: bookToAdd,
        qty: 1,
      })
    }
    setCart(newCart)
  }

  // const removeFromCart = (bookIndex) => {
  //   let newCart = cart.filter((book, i) => i !== bookIndex)
  //   // newCart now is a cart array without the elements with a specific id
  //   setCart(newCart)
  // }

  const removeFromCartWithQty = (bookIndex) => {
    // let's create a copy of our current cart
    let newCart = [...cart]
    // let's check if the element we want to remove has a qty > 1
    if (newCart[bookIndex].qty > 1) {
      // ok, we just need to decrease the qty of it
      newCart[bookIndex].qty--
    } else {
      // the element has a qty of 1, we need to filter it entirely
      newCart = newCart.filter((element, i) => i !== bookIndex)
    }
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
          <CartIndicator
            // cartLength={cart.length}
            cartLength={cart.reduce(
              (acc, currentValue) => acc + currentValue.qty,
              0
            )}
          />
          {/* cartLength is 0 initially */}
        </Row>
        <hr />
        <Routes>
          <Route
            path='/'
            element={<BookStore addToCart={addToCartWithQty} />}
          />
          <Route
            path='/cart'
            element={
              <Cart cart={cart} removeFromCart={removeFromCartWithQty} />
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
