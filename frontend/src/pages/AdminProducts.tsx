import { Button, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import { useGetProductsQuery } from "../slices/productApiSlice.ts";
import ProductsPreview from "../components/ProductsPreview.tsx";
import ProductsTable from "../components/ProductsTable.tsx";

const AdminProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const createProductHandler = () => {
    console.log("create product");
  };
  return (
    <div>
      <Row>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Products</h1>
          <Button
            className="my-3 d-flex align-items-center gap-1"
            onClick={createProductHandler}
          >
            <FaPlus /> Add Product
          </Button>
        </div>
        <ProductsPreview
          products={products}
          isLoading={isLoading}
          error={error}
        />
      </Row>
      <ProductsTable />
    </div>
  );
};

export default AdminProducts;
