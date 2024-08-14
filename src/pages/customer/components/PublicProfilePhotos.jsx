import PropTypes from "prop-types";
import PhotosContainer from "./PhotosContainer";
import HeaderProfilePhoto from "./HeaderProfilePhoto";
import ProfileUserPhoto from "./ProfileUserPhoto";

const PublicProfilePhotos = ({ userPhoto, headerPhoto, username, origin }) => {
  return (
    <PhotosContainer>
      {headerPhoto && (
        <HeaderProfilePhoto
          src={headerPhoto}
          alt={`${username}'s header picture`}
          crossOrigin={origin}
          $customborder="none"
          $customboxshadow="none"
          $customtransform="none"
        />
      )}
      {userPhoto && (
        <ProfileUserPhoto
          src={userPhoto}
          alt={`${username}'s profile picture`}
          crossOrigin={origin}
          $customborderradius="50%"
          $customwidth="200px"
          $customheight="200px"
          $customobjectfit="cover"
        />
      )}
    </PhotosContainer>
  );
};

PublicProfilePhotos.propTypes = {
  userPhoto: PropTypes.string,
  headerPhoto: PropTypes.string,
  username: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
};

export default PublicProfilePhotos;
