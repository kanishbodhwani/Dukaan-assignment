import { FaChevronRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function StoreInfo({
  shrink,
  infoRef,
  modal,
  setOpenModal
}: {
  shrink: () => void;
  infoRef: React.RefObject<HTMLDivElement>;
  modal: boolean;
  setOpenModal: (value: boolean) => void;
}) {

  return (
    <div className="storeinfo">
      <div className="storeinfo__inside">
        <img src="/assets/apple-logo.png" alt="user-image" />
        <div ref={infoRef} className="storeinfo__info">
          <span>Apple Store</span>
          <span>Visit Store</span>
        </div>
      </div>
      {!modal ? <FaChevronRight
        onClick={() => {
          shrink();
        }}
        style={{ cursor: "pointer" }}
        size={"1.2rem"}
        color="#F2F2F2"
      /> : <RxCross2 
        onClick={() => {
          setOpenModal(false);
        }}
        style={{ cursor: "pointer" }}
        size={"1.2rem"}
        color="#F2F2F2"
      />}
    </div>
  );
}
