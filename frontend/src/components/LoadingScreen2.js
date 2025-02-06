import SVGIcons from "../SVGIcons";
import "../styles/LoadingScreen.css"

const LoadingScreen2 = ({fadeOut}) => {
    return (  
        <div className={`loading-screen bg-white ${fadeOut ? "fade-out" : ""}`}>
            <div className="loading-content">
                <div className="loading-animation ellipse-loading">
                    <div className="ellipse-container">
                        <div className="ellipse"></div>
                    </div>
                    <div className="ellipse-container">
                        <div className="ellipse"></div>
                    </div>
                    <div className="ellipse-container">
                    <div className="ellipse"></div>
                    </div>
                    <div className="ellipse-container">
                        <SVGIcons 
                        selected="loadingCat1"
                        size="24px"
                        color="#20063B"/>
                    </div>
                    
                </div>
                <div className="loading-text">
                </div>
            </div>
        </div>
    );
}
 
export default LoadingScreen2;