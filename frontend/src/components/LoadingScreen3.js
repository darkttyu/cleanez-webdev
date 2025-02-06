import SVGIcons from "../SVGIcons";
import "../styles/LoadingScreen.css"

const LoadingScreen3 = () => {
    return (  
        <div className={`loading-screen small`}>
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
                        size="20px"
                        color="#20063B"/>
                    </div>
                    
                </div>
                <div className="loading-text">
                </div>
            </div>
        </div>
    );
}
 
export default LoadingScreen3;