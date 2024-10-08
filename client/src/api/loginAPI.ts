type User = {
  email: string;
  password: string;
};
export const handleLoginAPI = async (user: User) => {
  const response = await fetch(`http://localhost:7000/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });
  const json = await response.json();
  return { data: json, status: response.status };
};
