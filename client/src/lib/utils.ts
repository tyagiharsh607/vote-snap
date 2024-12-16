import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BACKEND_URL } from "./apiEndpoints";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (img: string): string => {
  return `${BACKEND_URL}/images/${img}`;
};

export const checkDateExpiry = (date: string): boolean => {
  const currentDate = new Date();
  const givenDate = new Date(date);
  return givenDate < currentDate;
};
