import React, { Fragment, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Row,
  Col,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.content}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i
                        className="fas fa-edit"
                        style={{ color: "#6bc3d4" }}
                      ></i>
                    </Button>
                  </LinkContainer>

                  <OverlayTrigger
                    rootClose
                    trigger="click"
                    placement="left"
                    overlay={
                      <Popover
                        id="popover-basic"
                        style={{
                          position: "relative",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Popover.Title as="h3">Are you sure?</Popover.Title>
                        <Popover.Content>
                          This product will be deleted immediately. You cannot
                          undo this action.
                        </Popover.Content>
                        <Button
                          variant="secondary"
                          className="btn-sm"
                          style={{
                            position: "relative",
                            marginLeft: "1.5rem",
                            marginRight: "1rem",
                            marginBottom: ".5rem",
                          }}
                          onClick={() => document.body.click()}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          className="btn-sm"
                          style={{
                            position: "relative",
                            marginLeft: ".5rem",
                            marginRight: "1rem",
                            marginBottom: ".5rem",
                          }}
                          onClick={() => deleteHandler(product._id)}
                        >
                          Yes, Delete
                        </Button>
                      </Popover>
                    }
                  >
                    <Button variant="danger" className="btn-sm">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default ProductListScreen;
