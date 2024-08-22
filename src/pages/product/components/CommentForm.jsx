import { useState } from "react";
import { StarFill } from "react-bootstrap-icons";
import './commentForm.css'
import Button from "./Button";
import StyledTextarea from "../../../components/shared/StyledTextArea";

const CommentForm = () => {
    /*     const [commentText, setCommentText] = useState('');
     */
    const [score, setScore] = useState(0);
    const handleStars = (value ) => {
        console.log(value);
        setScore(value);
    };
    return (
        <div>
            <div className='stars-buttons'>
                {Array.from({ length: score }).map((_, i) => (
                    <div
                        className='onestar'
                        key={i}
                    >
                        <StarFill onClick={() => handleStars(i + 1)} color='gold' stroke='black' />
                    </div>
                ))}

                {Array.from({ length: 5 - score }).map((_, i) => (
                    <div
                        
                        className='onestar'
                        key={i + score}
                    >
                        <StarFill onClick={() => handleStars(i + score + 1)} color='silver' stroke='grey' />
                    </div>
                ))}
            </div>
            {score > 0 && 
            <>  
            <StyledTextarea className='commentText' />
            <Button  className='sendCommentButton'>Enviar</Button    >
            
            </>
            }
        </div>
    );
};

export default CommentForm;