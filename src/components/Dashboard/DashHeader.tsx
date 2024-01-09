import { AiOutlineQuestionCircle } from "react-icons/ai";
import { HiSpeakerphone } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { Dispatch, SetStateAction } from "react";

export default function DashHeader({
  modal,
  setOpenModal
}: {
  modal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <header className="dashHeader">
      <div className="dashHeader__about">
        <div className="hamburger">
          <RxHamburgerMenu onClick={() => setOpenModal(!modal)}/>
        </div>
        <h3>Payments</h3>
        <span>
          <AiOutlineQuestionCircle />
          <p>How it works</p>
        </span>
      </div>
      <SearchBar dark={true} placeholder="Search features, tutorials, etc."/>
      <div className="dashHeader__icons">
        <HiSpeakerphone size={"2.6rem"} className="dashHeader__icons-speaker"/>
        <FaCaretDown size={"2.6rem"} className="dashHeader__icons-comment"/>
      </div>
    </header>
  )
}