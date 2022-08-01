import classes from "./DataTableNavigation.module.css";

import { ReactComponent as ArrowBack } from "../../assets/arrow_back.svg";
import { ReactComponent as ArrowForward } from "../../assets/arrow_forward.svg";

const DataTableNavigation = (props) => {
  const handleBack = () => {
    if (props.currentPage > 1) {
      const paramsObj = {
        page: props.currentPage - 1,
      };
      if (props.perPage !== 20) {
        paramsObj.per_page = props.perPage;
      }

      props.setSearchParams(paramsObj);
    }
  };

  const handleForward = () => {
    if (props.currentPage < props.numberOfPages) {
      const paramsObj = {
        page: props.currentPage + 1,
      };
      if (props.currentPage === 0) {
        paramsObj.page++;
      }
      if (props.perPage !== 20) {
        paramsObj.per_page = props.perPage;
      }

      props.setSearchParams(paramsObj);
    }
  };

  const handlePerPageChange = (event) => {
    const per_page = event.target.value;
    props.setSearchParams({ per_page: per_page });
  };

  return (
    <div className={classes.navigation}>
      <div className="flexbox-row-center">
        <label htmlFor="per_page">Rows per page</label>
        <select
          name="per_page"
          value={props.perPage}
          onChange={handlePerPageChange}
        >
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="flexbox-row-center">
        <div>{props.currentPage}</div>
        <div>/{props.numberOfPages ? props.numberOfPages : "1"}</div>
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

export default DataTableNavigation;
