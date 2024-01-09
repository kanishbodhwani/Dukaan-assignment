import { CiSearch } from "react-icons/ci";
import "../../styles/searchbar.css";

export default function SearchBar({
  dark,
  placeholder,
  search,
  setSearch,
}: {
  dark: boolean;
  placeholder: string;
  search?: string;
  setSearch?: (search: string) => void;
}) {

  return (
    <div className="search">
      <CiSearch size={"1.2rem"} className="search__search_icon" />
      <input
        type="text"
        placeholder={placeholder}
        style={{
          width: dark ? "400px" : "250px",
          backgroundColor: dark ? "#F2F2F2" : "transparent",
          border: !dark ? "1px solid #E5E5E5" : "none",
        }}
        value={search}
        onChange={(e) => setSearch && setSearch(e.target.value)}
      />
    </div>
  );
}
