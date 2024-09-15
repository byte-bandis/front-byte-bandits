import styled from "styled-components";
import PropTypes from "prop-types";
import { RegularButton } from "./buttons";
import { ButtonContainer } from "./buttons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Confirmator = ({
  textValue,
  onConfirm,
  sethiden,
  hidden,
  goBack,
  ...props
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getPageBack = -1;
  const handleAccept = () => {
    onConfirm();
    sethiden(false);
  };
  const handleCancel = () => {
    if (goBack) {
      sethiden(false);
      navigate(getPageBack);
    } else {
      sethiden(false);
    }
  };

  return (
    hidden && (
      <StyledConfirm {...props}>
        <div className="blurer"></div>
        <div className="confirmator">
          <h2>
            ¿{t("are_you_sure_you_want_to")} {textValue}?
          </h2>
          <ButtonContainer $justifyContent="flex-start">
            <RegularButton
              $customBorder="1px solid var(--error-2)"
              $customBackground="var(--error-2)"
              $customHoverColor="var(--text-100-d)"
              $customHoverBackgroundColor="var(--error-1)"
              $customFocusBackground="var(--error-1)"
              $customActiveBackground="var(--error-2)"
              onClick={handleAccept}
              $customVerticalPadding=".3rem 1rem .3rem 1rem "
            >
              {t("yes")}
            </RegularButton>
            <RegularButton
              onClick={handleCancel}
              $customVerticalPadding=".3rem 1rem .3rem 1rem "
            >
              {t("no")}
            </RegularButton>
          </ButtonContainer>
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
  goBack: PropTypes.bool,
};
const StyledConfirm = styled.div`
  .blurer {
    position: ${(props) => props.$blurerPosition || "fixed"};
    left: ${(props) => props.$blurerLeft || "0"};
    top: ${(props) => props.$blurerTop || "0"};
    width: ${(props) => props.$blurerWidth || "100%"};
    height: ${(props) => props.$blurerHeight || "100%"};
    opacity: ${(props) => props.$blurerOpacity || "0.6"};
    backdrop-filter: ${(props) => props.$blurerBackDropFilter || "blur(15px)"};
    background-color: ${(props) =>
      props.$blurerBackgroundColor || "transparent"};
    z-index: ${(props) => props.$blurerZindex || "3"};
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
    border: ${(props) => props.$customBorder || "2px solid var(--accent-100)"};
    border-radius: 10px;
    background: ${(props) => props.$customBackground || "var(--bg-200)"};
    position: fixed;
    z-index: 20;
    &[hidden] {
      display: none;
    }
    h2 {
      color: var(--text-200);
    }
  }
`;
