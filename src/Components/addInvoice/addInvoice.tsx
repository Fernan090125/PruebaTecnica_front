import axios from "axios";
import { useEffect, useState } from "react";
import { client, product } from "../../interfaces";
import "../../Styles/NewInvoice.css";
import { getClients, getProducts } from "../../urls";
import InvoiceView from "./addInvoiceView";

function AddInvoice(props: any) {
  const [productsList, setProductsList] = useState<product[]>([]);
  const [ClientsList, setClientsList] = useState<client[]>([]);

  useEffect(() => {
    axios.get(getClients).then((response) => {
      const clientsData: client[] = [];
      response.data.res.map((item: any) => {
        clientsData.push({
          Client_ID: item.Client_ID,
          Client_Name: item.Client_Name,
          Point_of_Contact: item.Point_of_Contact,
          Phone_Number: item.Phone_Number,
          Email: item.Email,
        });
      });
      setClientsList(clientsData);
    });
    axios.get(getProducts).then((response) => {
      const ProductsData: product[] = [];
      response.data.res.map((item: any) => {
        ProductsData.push({
          Product_ID: item.Product_ID,
          Product_Name: item.Product_Name,
          Product_Description: item.Product_Description,
          Product_Price: item.Product_price,
        });
      });
      setProductsList(ProductsData);
    });
  }, []);
  if (props.show) {
    return (
      <>
        <InvoiceView
          close={props.close}
          ClientsList={ClientsList}
          ProductsList={productsList}
        />
      </>
    );
  }
  return null;
}

export default AddInvoice;
