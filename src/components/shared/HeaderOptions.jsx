import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";

const useHeaderOptions = ({ setShowConfirmator }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loggedUser = useSelector(getLoggedUserName);

  const dropdownOptions = [
    { text: t("user_zone"), to: `/${loggedUser}/info`, className: "UserZone" },
    {
      text: t("log_out"),
      onClick: () => {
        setShowConfirmator(true);
      },
      className: "Logout",
    },
  ];

  const TAG_OPTIONS = [
    {
      onClick: () => navigate("/"),
      className: "all",
      text: t("all_categories"),
    },
    {
      text: t("lifestyle"),
      to: `/product/?tags=lifestyle&sell=true`,
    },
    {
      text: t("mobile"),
      to: "/product/?tags=mobile&sell=true",
    },
    {
      text: t("motor"),
      to: "/product/?tags=motor&sell=true",
    },
    {
      text: t("work"),
      to: "/product/?tags=work&sell=true",
    },
    {
      text: t("others"),
      to: "/product/?tags=others&sell=true",
    },
  ];

  const FILTERS_OPTIONS = [
    {
      text: t("tags"),
      onClick: () => {},
    },
    {
      text: t("sell"),
      onClick: () => {},
    },
    {
      text: t("price"),
      onClick: () => {},
    },
    {
      text: t("order"),
      onClick: () => {},
    },
  ];

  return { dropdownOptions, TAG_OPTIONS, FILTERS_OPTIONS };
};

export default useHeaderOptions;
