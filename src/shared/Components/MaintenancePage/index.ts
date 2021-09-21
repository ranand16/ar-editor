import { connect } from "react-redux";

import { RootReducer } from "../../../reducer";
import MaintenancePage from "./MaintenancePage";

const mapStateToProps = (state: RootReducer) => ({
  // userType: state?.authentication.userType,
});

const mapDispatchToProps = {};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MaintenancePage);
