import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productID = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [gauge, setGauge] = useState("");
  const [knittingNeedle, setKnittingNeedle] = useState("");
  const [crochetHook, setCrochetHook] = useState("");
  const [recommendedCare, setRecommendedCare] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productID) {
        dispatch(listProductDetails(productID));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setCategory(product.category);
        setContent(product.content);
        setWeight(product.weight);
        setLength(product.length);
        setGauge(product.gauge);
        setKnittingNeedle(product.knitting_needle);
        setCrochetHook(product.crochet_hook);
        setRecommendedCare(product.recommended_care);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, history, productID, product, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct({
        _id: productID,
        name,
        price,
        description,
        image,
        category,
        content,
        weight,
        length,
        gauge,
        knittingNeedle,
        crochetHook,
        recommendedCare,
        countInStock,
      })
    );
  };

  return (
    <Fragment>
      <Link to="/admin/productlist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL."
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="length">
              <Form.Label>Length</Form.Label>
              <Form.Control
                type="text"
                value={length}
                onChange={(event) => setLength(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="gauge">
              <Form.Label>Knitting Gauge(s)</Form.Label>
              <Form.Control
                type="text"
                value={gauge}
                onChange={(event) => setGauge(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="knittingNeedle">
              <Form.Label>Knitting Needle Size(s)</Form.Label>
              <Form.Control
                type="text"
                value={knittingNeedle}
                onChange={(event) => setKnittingNeedle(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="crochetHook">
              <Form.Label>Crochet Hook Size(s)</Form.Label>
              <Form.Control
                type="text"
                value={crochetHook}
                onChange={(event) => setCrochetHook(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="recommendedCare">
              <Form.Label>Recommended Care</Form.Label>
              <Form.Control
                type="text"
                value={recommendedCare}
                onChange={(event) => setRecommendedCare(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default ProductEditScreen;
