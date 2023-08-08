import { ReactElement, useEffect } from 'react';
import decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const GoogleOAuth = (props: any): ReactElement => {
    const [cookies, setCookie, deleteCookie] = useCookies();
    const dispatch = useDispatch();    

    const signInHandler = ({ credential: token }: any) => {
        const { email } = JSON.parse(JSON.stringify(decode(token)));
        dispatch({ type: "login", email: email, token: token, issuer: "google" });
        setCookie("isLoggedIn", "true");
        window.location.replace("http://localhost:3000/");
    };

    // This useEffect block is needed, else the sign in button will disappear on any re-render.
    //
    // Source: https://stackoverflow.com/questions/70993933/why-does-the-sign-in-with-google-button-disappear-after-i-render-it-the-second-t
    useEffect(() => {
        try {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: signInHandler
            });

            google.accounts.id.renderButton(
                document.getElementById("google"),
                { theme: "outline", size: 'large', width: '350px' }
            );
        } catch (err: any) {
            console.log(err);
        }
    });

    return (
        <>
            <div id="google"></div>
        </>
    )
};

export default GoogleOAuth;