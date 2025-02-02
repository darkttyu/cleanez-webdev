import '../styles/UserSigning.css';
import bg from "../images/assets/bg-signing-nograin.svg";
import logoIcon from "../images/logos/Logo-1-2.svg";
import logoText from "../images/logos/Logo-4-1.svg";
import LoadingScreen1 from './LoadingScreen1';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SigningPanel = ({inputPanel}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            await document.fonts.ready;

            const imageUrls = [bg, logoIcon, logoText];
            const imagePromises = imageUrls.map((src) => {
                return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                });
            });

            await Promise.all(imagePromises);

            setTimeout(() => {
                setFadeOut(true);

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }, 3000);

            
        };

        loadResources();
    }, [])

    return (  
        <>
            {isLoading? 
            <LoadingScreen1 fadeOut={fadeOut}/> :
            <>
            </>
            }
            <div className="signing-panel">
                <div className="branding">
                    <Link to="/">
                        <img 
                        className="logo" 
                        src={logoIcon} alt="" />
                    </Link>
                        <img 
                        className="text" 
                        src={logoText} alt="" />
                </div>
                {inputPanel}
            </div>
            <figure className="background">
                <img src={bg} alt="" />
            </figure>
        </>
    ); 
}

export default SigningPanel;