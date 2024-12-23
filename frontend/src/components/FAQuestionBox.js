const FAQuestionBox = ({questions, answers}) => {
    return (  
        <details className="faq-container">
            <summary className="faq-questions">
                <p>{questions.eng}</p>
                <p>{questions.fil}</p>
            </summary>
            <hr />
            <div className="faq-answers">
                <p>{answers.eng}</p>
                <p>{answers.fil}</p>
            </div>
        </details>
    );
}
 
export default FAQuestionBox;