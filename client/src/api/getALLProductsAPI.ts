import { getCookie } from "@/lib/utils";

export const getALLProductsAPI = async () => {
  const response = await fetch(`http://localhost:7000/products/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    credentials: "include",
  });
  const json = await response.json();
  return { data: json, status: response.status };
};
