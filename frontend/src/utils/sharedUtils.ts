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
  const image = product.image;

  if (/^https?:\/\//.test(image)) return image;

  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
  const normalizedImage = image.replace(/^\/?backend/, "");
  const finalPath = normalizedImage.startsWith("/")
    ? normalizedImage
    : `/${normalizedImage}`;

  return image.startsWith("/images") ? finalPath : `${baseUrl}${finalPath}`;
};

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
