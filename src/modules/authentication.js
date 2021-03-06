import JtockAuth from "j-tockauth";
import { AUTHENTICATE, LOGOUT } from "../state/actions/actionTypes";

const auth = new JtockAuth({
  host: "https://co-ping.herokuapp.com"
});

const onLogin = async (event, dispatch) => {
  try {
    event.preventDefault();
    let response = await auth.signIn(
      event.target.email.value,
      event.target.password.value
    );
    dispatch({
      type: AUTHENTICATE,
      payload: {
        authenticated: true,
        userEmail: response.data.email,
        userName: response.data.name,
        userRole: response.data.role,
        communityId: response.data.community_id,
        loginMessage: `Welcome ${response.data.name}`,
        showLoginForm: false
      }
    });
  } catch (error) {
    let errorMessage = error.response.data.errors[0];
    dispatch({ type: AUTHENTICATE, payload: { loginMessage: errorMessage } });
  }
};

const onLogout = dispatch => {
  auth.signOut().then(() => {
    dispatch({
      type: LOGOUT,
      payload: {
        authenticated: false,
        userEmail: null,
        userName: null,
        logoutMessage: "Hasta la vista!",
        loginMessage: ""
      }
    });
  });
};

export { onLogin, onLogout };
