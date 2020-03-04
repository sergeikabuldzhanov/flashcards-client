import React from "react";
import NormalLoginForm from "../../components/ForgotPassword/FormComponent";
import styles from "../../components/formStyleComponent/FormStyleComponent.module.css";
import FormHeader from "../../components/formStyleComponent/FormHeader";

const ForgotPassword = props => {
  return (
    <div className={styles.formStyle}>
      <FormHeader />
      <NormalLoginForm />
    </div>
  );
};

export default ForgotPassword;
