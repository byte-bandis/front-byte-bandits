import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../../pages/product/components/Button";

const Confirmator = ({ textValue, onConfirm, sethiden, hidden }) => {
  const handleAccept = () => {
    onConfirm();
    sethiden(false);
  };
  const handleCancel = () => sethiden(false);

  return (
    hidden && (
      <StyledConfirm>
        <div className="blurer"></div>
        <div className="confirmator">
          <h2>Seguro que desea {textValue}</h2>
          <div className="buttonWrapper">
            <Button onClick={handleAccept} $customheight="25px">
              Si
            </Button>
            <Button onClick={handleCancel} $customheight="25px">
              No
            </Button>
          </div>
        </div>
      </StyledConfirm>
    )
  );
};

export default Confirmator;
Confirmator.propTypes = {
  textValue: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  sethiden: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
};
const StyledConfirm = styled.div`
  .blurer {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    backdrop-filter: blur(15px);
    z-index: 3;
    &[hidden] {
      display: none;
    }
  }
  .confirmator {
    display: flex;
    flex-direction: column;
    gap: 22px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    padding: 20px;
    border: 2px solid var(--accent-100);
    border-radius: 10px;
    background: var(--bg-200);
    position: absolute;
    z-index: 20;
    &[hidden] {
      display: none;
    }
    h2 {
      color: var(--text-200);
    }
  }
`;
