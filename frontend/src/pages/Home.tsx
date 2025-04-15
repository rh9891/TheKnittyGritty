import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

import { Product as ProductType } from "../types.ts";
import Product from "../components/Product.tsx";

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<ProductType[]>("/api/products");
      console.log("Fetched products:", data);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {Array.isArray(products) &&
          products.map((product) => (
            <Col key={product._id} sm={10} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Home;
