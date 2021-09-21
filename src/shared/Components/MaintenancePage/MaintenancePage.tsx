import React from "react";
import classnames from "classnames";
// import { useHistory } from "react-router";
// import { ReactComponent as BackButton } from "../../../icons/back_button.svg";

import styles from "./MaintenancePage.module.scss";
// import { Button } from "../FormElements";
// import { AUTHORITIES } from "src/config/constants";
import { DispatchProps, StateProps } from "./index";
// import Header from "../Header";
// import Footer from "../Footer";

interface Props extends DispatchProps, StateProps { }

const MaintenanceComponent: React.FunctionComponent<Props> = ({
  // userType,
}: Props) => {
  // const history = useHistory();

  // const backHandler = React.useCallback(() => {
  //   history.goBack();
  // }, [history]);

  // const goHomeHandler = useCallback(() => {
  //   if (userType === AUTHORITIES.PARENT) {
  //     history.push("/parent");
  //   } else if (userType === AUTHORITIES.STUDENT) {
  //     history.push("learner");
  //   } else {
  //     history.push("/signin");
  //   }
  // }, [history, userType]);

  return (
    <div className={classnames("d-flex", "flex-col", styles.maintenancePage)}>
      {/* <Header isLoggedIn={false} /> */}
      <div className={classnames(styles.body, "d-flex", "align-center")}>
        <div className={styles.wrapper}>
          {/* <div className={"d-flex align-center pointer"} onClick={backHandler}>
            <BackButton />
            <span className={styles.goback}>Go Back</span>
          </div> */}
          <div className={classnames("h1", styles.title)}>We’re back soon!</div>
          <div
            className={classnames(
              "h2",
              ".color-black-primary",
              styles.description
            )}
          >
            The site is under maintenance. Our team is working hard to bring it
            back to you soon.
          </div>
          {/* <Button buttonStyle="plain" onClick={goHomeHandler}>
            Home
        </Button> */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MaintenanceComponent;
