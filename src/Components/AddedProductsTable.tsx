import { addedProduct } from "../interfaces";

export default function AddedProductsTable(props: { rows: addedProduct[] }) {
  const { rows } = props;
  const body = rows.map((row: addedProduct, index: number) => {
    return (
      <tr className="rowProducts" key={index}>
        <td className="Product">{row.Name}</td>
        <td className="Product">{row.Quantity}</td>
      </tr>
    );
  });
  return <tbody className="tbody">{body}</tbody>;
}
