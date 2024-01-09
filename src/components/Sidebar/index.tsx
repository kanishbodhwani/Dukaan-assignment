import StoreInfo from "./StoreInfo";
import { GoHome } from "react-icons/go";
import { CiViewList, CiDeliveryTruck } from "react-icons/ci";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa";
import { AiOutlineSound } from "react-icons/ai";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { LuMousePointer2 } from "react-icons/lu";
import { CiDiscount1 } from "react-icons/ci";
import { RiGroupLine } from "react-icons/ri";
import { MdOutlineColorLens } from "react-icons/md";
import { PiLightningLight } from "react-icons/pi";
import { MdOutlinePayments } from "react-icons/md";
import { CiCreditCard2 } from "react-icons/ci";
import "../../styles/sidebar.css";
import {  useState } from "react";

export default function Sidebar({
  navbarRef,
  menubarRef,
  menubarInsideRef,
  backIconRef,
  infoRef,
  shrink,
  item,
  modal,
  setOpenModal
}: {
  navbarRef: React.RefObject<HTMLDivElement>;
  menubarRef: React.RefObject<HTMLUListElement>;
  menubarInsideRef: React.RefObject<HTMLDivElement>;
  backIconRef: React.RefObject<HTMLDivElement>;
  infoRef: React.RefObject<HTMLDivElement>;
  shrink: () => void;
  item: () => void;
  modal: boolean;
  setOpenModal: (value: boolean) => void;
}) {

  const [activeItem, setActiveItem] = useState("");
  const handleItemClick = (itemName: string) => {
    item();
    setActiveItem(itemName);
  };

  return (
    <nav ref={navbarRef} className="sidebar">
      <header>
        <StoreInfo modal={modal} setOpenModal={setOpenModal} infoRef={infoRef} shrink={shrink} />
      </header>

      <div className="menubar">
        <ul ref={menubarRef} className="menubar__list">
          <li onClick={() => handleItemClick("Home")}
            className={`menubar__item ${
              activeItem === "Home" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <GoHome size={"1.6rem"}/>
              <span>Home</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Orders")}
            className={`menubar__item ${
              activeItem === "Orders" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <CiViewList size={"1.6rem"}/>
              <span>Orders</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Products")}
            className={`menubar__item ${
              activeItem === "Products" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <HiOutlineSquares2X2 size={"1.6rem"}/>
              <span>Products</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Delivery")}
            className={`menubar__item ${
              activeItem === "Delivery" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <CiDeliveryTruck size={"1.6rem"}/>
              <span>Delivery</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Marketing")}
            className={`menubar__item ${
              activeItem === "Marketing" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <AiOutlineSound size={"1.6rem"}/>
              <span>Marketing</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Analytics")}
            className={`menubar__item ${
              activeItem === "Analytics" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <HiOutlineChartBarSquare size={"1.6rem"}/>
              <span>Analytics</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Payments")}
            className={`menubar__item ${
              activeItem === "Payments" ? "active" : ""
            }`}>
            <a href="#payments" className="menubar__link" style={{
              padding: '10px'
            }}>
              {/* <MdOutlinePayments size={"1.6rem"}/> */}
              <img src="/assets/Vector.png" alt="payment" style={{height: '1.2rem'}}/>
              <span>Payments</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Tools")}
            className={`menubar__item ${
              activeItem === "Tools" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <LuMousePointer2 size={"1.6rem"}/>
              <span>Tools</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Discounts")}
            className={`menubar__item ${
              activeItem === "Discounts" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <CiDiscount1 size={"1.6rem"}/>
              <span>Discounts</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Audence")}
            className={`menubar__item ${
              activeItem === "Audence" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <RiGroupLine size={"1.6rem"}/>
              <span>Audence</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Appearance")}
            className={`menubar__item ${
              activeItem === "Appearance" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <MdOutlineColorLens size={"1.6rem"}/>
              <span>Appearance</span>
            </a>
          </li>
          <li onClick={() => handleItemClick("Plugins")}
            className={`menubar__item ${
              activeItem === "Plugins" ? "active" : ""
            }`}>
            <a href="#" className="menubar__link">
              <PiLightningLight size={"1.6rem"}/>
              <span>Plugins</span>
            </a>
          </li>
        </ul>
      </div>

      <footer className="menubar__footer">
        <div ref={menubarInsideRef} className="menubar__footer-inside">
          <div className="menubar__footer-icon">
            <CiCreditCard2 size={"1.8rem"}/>
          </div>
          <div className="menubar__footer-info">
            <span>Available credits</span>
            <span>222.10</span>
          </div>
        </div>
        <div ref={backIconRef} className="back-icon">
          <FaChevronRight onClick={shrink} size={"1.2rem"} color="#F2F2F2"/>
        </div>
      </footer>      
    </nav>
  );
}
