import { connect } from "react-redux";

import { RootReducer } from "../../reducer";
import { toggleAREditorGrid } from "./actions";
import AREditor from "./components/AREditor/AREditor";
const mapStateToProps = (state: RootReducer) => ({
    ...state.ArEditor,
});

const mapDispatchToProps = {
    toggleAREditorGrid
};

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AREditor);
