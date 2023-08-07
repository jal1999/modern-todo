import { FormEvent, ReactElement, useState, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import styles from "../assets/styles/AuthForm.module.css"
import Logo from "../assets/images/logo.png";
import GoogleOAuth from '../features/authentication/google/components/GoogleOAuth';

const AuthForm = (props: any): ReactElement => {
    interface Error {
        email?: boolean,
        password?: boolean,
        confirmPassword?: boolean
    }

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [formError, setError] = useState<Error>({ email: false, password: false, confirmPassword: false });

    const history = useHistory();

    const resetState = (): void => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError({});
    };

    const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value);
    };

    const formSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const url = `http://localhost:8080/api/auth/${props.type === 'login' ? 'internal-login' : 'internal-signup'}`;
        const headers = { 'Content-Type': 'application/json' };
        const config = { headers: headers }
        const body = props.type === 'signup' ? { email: email, password: password, confirmPassword: confirmPassword } : { email: email, password: password };
        if (props.type === 'login') {
            try {
                const { data: { token }}: AxiosResponse = await axios.post(url, body, config);
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                window.location.replace("http://localhost:3000/");
            } catch (err: any) {
                const reasons: Error = err.response.data.reason;
                setError(reasons);
                setEmail('');
                setPassword('');
            }
        } else {
            try {
                await axios.post(url, body, config);
                window.location.href = "/login";
            } catch (err: any) {
                const reasons: Error = err.response.data.reason;
                console.log(reasons);
                setError(reasons);
            }
        }
    };

    return (
        <div className={styles.container}>

            {/* Logo and headers */}
            <img className={styles.logo} src={Logo} alt="" />
            <div className={styles.headerDiv}>
                <h3 className={styles.header}> {props.type === 'login' ? 'Sign in' : 'Sign up'}</h3>
                <p className={styles.signup}>
                    <Link className={styles.signupLink} to={props.type === 'login' ? '/sign-up' : 'login'} onClick={resetState}>
                        {props.type === 'login' ? 'Create Account' : 'Log in'}
                    </Link> instead?
                </p>
            </div>

            {/* The form */}
            <form className={styles.form} onSubmit={formSubmitHandler}>

                {/* The inputs */}
                <div className={styles.inputDiv}>
                    <label className={styles.inputLabel}>Email</label>
                    <input className={`${styles.input} ${formError['email'] ? styles.error : ''}`} type='text' onChange={emailChangeHandler} value={email} />
                    <div className={styles.questionMarkDiv}>
                        <div className={styles.flex}>
                            <label className={styles.inputLabel}>Password</label>
                        </div>
                    </div>
                    <input className={`${styles.input} ${formError.password ? styles.error : ''}`} type='password' onChange={passwordChangeHandler} value={password} />
                    {props.type === 'signup' &&
                        <>
                            <label className={styles.inputLabel}>Confirm Password</label>
                            <input className={`${styles.input} ${formError.confirmPassword ? styles.error : ''}`} type='password' onChange={confirmPasswordChangeHandler} />
                        </>}
                </div>

                {/* Forgot password prompt, if necessary */}
                {props.type === 'login' &&
                    <div className={styles.forgotDiv}>
                        <Link className={`${styles.forgot} ${styles.signup} ${styles.signupLink}`} to="/forgot-password">Forgot Password?</Link>
                    </div>}

                {/* The submit button with the appropriate text*/}
                <div className={styles.buttonDiv}>
                    <button className={styles.signInButton} type='submit'>{props.type === 'login' ? 'Sign in' : 'Sign up'}</button>
                </div>

                {/* The oauth buttons and ------ or ------- */}
                {props.type === 'login' &&
                    <>
                        <div className={styles.or}>
                            <div className={styles.line}></div>
                            <p className={styles.orP}> or </p>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.oauth}>
                            <GoogleOAuth />
                        </div>
                    </>}
            </form>
        </div>
    )
};

export default AuthForm;