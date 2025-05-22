import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import { useDeleteProductMutation } from "../slices/productApiSlice.ts";
import Loader from "./Loader";
import Message from "./Message.tsx";
import ConfirmModal from "./ConfirmModal.tsx";
import type { Product } from "../types.ts";

type ProductsTableProps = {
  products?: Product[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  refetch: () => void;
};

const ProductsTable = ({
  products,
  isLoading,
  error,
  refetch,
}: ProductsTableProps) => {
  const [show, setShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const handleOnConfirm = () => {
    if (selectedProductId) {
      deleteHandler(selectedProductId);
    }
    setShow(false);
    setSelectedProductId(null);
  };
  const handleOnCancel = () => setShow(false);
  const handleShow = (id: string) => {
    setSelectedProductId(id);
    setShow(true);
  };

  const [
    deleteProduct,
    { isLoading: loadingDeleteProduct, error: deleteError },
  ] = useDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully.");
      refetch();
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError;

      if ("status" in error) {
        if (error.data && typeof error.data === "object") {
          const data = error.data as { message?: string };
          toast.error(data?.message || DEFAULT_ERROR_MESSAGE);
        } else {
          toast.error(DEFAULT_ERROR_MESSAGE);
        }
      } else {
        toast.error(error.message || DEFAULT_ERROR_MESSAGE);
      }
    }
  };

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
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Category</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>
                {product.countInStock > 0 && product.countInStock >= 20 ? (
                  <Badge bg="primary">In Stock</Badge>
                ) : product.countInStock === 0 ? (
                  <Badge bg="danger">Out of Stock</Badge>
                ) : (
                  <Badge bg="warning">Low Stock</Badge>
                )}
              </td>
              <td>{product.countInStock}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>{product.content}</td>
              <td>
                <div className="d-flex gap-1 flex-nowrap justify-content-center">
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="primary" className="btn-sm">
                      <FaEdit color="#ffffff" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="secondary"
                    className="btn-sm"
                    onClick={() => handleShow(product._id)}
                  >
                    <FaTrash color="#ffffff" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal
        show={show}
        title={`Delete ${products?.find((p) => p._id === selectedProductId)?.name || "Product"}?`}
        body="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleOnConfirm}
        onCancel={handleOnCancel}
        loading={loadingDeleteProduct}
        error={deleteError}
      />
    </>
  );
};

export default ProductsTable;
