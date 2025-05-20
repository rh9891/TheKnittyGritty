import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import type { Product, ProductUpdateInput } from "../types.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import {
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productApiSlice.ts";
import FormContainer from "./FormContainer.tsx";
import Loader from "./Loader";

type ProductEditFormProps = {
  product?: Product;
  productId?: string;
  refetch: () => void;
};

const ProductEditForm = ({
  product,
  productId,
  refetch,
}: ProductEditFormProps) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [gauge, setGauge] = useState("");
  const [knittingNeedle, setKnittingNeedle] = useState("");
  const [crochetHook, setCrochetHook] = useState("");
  const [recommendedCare, setRecommendedCare] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const [updateProduct, { isLoading: loadingUpdateProduct }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUploadProductImage }] =
    useUploadProductImageMutation();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedProduct: ProductUpdateInput = {
      _id: productId!,
      name,
      image,
      description,
      weight,
      length,
      gauge,
      knitting_needle: knittingNeedle,
      crochet_hook: crochetHook,
      recommended_care: recommendedCare,
      content,
      category,
      price,
      countInStock,
    };

    const res = await updateProduct(updatedProduct);

    if ("error" in res && res.error) {
      const err = res.error;
      const message =
        "status" in err &&
        typeof err.data === "object" &&
        err.data !== null &&
        "message" in err.data
          ? (err.data as { message: string }).message
          : DEFAULT_ERROR_MESSAGE;

      toast.error(message);
    } else {
      toast.success("Product updated successfully.");
      refetch();
    }
  };

  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully.");
      setImage(res.image);
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

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setWeight(product.weight);
      setLength(product.length);
      setGauge(product.gauge);
      setKnittingNeedle(product.knitting_needle);
      setCrochetHook(product.crochet_hook);
      setRecommendedCare(product.recommended_care);
      setContent(product.content);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  if (loadingUpdateProduct || loadingUploadProductImage) {
    return <Loader />;
  }

  return (
    <FormContainer>
      <h1>Edit Product</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price" className="my-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description" className="my-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image" className="my-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          <Form.Label className="my-2">
            Select JPG or PNG file to upload
          </Form.Label>
          <Form.Control type="file" onChange={uploadFileHandler} />
        </Form.Group>
        <Form.Group controlId="category" className="my-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="content" className="my-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="weight" className="my-3">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="text"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="length" className="my-3">
          <Form.Label>Length</Form.Label>
          <Form.Control
            type="text"
            value={length}
            onChange={(event) => setLength(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="gauge" className="my-3">
          <Form.Label>Knitting Gauge(s)</Form.Label>
          <Form.Control
            type="text"
            value={gauge}
            onChange={(event) => setGauge(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="knittingNeedle" className="my-3">
          <Form.Label>Knitting Needle Size(s)</Form.Label>
          <Form.Control
            type="text"
            value={knittingNeedle}
            onChange={(event) => setKnittingNeedle(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="crochetHook" className="my-3">
          <Form.Label>Crochet Hook Size(s)</Form.Label>
          <Form.Control
            type="text"
            value={crochetHook}
            onChange={(event) => setCrochetHook(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="recommendedCare" className="my-3">
          <Form.Label>Recommended Care</Form.Label>
          <Form.Control
            type="text"
            value={recommendedCare}
            onChange={(event) => setRecommendedCare(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock" className="my-3">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            value={countInStock}
            onChange={(event) => setCountInStock(Number(event.target.value))}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProductEditForm;
