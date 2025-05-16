import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../slices/productApiSlice.ts";
import ProductsPreview from "../components/ProductsPreview.tsx";
import ProductsTable from "../components/ProductsTable.tsx";
import ConfirmModal from "../components/ConfirmModal.tsx";

const AdminProducts = () => {
  const [show, setShow] = useState(false);
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const handleOnConfirm = () => {
    createProductHandler();
    setShow(false);
  };

  const createProductHandler = async () => {
    try {
      await createProduct().unwrap();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Row>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Products</h1>
          <Button
            className="my-3 d-flex align-items-center gap-1"
            onClick={() => setShow(true)}
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
      <ConfirmModal
        show={show}
        title="Create New Product"
        body="Are you sure you want to create a new product? A placeholder product (Hurston Heather) will be added, which you can edit with full details afterward."
        confirmText="Create"
        onConfirm={handleOnConfirm}
        onCancel={() => setShow(false)}
        loading={loadingCreateProduct}
        error={error}
      />
    </div>
  );
};

export default AdminProducts;
