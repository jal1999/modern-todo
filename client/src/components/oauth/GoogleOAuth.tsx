import { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const GoogleOAuth = (props: any): ReactElement => {
    const history = useHistory();

    const signInHandler = ({creds: credential}: any) => {
        localStorage.setItem('token', credential);
        history.replace('/');
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