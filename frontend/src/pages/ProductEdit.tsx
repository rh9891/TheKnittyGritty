import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Link, useParams } from "react-router-dom";

import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import { useGetProductByIdQuery } from "../slices/productApiSlice.ts";
import Loader from "../components/Loader";
import ProductEditForm from "../components/ProductEditForm.tsx";
import Message from "../components/Message.tsx";

const ProductEdit = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId ?? "");

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const err = error as FetchBaseQueryError | SerializedError;

    if ("data" in err && typeof err.data === "object" && err.data !== null) {
      const message =
        (err.data as { message?: string })?.message || DEFAULT_ERROR_MESSAGE;
      return <Message variant="danger" text={message} />;
    }
    return <Message variant="danger" text={DEFAULT_ERROR_MESSAGE} />;
  }

  return (
    <>
      <Link to="/admin/products" className="btn btn-primary my-3">
        Go Back
      </Link>
      <ProductEditForm
        refetch={refetch}
        product={product}
        productId={productId}
      />
    </>
  );
};
export default ProductEdit;
