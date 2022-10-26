import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addedproduct } from "../../interfaces";
import { getClients, getInvoices, getProducts } from "../../urls";
import "../../App.css";
import { FaBackward } from "react-icons/fa";

function InvoiceDetails() {
  const [products, setProducts] = useState<addedproduct[]>([]);
  const [clientName, setClientName] = useState<string>("");
  const [productsName, setProductsName] = useState<string[]>([]);
  const [productsDes, setProductsDes] = useState<string[]>([]);

  let { id } = useParams();

  useEffect(() => {
    async function getProduct(id: number) {
      return await axios.get(getProducts + id);
    }
    async function getDetails() {
      const res = await axios.get(getInvoices + id);
      const client = await axios.get(
        getClients + res.data.response[0].IDClient
      );
      setClientName(client.data.res[0].Client_Name);
      setProducts(res.data.response[0].products);
      const names = [];
      const descr = [];
      for (let i = 0; i < res.data.response[0].products.length; i++) {
        const q = res.data.response[0].products[i].product;
        const a = await getProduct(q);
        names.push(a.data.res[0].Product_Name);
        descr.push(a.data.res[0].Product_Description);
      }
      setProductsName(names);
      setProductsDes(descr);
    }
    getDetails();
  }, []);

  const rows = products.map((item: any, index) => {
    console.log(item);
    return (
      <tr className="row" key={item.listpid}>
        <th className="rowElement TableColum">{item.product}</th>
        <th className="rowElement">{productsName[index]}</th>
        <th className="rowElement"><p>{productsDes[index]}</p></th>
        <th className="rowElement">{item.quantity}</th>
      </tr>
    );
  });

  return (
    <>
      <div className="container">
        <div className="logo">
          <img src="/logo.jpeg" alt="" />
          <h2>AIM EdgeApps</h2>
        </div>
        <div className="subContainer">
          <div className="topheader">
            <div className="header">
              <h1>Invoice id: {id}</h1>
              <Link to="/">
                <FaBackward />
              </Link>
            </div>
            <h2>Client Name: {clientName}</h2>
          </div>

          <table className="invocesTable">
            <thead className="head">
              <tr className="headRow">
                <th className="tableHeader TableColum">Product ID</th>
                <th className="tableHeader ">Name</th>
                <th className="tableHeader ">Description</th>
                <th className="tableHeader ">Quantity</th>
              </tr>
            </thead>
            <tbody className="tbody">{rows}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InvoiceDetails;
