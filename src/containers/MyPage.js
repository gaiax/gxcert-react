import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getCertificates } from "../actions";
import { AppState } from "../store";
import { MyPageComponent } from "../views/MyPage";
import { issue } from "../actions";

const mapStateToProps = (appState) => {
  return {
    certificates: appState.state.certificates,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    issue: () {
      dispatch(issue());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPageComponent);
