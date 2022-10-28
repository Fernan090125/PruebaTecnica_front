import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import DetailsTable from "../../Components/DetailsTable";
import { DetailsTable as DetailRow } from "../../interfaces";

export default function InvoiceDetailsView(props: {
  Id: string | undefined;
  ClientName: string;
  rows: DetailRow[];
}) {
  const { Id, ClientName, rows } = props;
  return (
    <>
      <div className="Container">
        <div className="Logo">
          <img src="/logo.jpeg" alt="CompanyLogo" />
          <h2>AIM EdgeApps</h2>
        </div>
        <div className="subContainer">
          <div className="topHeader">
            <div className="Header">
              <h1>Invoice id: {Id}</h1>
              <Link to="/">
                <FaBackward />
              </Link>
            </div>
            <h2>Client Name: {ClientName}</h2>
          </div>

          <table className="invoicesTable">
            <thead className="head">
              <tr className="headRow">
                <th className="tableHeader TableColum">Product ID</th>
                <th className="tableHeader ">Name</th>
                <th className="tableHeader ">Description</th>
                <th className="tableHeader ">Quantity</th>
              </tr>
            </thead>
            <DetailsTable rows={rows} />
          </table>
        </div>
      </div>
    </>
  );
}
