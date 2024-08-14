import PropTypes from "prop-types";
import PhotosContainer from "./PhotosContainer";
import HeaderProfilePhoto from "./HeaderProfilePhoto";
import ProfileUserPhoto from "./ProfileUserPhoto";
import { useState } from "react";
import UsernameOverlay from "./UsernameOverlay";

const PublicProfilePhotos = ({
  userPhoto,
  headerPhoto,
  username,
  origin,
  onClickAction,
}) => {
  const [showUsername, setShowUsername] = useState(false);

  const handleUserPhotoInteraction = () => {
    setShowUsername(!showUsername);
    if (onClickAction) {
      return console.log("Something should be done?");
    }
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
  onClickAction: PropTypes.func,
};

export default PublicProfilePhotos;
