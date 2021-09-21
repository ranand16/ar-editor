import React from "react";
// import LoaderAnimation from "../../../icons/animations/loading.gif";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./Loader.module.scss";

interface Props {
  isLoading: boolean;
}

const Loader: React.FunctionComponent<Props> = ({ isLoading }: Props) =>
  isLoading ? (
    <div className={styles.container}>
      <div className={styles.loader}>
        {/* <LoaderAnimation /> */}
        {/* <img className={styles.loader} src={LoaderAnimation} alt="Loading..." /> */}
        <CircularProgress style={{ color: "#ff8c00" }} />
      </div>
    </div>
  ) : null;

export default Loader;
