import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import type { RootState } from "../store.ts";
import type { CartItem } from "../types.ts";
import { addToCart, removeFromCart } from "../slices/cartSlice.ts";
import { imageSrc } from "../utils/sharedUtils.ts";
import Meta from "../components/Meta.tsx";
import Message from "../components/Message";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const addToCartHandler = async (product: CartItem, quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = async (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <Meta
        title="Your Cart | The Knitty Gritty"
        description="Review your selected yarns before checking out. Yarn today, joy tomorrow!"
        keywords="cart, yarn cart, knitting supplies, crochet shopping cart, The Knitty Gritty"
      />
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message
              variant="danger"
              text={
                <>
                  Money can’t buy happiness, but it can buy yarn, which is kind
                  of the same thing. Looks like your cart is currently empty.
                  <Link to="/">&nbsp;Browse our collection.</Link>
                </>
              }
            />
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={imageSrc(item)}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price.toFixed(2)}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash color="white" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  Items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
