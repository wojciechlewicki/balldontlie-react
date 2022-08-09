import Card from "../ui/Card";
import styles from "./DataTable.module.css"

const DataTable = (props) => {
  return (
    <Card>
      <table className={styles['data-table']}>
        <thead>{props.head}</thead>
        <tbody>{props.body}</tbody>
      </table>
    </Card>
  );
};

export default DataTable;
