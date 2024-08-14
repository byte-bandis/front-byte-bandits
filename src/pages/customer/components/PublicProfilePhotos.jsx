import PropTypes from "prop-types";
import PhotosContainer from "./PhotosContainer";
import HeaderProfilePhoto from "./HeaderProfilePhoto";
import ProfileUserPhoto from "./ProfileUserPhoto";
import { useState } from "react";
import UsernameOverlay from "./UsernameOverlay";

const PublicProfilePhotos = ({ userPhoto, headerPhoto, username, origin }) => {
  const [showUsername, setShowUsername] = useState(false);

  const handleUserPhotoInteraction = () => {
    setShowUsername(!showUsername);
  };

  const handleUserPhotoClick = () => {
    alert(`Someone wants to talk with ${username}`);
  };

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
          onMouseEnter={handleUserPhotoInteraction}
          onMouseLeave={handleUserPhotoInteraction}
          onClick={handleUserPhotoClick}
        />
      )}
      {showUsername && <UsernameOverlay>Talk to {username}?</UsernameOverlay>}
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
