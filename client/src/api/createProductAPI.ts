type Product = {
  file: File;
  name: string;
  price: string;
  discount: string;
  bgColor: string;
  panelColor: string;
  textColor: string;
};
export const handleAddProduct = async (product: Product) => {
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("discount", product.discount);
  formData.append("bgColor", product.bgColor);
  formData.append("panelColor", product.panelColor);
  formData.append("textColor", product.textColor);
  if (product.file) {
    formData.append("file", product.file); // Append the file
  }
  const response = await fetch(`http://localhost:7000/products/create`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  const json = await response.json();
  return { data: json, status: response.status };
};
