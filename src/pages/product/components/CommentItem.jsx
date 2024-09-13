import { StarFill, Trash, Pencil } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../store/commentsThunk';
const CommentItem = ({ comment, setEditMode,setToEditComment }) => {
    const stars = comment.score;
    const dispatch = useDispatch();
const handleEdit = () => {
    setEditMode(true);
    setToEditComment(comment);
}
    const authUser = useSelector((state) => state.authState.user.userId) ;
    const commentUser = comment.user._id || comment.user
    const handleDeleteComment = async () => {
        dispatch(deleteComment(comment._id));
    };
    return (
        <StyledComment>
            <div className='commentheader'>
                <div className='userzone'>
                    <div className='avatarwrapper'>
                        <img
                            className='avatar'
                            alt='avatar'
                            src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        />
                    </div>
                    <div className='nickname'>
                        <h6>{comment.user.username}</h6>
                    </div>
                </div>

                <div className='stars'>
                    {Array.from({ length: stars }).map((_, i) => (
                        <div className='onestar' key={i}>
                            <StarFill color='gold' stroke='black' />
                        </div>
                    ))}

                    {Array.from({ length: 5 - stars }).map((_, i) => (
                        <div className='onestar' key={i + stars}>
                            <StarFill color='silver' stroke='grey' />
                        </div>
                    ))}
                </div>
            </div>
            {authUser === commentUser && (
                <div className='menu-comment'>
                    <Trash className='trash' onClick={handleDeleteComment} />
                    <Pencil onClick={handleEdit} />
                </div>
            )}
            <div>
                <p>{comment.commentText}</p>
            </div>
        </StyledComment>
    );
};
CommentItem.propTypes = {
    comment: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        fatherId: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        commentText: PropTypes.string.isRequired,
        user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
            birthdate: PropTypes.string.isRequired,
            creditCard: PropTypes.string,
        }),
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
    }),
    setEditMode: PropTypes.func.isRequired,
    setToEditComment: PropTypes.func.isRequired,
};
export default CommentItem;

const StyledComment = styled.div`
    width: 85%;
    position: relative;
    .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
        object-fit: cover;
    }
    .menu-comment {
        display: flex;
        position: absolute;
        right: 0;
        align-items: center;
        margin-bottom: 10px;
        gap: 5px;
    }
    .commentheader {
        border-radius: 12px 12px 0px 0px;
        padding: 6px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        background-color: var(--accent-100);
    }
    .userzone {
        display: flex;
        align-items: center;
    }
    .stars {
        display: flex;
        gap: 2px;
    }

    h6 {
        font-weight: bold;
        color: white;
        margin: 0;
    }
    .onestar {
        font: 1em sans-serif;
    }
    .nickname {
        display: flex;
        align-items: center;
    }
    .avatarwrapper {
        display: flex;
        align-items: center;
    }
    .trash {
        cursor: pointer;
    }
`;
