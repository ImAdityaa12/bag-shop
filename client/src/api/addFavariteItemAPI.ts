import { getCookie } from "@/lib/utils";

export const addFavariteItemAPI = async (productId: string) => {
  const response = await fetch(`http://localhost:7000/users/addFavItems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });
  const json = await response.json();
  return { data: json, status: response.status };
};
