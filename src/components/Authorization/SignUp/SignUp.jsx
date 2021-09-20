/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styles from "./SignUp.module.css";
import commonStyle from "../Authorization.module.css";
import SignUpReduxForm from "./SignUpForm";
import { AuthorizationContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";

const SignUp = props => {
	let onSubmit = formData => {
		console.log(formData);
		props.setUserSignUp(formData);
	};

	return (
		<div className={commonStyle.authorization}>
			<div className={commonStyle.authorization_container}>
				{InformationContainer("Welcome Back!", "Don't have an account?", "/sign_in", "Sign In")}
				{AuthorizationContainer("Sign Up", <SignUpReduxForm onSubmit={onSubmit} users={props.users} userSignUp={props.userSignUp} />)}
			</div>
		</div>
	);
};

export default SignUp;
