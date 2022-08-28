import useNavigation from "../../hooks/useNavigation";

import styles from "./Navigation.module.css";

import { ReactComponent as ArrowBack } from "../../assets/arrow_back.svg";
import { ReactComponent as ArrowForward } from "../../assets/arrow_forward.svg";

const perPageAmounts = [20, 30, 50, 80, 100];

const Navigation = ({ numberOfPages, searchParams, setSearchParams }) => {
  const perPage = +searchParams.get("per_page")
    ? +searchParams.get("per_page")
    : 20;
  const currentPage = +searchParams.get("page") ? +searchParams.get("page") : 1;
  const { handleBack, handleForward, handlePerPageChange } = useNavigation(
    currentPage,
    numberOfPages,
    searchParams,
    setSearchParams
  );

  return (
    <div className={styles.navigation}>
      <div className="flexbox-row-center">
        <label htmlFor="per_page">Rows per page</label>
        <select name="per_page" value={perPage} onChange={handlePerPageChange}>
          {perPageAmounts.map((perPage) => {
            return <option value={perPage}>{perPage}</option>;
          })}
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
