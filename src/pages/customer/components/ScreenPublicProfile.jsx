// PublicProfileScreen.jsx
import PropTypes from "prop-types";
import PublicProfilePhotos from "./PublicProfilePhotos";
import DescriptionContainer from "./DescriptionContainer";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
`;

const ScreenPublicProfile = ({
  userPhoto,
  headerPhoto,
  username,
  origin,
  userDescription,
  onUserPhotoClick,
}) => {
  return (
    <Container>
      <PublicProfilePhotos
        userPhoto={userPhoto}
        headerPhoto={headerPhoto}
        username={username}
        origin={origin}
        onUserPhotoClick={onUserPhotoClick}
      />
      {userDescription && (
        <DescriptionContainer>{userDescription}</DescriptionContainer>
      )}
    </Container>
  );
};

ScreenPublicProfile.propTypes = {
  userPhoto: PropTypes.string,
  headerPhoto: PropTypes.string,
  username: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  userDescription: PropTypes.string,
  onUserPhotoClick: PropTypes.func, // Agregamos validación para el nuevo prop
};

export default ScreenPublicProfile;
