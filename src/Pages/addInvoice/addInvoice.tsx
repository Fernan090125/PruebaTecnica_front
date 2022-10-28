import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addedProduct, client, invoiceToPost, product } from "../../interfaces";
import "../../Styles/NewInvoice.css";
import {
  getClients,
  getMidPrice,
  getProduct,
  getProducts,
  postInvoice,
} from "../../urls";
import InvoiceView from "./addInvoiceView";

function AddInvoice(props: any) {
  const [ProductsList, setProductsList] = useState<product[]>([]);
  const [ClientsList, setClientsList] = useState<client[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [AddedProducts, setAddedProducts] = useState<addedProduct[]>([]);
  const [Discount, setDiscount] = useState<number>(0);
  const [Total, setTotal] = useState<number>(0);

  const { register, handleSubmit, getValues } = useForm();

  async function getClientList() {
    return await axios.get(getClients);
  }
  async function getProductsList() {
    return await axios.get(getProducts);
  }

  useEffect(() => {
    async function getAll() {
      const Clients = await getClientList();
      const Products = await getProductsList();
      setClientsList(Clients.data);
      setProductsList(Products.data);
    }
    getAll();
  }, []);

  const addProduct = async () => {
    const Quantity = getValues("Quantity");
    const Id = getValues("Product");
    if (Quantity > 0) {
      const price = await axios.post(getMidPrice, { Id, Quantity });
      setSubTotal(price.data.result + subTotal);

      var dif = true;
      for (let i = 0; i < AddedProducts.length; i++) {
        if (AddedProducts[i].Id === Id) {
          const NewAddedProducts = AddedProducts.map((e) => {
            if (e.Id === Id) {
              return {
                Id: e.Id,
                Quantity: Number(e.Quantity) + Number(Quantity),
                Name: e.Name,
              };
            } else {
              return e;
            }
          });
          console.log(NewAddedProducts);
          setAddedProducts(NewAddedProducts);
          dif = false;
        }
      }
      if (dif && AddedProducts.length < 10) {
        axios.get(getProduct + Id).then((response) => {
          setAddedProducts([
            ...AddedProducts,
            { Name: response.data[0].Product_Name, Quantity, Id },
          ]);
        });
      }
    }
  };

  useEffect(() => {
    if (Discount === 0) {
      const op = subTotal;
      setTotal(op);
    } else {
      const result = subTotal - subTotal * (Discount / 100);
      setTotal(result);
    }
  }, [subTotal, Discount]);

  const onSubmit = (data: any) => {
    if (AddedProducts.length >= 1) {
      const date = new Date();
      const today =
        date.toLocaleDateString().split("/")[2] +
        "-" +
        date.toLocaleDateString().split("/")[1] +
        "-" +
        date.toLocaleDateString().split("/")[0];

      console.log(today);
      const data: invoiceToPost = {
        IDClient: Number(getValues("Client")),
        Dte: today,
        SubTotal: subTotal,
        Discount: Number(getValues("Discount")),
        Total: Total,
        Products: AddedProducts,
      };
      console.log(data);
      axios.post(postInvoice, data).then((res) => {
        console.log(res.data);
      });
    }
    props.close();
  };

  if (props.show) {
    return (
      <>
        <InvoiceView
          close={props.close}
          ClientsList={ClientsList}
          ProductsList={ProductsList}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          addProduct={addProduct}
          subTotal={subTotal}
          AddedProducts={AddedProducts}
          Total={Total}
          setDiscount={setDiscount}
        />
      </>
    );
  }
  return null;
}

export default AddInvoice;
