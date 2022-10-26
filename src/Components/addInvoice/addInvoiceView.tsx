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
  const [fecha, setFecha] = useState<Date>(new Date());

  const clientsSelect = ClientsList.map((client: client) => {
    return <option value={client.Client_ID}>{client.Client_Name}</option>;
  });

  const productsSelect = ProductsList.map((client: product) => {
    return <option value={client.Product_ID}>{client.Product_Name}</option>;
  });

  const laproducts = Addedproducts.map((row: addedproduct) => {
    return (
      <tr className="rowProducts">
        <td className="Product">{row.name}</td>
        <td className="Product">{row.quantity}</td>
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

      var dif = true;
      for (let i = 0; i < Addedproducts.length; i++) {
        if (Addedproducts[i].id == id) {
          const newa = Addedproducts.map((e) => {
            if (e.id === id) {
              return {
                id: e.id,
                quantity: e.quantity + quantity,
                name: e.name,
              };
            } else {
              return e;
            }
          });
          setProductsAdded(newa);
          dif = false;
        }
      }

      if (dif && Addedproducts.length < 10) {
        axios.get(getProduct + id).then((response) => {
          setProductsAdded([
            ...Addedproducts,
            { name: response.data.res[0].Product_Name, quantity, id },
          ]);
        });
      }
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
      props.close();
    }
  };

  return (
    <>
      <div className="modal-container">
        <GrClose
          className="closeButton"
          onClick={() => {
            props.close();
          }}
        />
        <div className="topModal">
          <div className="tittle-date">
            <h1>INVOICE</h1>
            <h2>{fecha.toLocaleDateString()}</h2>
          </div>
        </div>
        <form>
          <div className="client">
            <div className="addPPart">
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
              <div style={{display:"flex",alignItems:"center"}}>
                <input
                  type="number"
                  className="selectBox pquantity"
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
            </div>
            <div className="clientPart">
              <label>Invoice to</label>
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
              </div>
            </div>
          </div>
          <div className="input double">
            <div className="tableback">
              <table className="productsTable">
                <thead className="thead">
                  <tr className="trHead">
                    <th className="thhead">Product</th>
                    <th className="thhead">Quantity</th>
                  </tr>
                </thead>
                <tbody style={{ display: "block" }}>{laproducts}</tbody>
              </table>
            </div>
          </div>
          <div className="BottomElements">
            <div className="input">
              <label>Subtotal</label>
              <label>{subTotal}</label>
            </div>
            <div className="input">
              <label>Discout</label>
              <div className="discount">
                <input
                  type="text"
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
          </div>
          <div className="total">
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
        </form>
      </div>
    </>
  );
}

export default InvoiceView;
