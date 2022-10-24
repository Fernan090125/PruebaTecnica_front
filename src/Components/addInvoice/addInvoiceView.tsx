import axios from "axios";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { addedproduct, client, invoicetopost, product } from "../../interfaces";
import { getmidprice, getProduct, postInvoice } from "../../urls";

function InvoiceView(props: any) {
  const { ClientsList, ProductsList } = props;
  const [Clientid, setClientid] = useState<number>(ClientsList[0].Client_ID);
  const [discount, setdiscout] = useState<number>(0);
  const [ProSel, setProSel] = useState<number>(ProductsList[0].Product_ID);
  const [QuaSel, setQuaSel] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [Total, setTotal] = useState<number>(0);
  const [Addedproducts, setProductsAdded] = useState<addedproduct[]>([]);

  const clientsSelect = ClientsList.map((client: client) => {
    return <option value={client.Client_ID}>{client.Client_Name}</option>;
  });

  const productsSelect = ProductsList.map((client: product) => {
    return <option value={client.Product_ID}>{client.Product_Name}</option>;
  });

  const laproducts = Addedproducts.map((row: addedproduct) => {
    return (
      <tr className="row">
        <td className="rowElement">{row.name}</td>
        <td className="rowElement">{row.quantity}</td>
      </tr>
    );
  });

  const addProduct = () => {
    const quantity = QuaSel;
    const id = ProSel;
    if (quantity > 0) {
      axios
        .post(getmidprice, {
          id: id,
          q: quantity,
        })
        .then((response) => {
          const price = subTotal + response.data.cal;
          setSubTotal(price);
        });

      axios.get(getProduct + id).then((response) => {
        setProductsAdded([
          ...Addedproducts,
          { name: response.data.res[0].Product_Name, quantity, id },
        ]);
      });
    }
  };

  useEffect(() => {
    if (discount === 0) {
      const op = subTotal;
      setTotal(op);
    } else {
      const op = subTotal - subTotal * (discount / 100);
      setTotal(op);
    }
  }, [subTotal, discount]);

  const push = () => {
    if (Addedproducts.length >= 1) {
      const fh = new Date();
      const date =
        fh.getFullYear() +
        "-" +
        fh.getMonth() +
        "-" +
        fh.toLocaleDateString().split("/")[0];
      const data: invoicetopost = {
        IDClient: Clientid,
        Dte: date,
        SubTotal: subTotal,
        Discout: discount,
        Total: Total,
        products: Addedproducts,
      };
      axios.post(postInvoice, data).then((res) => {
        console.log(res.data);
      });
      props.close()
    }
  };

  return (
    <div className="modal-container">
      <div className="modalborder modalHead">
        <GrClose
          className="closeButton"
          onClick={() => {
            props.close();
          }}
        />
      </div>
      <form>
        <div className="top-wrapper">
          <div className="input">
            <label>Client</label>
            <div className="content-select">
              <select
                name="Client"
                id="Client"
                className="selectBox"
                onChange={(event) => {
                  setClientid(Number(event.target.value));
                }}
              >
                {clientsSelect}
              </select>
              <i></i>
            </div>
          </div>
          <div className="input double">
            <label>Products</label>
            <select
              name="Product"
              id="Products"
              className="selectBox products"
              onChange={(e) => {
                setProSel(Number(e.target.value));
              }}
            >
              {productsSelect}
            </select>
            <input
              type="number"
              className="selectBox numberInput"
              onChange={(e) => {
                if (
                  isNaN(Number(e.target.value)) === false &&
                  Number(e.target.value) > 0
                ) {
                  setQuaSel(Number(e.target.value));
                } else {
                  e.target.value = "0";
                }
              }}
            />
            <FaPlus
              onClick={() => {
                addProduct();
              }}
              className="plusicon"
            />
          </div>
          <table className="productsTable">
            <thead className="thead">
              <tr className="trHead">
                <th>Product</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody style={{ display: "block" }}>{laproducts}</tbody>
          </table>
          <div className="input">
            <label>Subtotal</label>
            <label>{subTotal}</label>
          </div>
          <div className="input">
            <label>Discout</label>
            <div>
              <input
                type="text"
                className="discount"
                onChange={(event) => {
                  var value = event.target.value;
                  if (isNaN(Number(value)) === false) {
                    if (Number(value) > 100) {
                      value = String(100);
                    } else {
                      if (Number(value) < 0) {
                        value = String(0);
                      }
                    }
                    event.target.value = value;
                    setdiscout(Number(value));
                  } else {
                    event.target.value = String(0);
                  }
                }}
              />
              %
            </div>
          </div>
          <div className="input">
            <label>Total</label>
            <label>{Total}</label>
          </div>
          <div
            className="submit-card"
            onClick={() => {
              push();
            }}
          >
            Save Invoice
          </div>
        </div>
      </form>
      <div className="modalborder footerModal"></div>
    </div>
  );
}

export default InvoiceView;
