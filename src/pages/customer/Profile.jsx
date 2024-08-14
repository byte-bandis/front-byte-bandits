import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLoggedUserName,
  getSinglePublicProfile,
} from "../../store/selectors";
import { useEffect } from "react";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";
import CustomPhoto from "../../components/shared/CustomPhoto";

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const { userPhoto, headerPhoto, userDescription } = loadedPublicProfile;

  const origin = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!username) {
      dispatch(getSinglePublicProfileWithThunk(loggedUserName));
    } else {
      dispatch(getSinglePublicProfileWithThunk(username));
    }
  }, [loggedUserName, username, dispatch]);

  return (
    <>
      <Col>
        <div className="container-fluid py-5">
          {userPhoto && (
            <CustomPhoto
              src={userPhoto}
              alt={`${username}'s profile picture`}
              crossOrigin={origin}
              $customborderradius="50%"
              $customwidth="200px"
              $customheight="200px"
              $customobjectfit="cover"
            />
          )}
          {headerPhoto && (
            <CustomPhoto
              src={headerPhoto}
              alt={`${username}'s header picture`}
              crossOrigin={origin}
              $customborder="none"
              $customboxshadow="none"
              $customtransform="none"
            />
          )}
          {userDescription && <div>{userDescription}</div>}
        </div>
      </Col>
    </>
  );
};

export default Profile;
