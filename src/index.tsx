import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./Pages/allInvoices/AllInvoices";
import InvoiceDetails from "./Pages/invoiceDetails/invoiceDetails";
import reportWebVitals from "./reportWebVitals";
import './Styles/index.css'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Routes>
        <Route path="/Invoices/:Id" element={<InvoiceDetails/>} />
        <Route path="/" element={<App/>} />
    </Routes>
  </Router>
);

reportWebVitals();
