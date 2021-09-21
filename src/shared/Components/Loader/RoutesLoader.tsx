import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./Loader.module.scss";
// import { Button } from "../FormElements";

interface Props {
  error: boolean;
  timedOut: boolean;
  retry: any;
}

export const RouteLoader: React.FunctionComponent<Props> = ({
  error,
  timedOut,
  retry,
}: Props) => (
  <div className={styles.container}>
    <div className={styles.loader}>
      <CircularProgress style={{ color: "#ff8c00" }} />
      {(error || timedOut) && <></>
        // <Button onClick={retry} text="retry" />
      }

    </div>
  </div>
);
