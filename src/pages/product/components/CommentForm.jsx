import { useEffect, useState } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import './commentForm.css';
import Button from './Button';
import StyledTextarea from '../../../components/shared/StyledTextArea';
import { useDispatch } from 'react-redux';
import { createComment, updateComment } from '../../../store/commentsThunk';

const CommentForm = ({ productId, editMode, toEditComment }) => {
    const dispatch = useDispatch();
    const [score, setScore] = useState(toEditComment.score);
    const [commentText, setCommentText] = useState(toEditComment.commentText);

    useEffect(() => {
        setScore(toEditComment.score);
        setCommentText(toEditComment.commentText);
    }, [toEditComment]);
    const handleComment = () => {
        const comment = {
            commentText,
            score,
        };
        if (!editMode) {
            dispatch(createComment({ comment, productId }));
            setScore(0);
            setCommentText('');
        } else {
            dispatch(updateComment({ commentId: toEditComment._id, adFormData: {...toEditComment, score, commentText } }));
            setScore(0);
            setCommentText('');
        }
    };
    const handleStars = (value) => {
        setScore(value);
    };
    return (
        <div className='commentForm-wrapper'>
            <div className='stars-buttons'>
                {Array.from({ length: score }).map((_, i) => (
                    <div className='onestar' key={i}>
                        <StarFill
                            onClick={() => handleStars(i + 1)}
                            color='gold'
                            stroke='black'
                        />
                    </div>
                ))}

                {Array.from({ length: 5 - score }).map((_, i) => (
                    <div className='onestar' key={i + score}>
                        <StarFill
                            onClick={() => handleStars(i + score + 1)}
                            color='silver'
                            stroke='grey'
                        />
                    </div>
                ))}
            </div>
            {score > 0 && (
                <>
                    <StyledTextarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className='commentText'
                    />
                    <Button
                        onClick={() => handleComment()}
                        className='sendCommentButton'
                    >
                        Enviar
                    </Button>
                </>
            )}
        </div>
    );
};

export default CommentForm;
CommentForm.propTypes = {
    productId: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    toEditComment: PropTypes.object,
};
