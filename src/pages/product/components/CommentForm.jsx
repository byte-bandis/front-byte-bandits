import { useState } from "react";
import { StarFill } from "react-bootstrap-icons";
import PropTypes from 'prop-types';
import './commentForm.css'
import Button from "./Button";
import StyledTextarea from "../../../components/shared/StyledTextArea";
import { useDispatch } from "react-redux";
import { createComment } from "../../../store/commentsThunk";

const CommentForm = ({productId}) => {
    const dispatch = useDispatch();
    const [score, setScore] = useState(0);
    const [commentText, setCommentText] = useState('');
    const handleComment = () => {
            const comment = {
                commentText,
                score
            }
        dispatch(createComment( {comment, productId}));
        setCommentText('');
        setScore(0);
    }
    const handleStars = (value ) => {
        setScore(value);
    };
    return (
        <div className='commentForm-wrapper'>
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
            <StyledTextarea value={commentText} onChange={(e)=> setCommentText(e.target.value)} className='commentText' />
            <Button onClick={() => handleComment()} className='sendCommentButton'>Enviar</Button>
            
            </>
            }
        </div>
    );
};

export default CommentForm;
CommentForm.propTypes = {
    productId: PropTypes.string.isRequired,
}