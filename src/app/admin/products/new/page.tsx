import { AdminPageHeader } from "../../_components/AdminPageHeader";
import ProductForm from "../_components/ProductForm";

export default function NewProduct() {
  return (
    <>
      <AdminPageHeader>{"New Product"}</AdminPageHeader>

      <ProductForm />
    </>
  );
}
