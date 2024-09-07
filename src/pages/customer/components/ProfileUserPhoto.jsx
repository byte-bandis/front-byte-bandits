import styled from "styled-components";
import CustomPhoto from "../../../components/shared/CustomPhoto";

const ProfileUserPhoto = styled(CustomPhoto)`
  position: absolute;
  top: -20px;
  left: 0;
  cursor: ${(props) => props.$customPointer || "none"};
`;
export default ProfileUserPhoto;
