import { GrClose } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import AddedProductsTable from "../../Components/AddedProductsTable";
import { client, product } from "../../interfaces";

function InvoiceView(props: any) {
  const {
    ClientsList,
    ProductsList,
    handleSubmit,
    onSubmit,
    register,
    subTotal,
    addProduct,
    AddedProducts,
    Total,
    setDiscount,
  } = props;

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
            <h2>{new Date().toLocaleDateString()}</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="client">
            <div className="addPPart">
              <select
                name="Product"
                id="Product"
                className="selectBox products"
                defaultValue={ProductsList[0].Product_ID}
                {...register("Product")}
              >
                {ProductsList.map((product: product) => {
                  return (
                    <option key={product.Product_ID} value={product.Product_ID}>
                      {product.Product_Name}
                    </option>
                  );
                })}
              </select>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="number"
                  className="selectBox ProductQuantity"
                  {...register("Quantity")}
                  defaultValue={0}
                  onChange={(e) => {
                    if (
                      isNaN(Number(e.target.value)) === false &&
                      Number(e.target.value) > 0
                    ) {
                      // setQuaSel(Number(e.target.value));
                    } else {
                      e.target.value = "0";
                    }
                  }}
                />
                <FaPlus
                  onClick={() => {
                    addProduct();
                  }}
                  className="plusIcon"
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
                  {...register("Client")}
                >
                  {ClientsList.map((client: client) => {
                    return (
                      <option key={client.Client_ID} value={client.Client_ID}>
                        {client.Client_Name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="input double">
            <div className="TableBackground">
              <table className="productsTable">
                <thead className="thead">
                  <tr className="trHead">
                    <th className="thHead">Product</th>
                    <th className="thHead">Quantity</th>
                  </tr>
                </thead>
                <AddedProductsTable rows={AddedProducts} />
              </table>
            </div>
          </div>
          <div className="BottomElements">
            <div className="input">
              <label>Subtotal</label>
              <label>{subTotal}</label>
            </div>
            <div className="input">
              <label>Discount</label>
              <div className="discount">
                <input
                  type="number"
                  defaultValue={0}
                  {...register("Discount")}
                  onChange={(e) => {
                    if (
                      isNaN(Number(e.target.value)) === false &&
                      Number(e.target.value) > 0 &&
                      Number(e.target.value) <= 100
                    ) {
                      setDiscount(Number(e.target.value));
                    } else {
                      e.target.value = "0";
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
          <button
            className="submit-card"
            onClick={() => {
              // push();
            }}
          >
            Save Invoice
          </button>
        </form>
      </div>
    </>
  );
}

export default InvoiceView;
