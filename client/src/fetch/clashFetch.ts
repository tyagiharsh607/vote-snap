import { CLASH_URL } from "@/lib/apiEndpoints";

export const fetchClashes = async (token: string) => {
  const res = await fetch(CLASH_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response.data) {
    return response.data;
  } else return [];
};
export const fetchClash = async (id: number) => {
  const res = await fetch(CLASH_URL + "/" + id, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response.data) {
    return response.data;
  } else return null;
};
