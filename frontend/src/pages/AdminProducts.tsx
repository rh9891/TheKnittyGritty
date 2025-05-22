import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../slices/productApiSlice.ts";
import ProductsPreview from "../components/ProductsPreview.tsx";
import ProductsTable from "../components/ProductsTable.tsx";
import ConfirmModal from "../components/ConfirmModal.tsx";
import Paginate from "../components/Paginate.tsx";

const AdminProducts = () => {
  const { pageNumber } = useParams<{ pageNumber?: string }>();
  const parsedPageNumber = pageNumber ? parseInt(pageNumber, 10) : 1;
  const [show, setShow] = useState(false);
  const [createError, setCreateError] = useState<
    FetchBaseQueryError | SerializedError | undefined
  >(undefined);

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber: parsedPageNumber,
  });

  const products = data?.products ?? [];
  const pages = data?.pages ?? 1;
  const page = data?.page ?? 1;

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
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Products</h1>
        <Button
          className="my-3 d-flex align-items-center gap-1"
          onClick={() => setShow(true)}
        >
          <FaPlus /> Add Product
        </Button>
      </div>
      <ProductsPreview />
      <ProductsTable
        products={products}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
      <div className="d-flex justify-content-center my-2">
        <Paginate pages={pages} page={page} isAdmin={true} />
      </div>
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
    </>
  );
};

export default AdminProducts;
