import styles from "./Navigation.module.css";

import { ReactComponent as ArrowBack } from "../../assets/arrow_back.svg";
import { ReactComponent as ArrowForward } from "../../assets/arrow_forward.svg";

const Navigation = ({ numberOfPages, searchParams, setSearchParams }) => {
  const perPage = +searchParams.get("per_page")
    ? +searchParams.get("per_page")
    : 20;
  const currentPage = +searchParams.get("page") ? +searchParams.get("page") : 1;

  const handleBack = () => {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  };

  const handleForward = () => {
    if (currentPage < numberOfPages) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  };

  const handlePerPageChange = (event) => {
    const perPage = event.target.value;
    searchParams.set("page", 1);
    searchParams.set("per_page", perPage);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.navigation}>
      <div className="flexbox-row-center">
        <label htmlFor="per_page">Rows per page</label>
        <select name="per_page" value={perPage} onChange={handlePerPageChange}>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="flexbox-row-center">
        <div>{currentPage}</div>
        <div>/{numberOfPages ? numberOfPages : "1"}</div>
      </div>
      <div className="flexbox-row-center">
        <button onClick={handleBack}>
          <ArrowBack />
        </button>
        <button onClick={handleForward}>
          <ArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
