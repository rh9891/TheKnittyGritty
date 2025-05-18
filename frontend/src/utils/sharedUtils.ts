import { Product as ProductType } from "../types.ts";

export const formatDate = (dateInput?: string | number | Date): string => {
  if (!dateInput) return "Invalid date";

  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
};

export const imageSrc = (product: ProductType) => {
  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
  const normalizedImage = product.image.replace(/^\/?backend/, "");

  const finalPath = normalizedImage.startsWith("/")
    ? normalizedImage
    : `/${normalizedImage}`;

  return product.image.startsWith("/images")
    ? finalPath
    : `${baseUrl}${finalPath}`;
};
