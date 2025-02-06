import header from '../images/assets/bg-signing-nograin.svg'
import icon from '../images/logos/Logo-Error.svg'
import '../styles/Modal.css'

const PopupError = ({errTitle, errMessage, buttons}) => {
    return (  
        <div className="modal-container">
            <div className='small-modal-box'>
                <img className="modal-header" src={header} alt="" />
                <div className='small-modal-main'>
                    <div className='modal-icon'>
                        <img src={icon} alt="" />   
                    </div>
                    <div className='modal-content'>
                        <h2 className='modal-error-title'>
                            {errTitle}
                        </h2>
                        <p className='modal-error-message'>
                            {errMessage}
                        </p>
                    </div>
                    <div className={`modal-buttons`}>
                    {buttons.map((button, index) => (
                        <button
                        className={`modal-btn ${button.className}`}
                        key={index}
                        onClick={button.func? button.func : () => {}}>
                            {button.text}
                        </button>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PopupError;