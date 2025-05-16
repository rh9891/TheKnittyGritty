import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
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
  const [createError, setCreateError] = useState<
    FetchBaseQueryError | SerializedError | undefined
  >(undefined);
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    setCreateError(undefined);
    try {
      await createProduct().unwrap();
      refetch();
      setShow(false);
    } catch (err) {
      console.log(err);
      setCreateError(err as FetchBaseQueryError | SerializedError);
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
        onConfirm={createProductHandler}
        onCancel={() => {
          setShow(false);
          setCreateError(undefined);
        }}
        loading={loadingCreateProduct}
        error={createError}
      />
    </div>
  );
};

export default AdminProducts;
