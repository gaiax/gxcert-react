import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getCertificates } from "../actions";
import { AppState } from "../store";
import { MyPageComponent } from "../views/MyPage";

const mapStateToProps = (appState) => {
  return {
    certificates: appState.state.certificates,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPageComponent);
