import DashHeader from "./DashHeader";
import "../../styles/dashboard.css";
import SearchBar from "../SearchBar";
import Orders from "../../mock/orderData.json";
import { TbArrowsDownUp } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FaCaretDown, FaChevronDown } from "react-icons/fa";
import { IoChevronBack, IoChevronForwardOutline } from "react-icons/io5";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Papa from "papaparse";

export default function Dashboard({
  dashRef,
  show,
  setOpenModal,
  modal
}: {
  dashRef: React.RefObject<HTMLDivElement>;
  show: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  modal: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(Orders.orders);
  const [numbers, setNumbers] = useState<number[]>();

  const ordersPerPage = 10;
  const lastIndex = currentPage * ordersPerPage;
  const firstIndex = lastIndex - ordersPerPage;
  const displayedOrders = orders.slice(firstIndex, lastIndex);
  const page = Math.ceil(Orders.orders.length / ordersPerPage);

  const nextPage = () => {
    if (currentPage < page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const searchOrder = (searchTerm: string) => {
    const filteredOrders = Orders.orders.filter((order) =>
      order.orderNumber.includes(searchTerm)
    );
    setOrders(filteredOrders);
    const pageNumbers = Array.from(
      { length: Math.ceil(filteredOrders.length / ordersPerPage) },
      (_, index) => index + 1
    );
    console.log(pageNumbers);
    setNumbers(pageNumbers);
    setCurrentPage(1); // Reset current page when search changes
  };

  useEffect(() => {
    searchOrder(search);
  }, [search]);

  useEffect(() => {
    const pageNumbers = Array.from({ length: page }, (_, index) => index + 1);
    setNumbers(pageNumbers);
  }, []);

  const sort = () => {
    const sortedOrders = Orders.orders.sort((a, b) => {
      const orderNumberA = Number(a.orderNumber.replace("#", ""));
      const orderNumberB = Number(b.orderNumber.replace("#", ""));
      // toggle sort order
      if (orderNumberA > orderNumberB) {
        return orderNumberB - orderNumberA;
      }
      if (orderNumberA < orderNumberB) {
        return orderNumberA - orderNumberB;
      }
      return 0;
    });
    setOrders([...sortedOrders]);
  }
  
  const downloadCSV = () => {
    const csvData = Papa.unparse(orders, { header: true });
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    if(show) {
      dashRef.current?.classList.remove("dashboard__hide");
    } else {
      dashRef.current?.classList.add("dashboard__hide");
    }
    console.log(show);
  }, [show])

  const AppDetails = () => {
    return (
      <div className="dashboard__app-details">
        <div className="dashboard__app-details__content">
          <h1>Get started with Dukaan</h1>
          <a href="#payments">Show payments</a>
          <div className="dashboard__app-details__features">
            <div className="dashboard__app-details__features__box">
              <h3>Searching</h3>
            </div>
            <div className="dashboard__app-details__features__box">
              <h3>Sorting</h3>
            </div>
            <div className="dashboard__app-details__features__box">
              <h3>Download JSON to CSV</h3>
            </div>
            <div className="dashboard__app-details__features__box">
              <h3>Interactive UI (Sidebar)</h3>
            </div>
          </div>
          <p>
            Click every clickable to see what it does.
          </p>
        </div>
      </div>
    );
  }

  if(!show) {
    return <AppDetails />
  }
  return (
    <div ref={dashRef} className="dashboard">
      <DashHeader modal={modal} setOpenModal={setOpenModal}/>
      <div className="dashboard__overview">
        <div className="dashboard__overview-row">
          <p>Overview</p>
          {/* dropdown */}
          <p>
            <span>Last Month</span>
            <FaChevronDown />
          </p>
        </div>
        <div className="dashboard__overview-row">
          <div className="dashboard__overview-row__box">
            <p>Online orders</p>
            <h3>231</h3>
          </div>
          <div className="dashboard__overview-row__box">
            <p>Amount Received</p>
            <h3>₹23,92,312.19</h3>
          </div>
        </div>

        {/* Transactions */}
        <div className="dashboard__transactions">
          <p>Transaction | This Month</p>
          <div className="dashboard__transactions-orders">
            <div className="dashboard__transactions-orders__methods">
              <SearchBar
                search={search}
                setSearch={setSearch}
                dark={false}
                placeholder="Search by order ID..."
              />
              <div>
                <button onClick={() => sort()} className="icon-box">
                  <p>Sort</p>
                  <TbArrowsDownUp size={"1rem"} />
                </button>
                <button onClick={() => downloadCSV()} className="icon-box">
                  <LuDownload size={"1.2rem"} />
                </button>
              </div>
            </div>

            {/* transactions */}
            <table className="dashboard__transactions-orders__table">
              <thead>
                <tr className="dashboard__transactions-orders__header">
                  <th>Order ID</th>
                  <th>
                    Order Date
                    <FaCaretDown className="order-icon" />
                  </th>
                  <th>Order Amount</th>
                  <th>
                    Transaction Fees
                    <CiCircleInfo className="order-icon" />
                  </th>
                </tr>
              </thead>

              <tbody className="dashboard__transactions-orders__orders">
                {displayedOrders.map((order, index) => (
                  <tr
                    className="dashboard__transactions-orders__orders-row"
                    key={index}
                  >
                    <td>{order.orderNumber}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderAmount}</td>
                    <td>{order.transactionFees}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* pagination */}
            <nav className="dashboard__transactions-orders__pagination">
              <ul>
                <li>
                  <a href="#payments" className="changePage__button" onClick={prevPage}>
                    <IoChevronBack />
                    Previous
                  </a>
                </li>
                {numbers?.map((number, index) => (
                  <li key={index}>
                    <a
                      href="#payments"
                      className={currentPage === number ? "dashboard__active" : ""}
                      onClick={() => {
                        setCurrentPage(number);
                      }}
                    >
                      {number}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#payments" className="" onClick={nextPage}>
                    Next
                    <IoChevronForwardOutline />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
