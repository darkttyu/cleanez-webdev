import { useState } from "react";
import SVGIcons from "../SVGIcons";
import header from "../images/assets/bg-signing-nograin.svg"
import icon from "../images/logos/Profile-Icon3.svg"
import axios from "axios";

const RatingBox = ({appID, setShowRating, fetchAppointments}) => {
    const [starOne, setStarOne] = useState("none");
    const [starTwo, setStarTwo] = useState("none");
    const [starThree, setStarThree] = useState("none");
    const [starFour, setStarFour] = useState("none");
    const [starFive, setStarFive] = useState("none");

    const [rating, setRating] = useState({
        appointmentRating: 0
    });

    const [submitDisabled, setSubmitDisabled] = useState(true);

    const ratingClick = (rate) => {
        setStarOne("none");
        setStarTwo("none");
        setStarThree("none");
        setStarFour("none");
        setStarFive("none");

        setSubmitDisabled(false);

        if (rate === 1) {
            setStarOne("#06E36D");
        } else if (rate === 2) {
            setStarOne("#06E36D");
            setStarTwo("#06E36D");
        } else if (rate === 3) {
            setStarOne("#06E36D");
            setStarTwo("#06E36D");
            setStarThree("#06E36D");
        } else if (rate === 4) {
            setStarOne("#06E36D");
            setStarTwo("#06E36D");
            setStarThree("#06E36D");
            setStarFour("#06E36D");
        } else if (rate === 5) {
            setStarOne("#06E36D");
            setStarTwo("#06E36D");
            setStarThree("#06E36D");
            setStarFour("#06E36D");
            setStarFive("#06E36D");
        }

        console.log(rate);
        setRating({
            appointmentRating: rate
        });
    }

    const submitRating = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/user/rateAppointment/${id}`, rating);

            console.log(response);

            fetchAppointments();
            setShowRating(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (  
        <div 
        className="appointment-info-container">
            <div className="rating-box">
                <img className="rating-header" src={header} alt="" />
                <div className="rating-main">
                    <div className="rating-icon">
                        <img src={icon} alt="" />
                    </div>
                    <div className="rating-prompt">
                        <h3 className="rating-text">How would you rate our workers and their service?</h3>
                        <div className="rating-stars">
                            <SVGIcons
                            strokewidth="1.5"
                            stroke="#06E36D"
                            selected="starRatingOutline" 
                            size="48px" 
                            color={starOne}
                            onClick={(e) => ratingClick(1)}/>
                            <SVGIcons
                            strokewidth="1.5"
                            stroke="#06E36D"
                            selected="starRatingOutline" 
                            size="48px" 
                            color={starTwo}
                            onClick={(e) => ratingClick(2)}/>
                            <SVGIcons
                            strokewidth="1.5"
                            stroke="#06E36D"
                            selected="starRatingOutline" 
                            size="48px" 
                            color={starThree}
                            onClick={(e) => ratingClick(3)}/>
                            <SVGIcons
                            strokewidth="1.5"
                            stroke="#06E36D"
                            selected="starRatingOutline" 
                            size="48px" 
                            color={starFour}
                            onClick={(e) => ratingClick(4)}/>
                            <SVGIcons
                            strokewidth="1.5"
                            stroke="#06E36D"
                            selected="starRatingOutline" 
                            size="48px" 
                            color={starFive}
                            onClick={(e) => ratingClick(5)}/>
                        </div>
                    </div>
                    <button 
                    className="act-btn complete btn-stretch"
                    disabled={submitDisabled}
                    onClick={(e) => submitRating(appID)}>
                        Submit
                    </button>
                </div>
            </div>
            <div 
            className="popup-bg"
            onClick={(e) => setShowRating(false)}>
            </div>
        </div>
    );
}
 
export default RatingBox;