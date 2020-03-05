import React, {useEffect, useState} from "react";
import styles from "./ConfirmSignUp.module.css";
import {useHistory} from "react-router-dom";
import {Spin, Alert, Button} from "antd";
import Axios from "axios";
import {Link} from "react-router-dom";

const ConfirmSignUp = props => {
  const history = useHistory();
  const tokenArray = history.location.pathname.split("/");
  const token = tokenArray[tokenArray.length - 1];
  const [state, setState] = useState({
    isLoading: true,
    tokenInvalid: null,
  });

  useEffect(() => {
    Axios.post("https://flashdecks-staging.herokuapp.com/api/auth/confirm_email", {
      token: token,
    })
      .then(res => {
        setState({...state, tokenInvalid: false, isLoading: false});
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch(err => {
        setState({...state, tokenInvalid: true, isLoading: false});
        console.log(err);
      });
  }, [history, state, token]);

  return (
    <div className={styles.mainComponent}>
      {state.isLoading === true ? (
        <Spin data-testid="loader" className="loader" size="large" />
      ) : null}
      {state.tokenInvalid === true ? (
        <div>
          <Alert
            message="Token invalid"
            description="The token you tried to use is not in our database."
            type="error"
            data-testid="alertInvalid"
          />
          <Link to="/register">
            <Button
              type="primary"
              htmlType="submit"
              data-testid="button"
              className="login-form-button"
              loading={state.isLoading}
            >
              Return to SignUp
            </Button>
          </Link>
        </div>
      ) : state.tokenInvalid === false ? (
        <Alert
          message="Success"
          description="Account activated, you will get redirected to login!"
          type="success"
          data-testid="alertSuccess"
        />
      ) : null}
    </div>
  );
};

export default ConfirmSignUp;
