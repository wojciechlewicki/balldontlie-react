import classes from "./DataTableNavigation.module.css";

import { ReactComponent as ArrowBack } from "../../assets/arrow_back.svg";
import { ReactComponent as ArrowForward } from "../../assets/arrow_forward.svg";

const DataTableNavigation = (props) => {
  return (
    <div className={classes.navigation}>
      <div className="flexbox-row-center">
        <label htmlFor="per_page">Rows per page</label>
        <select name="per_page" value={props.perPage} onChange={props.handlePerPageChange}>
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
        <button onClick={props.handleBack}>
          <ArrowBack />
        </button>
        <button onClick={props.handleForward}>
          <ArrowForward />
        </button>
      </div>
    </div>
  );
};

export default DataTableNavigation;
