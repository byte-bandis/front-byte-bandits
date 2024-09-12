import styled from 'styled-components';
import LanguageSwitcher from './localization/LanguageSwitcher';
import EmailLink from './EmailLink';
import HeartLink from './HeartLink';
import DropdownLink from './DropdownLink';
import { RegularButton } from './buttons';
import { useSelector } from 'react-redux';
import { getLoggedUserName } from '../../store/selectors';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const ButtonsComponent = ({ navigate, setShowConfirmator, ...props }) => {
    const isAuthenticated = useSelector((state) => state.authState.authState);
    const loggedUser = useSelector(getLoggedUserName);
    const { t } = useTranslation();
    const { $CustomDisplay, ClassName } = props;
    const dropdownOptions = [
        {
            text: t('user_zone'),
            to: `/${loggedUser}/info`,
            className: 'UserZone',
        },
        {
            text: t('log_out'),
            onClick: () => {
                setShowConfirmator(true);
            },
            className: 'Logout',
        },
    ];

    const handleSellButton = () => {
        if (isAuthenticated) {
            navigate(`${loggedUser}/new`);
        } else {
            navigate('/login', {
                replace: true,
                state: { from: `/new` },
            });
        }
    };

    return (
        <StyledButtonComponet
            className={ClassName}
            $CustomDisplay={$CustomDisplay}
        >
            {isAuthenticated ? (
                <>
                    <HeartLink
                        to={'/myaccount'}
                        size={30}
                        $CustomMargin='0'
                        className='heartHead'
                    />
                    <EmailLink
                        to={`/${loggedUser}/chat`}
                        $CustomMargin='0'
                        size={35}
                        className='emailHead'
                    />

                    <LanguageSwitcher className='languageSwitcher' flag />

                    <DropdownLink
                        options={dropdownOptions}
                        className='myAccount'
                        $CustomWidth='120px'
                    >
                        {t('user_zone')}
                    </DropdownLink>

                    <RegularButton
                        onClick={handleSellButton}
                        className='sellButton'
                        $variant='attention'
                        $customVerticalPadding='5px 50px'
                    >
                        {t('sell')}
                    </RegularButton>
                </>
            ) : (
                //No authenticated
                <>
                    <LanguageSwitcher $gap='5px' flag />
                    <RegularButton
                        onClick={() =>
                            navigate('/login', {
                                replace: true,
                            })
                        }
                        className='login'
                        $backgroundColor='var(--primary-200)'
                    >
                        {t('login_register')}
                    </RegularButton>
                    <RegularButton
                        onClick={handleSellButton}
                        className='sellButton'
                        $variant='attention'
                        $customVerticalPadding='5px 50px'
                    >
                        {t('sell')}
                    </RegularButton>
                </>
            )}
            <div className='background'></div>
        </StyledButtonComponet>
    );
};

ButtonsComponent.propTypes = {
    navigate: PropTypes.func,
    setShowConfirmator: PropTypes.func,
    $CustomDisplay: PropTypes.string,
    ClassName: PropTypes.string,
};
export default ButtonsComponent;

const StyledButtonComponet = styled.div`
    display: ${(props) => props.$CustomDisplay || 'flex'};
    gap: 10px;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    justify-content: right;

    &.buttonsContinerMobile {
        display: none;
    }
    @media (max-width: 800px) {
        &.buttonsContinerMobile {
            position: sticky;
            margin: auto;
            width: 100%;
            background-color: var(--bg-100);
            padding: 10px 10px;
            bottom: 0;
            display: flex;
            gap: 10px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .sellButton,
            .myAccount {
                
                padding: 5px 5px;
                .languageSwitcher {
                    width: fit-content;
                    gap: 0px;
                }
            }
        }
        display: none;
    }
`;
