import InvoicesTable from "../../Components/InvoicesTable"

export default function Table(props: any) {
  return (
    <>
      <table className="invoicesTable">
        <thead className="head">
          <tr className="headRow">
            <th className="tableHeader TableColum">#</th>
            <th className="tableHeader ">Client</th>
            <th className="tableHeader ">Date</th>
            <th className="tableHeader ">Subtotal</th>
            <th className="tableHeader ">Discount</th>
            <th className="tableHeader ">Total</th>
            <th className="tableHeader "></th>
          </tr>
        </thead>
        <InvoicesTable rows={props.rows} />
      </table>
    </>
  );
}
