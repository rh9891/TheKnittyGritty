import { FC } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useGetTopRatedProductsQuery } from "../slices/productApiSlice.ts";
import Loader from "./Loader";

const suggestions = [
  "Double-check the spelling - even small typos can trip things up.",
  "Limit the search to one or two simple keywords.",
  "Be less specific in the choice of your search term. Sometimes a more general term will return more results.",
];

const NoSearchResults: FC = () => {
  const { data, isLoading } = useGetTopRatedProductsQuery({
    keyword: "",
  });
  const products = data?.products ?? [];
  const recommendedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container className="my-2">
      <Alert variant="info">
        <strong>Try your search again using these tips:</strong>
        <ul>
          {suggestions.map((suggestion, i) => (
            <li key={i}>{suggestion}</li>
          ))}
        </ul>
        <p>
          Still stuck? Browse our&nbsp;
          <Link to="/top-rated">most-loved products</Link> — they’re customer
          favorites for a reason.
        </p>
      </Alert>
      {recommendedProducts.length > 0 && (
        <>
          <h5 className="mt-4 mb-3">Customers Also Viewed</h5>
          <Row>
            {recommendedProducts.slice(0, 4).map((product) => (
              <Col key={product._id} xs={6} md={3} className="mb-4">
                <Card
                  as={Link}
                  to={`/product/${product._id}`}
                  className="text-decoration-none text-dark h-100"
                >
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                  />
                  <Card.Body>
                    <Card.Title as="h6" className="mb-1">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="mb-0">
                      ${product.price.toFixed(2)}
                    </Card.Text>
                    <Card.Text className="text-warning">
                      {"★".repeat(Math.round(product.rating))}&nbsp;
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        ({product.rating.toFixed(1)})
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default NoSearchResults;
