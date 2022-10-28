import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addedProduct } from "../../interfaces";
import { getClients, getInvoices, getProducts } from "../../urls";
import "../../Styles/Details.css";
import InvoiceDetailsView from "./InvoiceDetailsView";

function InvoiceDetails() {
  const [Products, setProducts] = useState<addedProduct[]>([]);
  const [ClientName, setClientName] = useState<string>("");
  const [ProductsName, setProductsName] = useState<string[]>([]);
  const [ProductsDescriptions, setProductsDescriptions] = useState<string[]>(
    []
  );

  let { Id } = useParams();
  useEffect(() => {
    async function getProduct(Id: number) {
      return await axios.get(getProducts + Id);
    }
    async function getInvoice(Id: string | undefined) {
      const Invoice = await axios.get(getInvoices + Id);
      return Invoice.data[0];
    }
    async function getClient(Id: string) {
      const Client = await axios.get(getClients + Id);
      return Client.data[0];
    }

    async function getDetails() {
      const Invoice = await getInvoice(Id);
      const Client = await getClient(Invoice.IDClient);
      setClientName(Client.Client_Name);
      setProducts(Invoice.products);
      const Names = [];
      const Descriptions = [];
      for (let i = 0; i < Invoice.products.length; i++) {
        const productID = Invoice.products[i].product;
        const productInfo = await getProduct(productID);
        Names.push(productInfo.data[0].Product_Name);
        Descriptions.push(productInfo.data[0].Product_Description);
      }
      setProductsName(Names);
      setProductsDescriptions(Descriptions);
    }
    getDetails();
  });

  const rows = Products.map((item: any, index) => {
    return {
      DetailsID: item.ListId,
      ProductID: item.product,
      Name: ProductsName[index],
      Description: ProductsDescriptions[index],
      Quantity: item.quantity,
    };
  });

  return <InvoiceDetailsView Id={Id} ClientName={ClientName} rows={rows} />;
}

export default InvoiceDetails;
