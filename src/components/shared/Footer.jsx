import './Footer.css';
import styled from "styled-components";

import { useTranslation } from 'react-i18next';
import StyledContainer from './StyledContainer';
import Logo from './Logo';
import LanguageSwitcher from './localization/LanguageSwitcher';
import { RegularButton } from './buttons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeartLink from './HeartLink';
import EmailLink from './EmailLink';
import { getLoggedUserName } from '../../store/selectors';
import { useState } from 'react';
import { logout } from '../../pages/auth/service';
import { resetLoggedUserInfo } from '../../store/authSlice';
import { resetSinglePublicProfile } from '../../store/singlePublicProfileSlice';
import { resetUI } from '../../store/uiSlice';
import Confirmator from './Confirmator';
import DropdownLink from './DropdownLink';

const Footer = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.authState.authState);
    const loggedUser = useSelector(getLoggedUserName);
    const [showConfirmator, setShowConfirmator] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        logout();
        navigate('/');
        dispatch(resetLoggedUserInfo());
        dispatch(resetSinglePublicProfile());
        dispatch(resetUI());
    };
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
    const { t } = useTranslation();
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
    return (
        <>
            {showConfirmator && (
                <Confirmator
                    textValue={t('confirm_logout')}
                    onConfirm={handleLogout}
                    sethiden={() => setShowConfirmator(false)}
                    hidden={showConfirmator}
                    $blurerBackgroundColor='var(--primary-200)'
                    $blurerHeight='150%'
                    $customBorder='1px solid var(--primary-300)'
                    $customBackground='var(--bg-100)'
                />
            )}
            
            <DownButtons className='buttonsContinerMobile' s>
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

                        <LanguageSwitcher flag />

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
                                    state: { from: location },
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
            </DownButtons>

            <Footer className='footer'>
                <StyledContainer
                    $customDisplay='flex'
                    $customFlexDirection='row'
                >
                    <StyledContainer
                        $customDisplay='flex'
                        $customJustifyContent='center'
                        $customWidth='20%'
                    >
                        <Logo
                            $CustomWidth='100%'
                            $customImageWidth='70%'
                            $customImageHeight='70%'
                            $dark
                        />
                    </StyledContainer>
                    <StyledContainer className='footer-container'>
                        <p>
                            &copy; 2024 Byte Bandits.{' '}
                            {t('footer.rightsReserved')}
                        </p>
                        <ul className='footer-links'>
                            <li>
                                <a href='/about'>{t('footer.aboutUs')}</a>
                            </li>
                            <li>
                                <a href='/contact'>{t('footer.contact')}</a>
                            </li>
                            <li>
                                <a href='/privacy'>
                                    {t('footer.privacyPolicy')}
                                </a>
                            </li>
                            <li>
                                <a href='/terms'>
                                    {t('footer.termsOfService')}
                                </a>
                            </li>
                        </ul>
                        <div className='social-icons'>
                            <a
                                href='https://twitter.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {t('footer.social.twitter')}
                            </a>
                            <a
                                href='https://facebook.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {t('footer.social.facebook')}
                            </a>
                            <a
                                href='https://instagram.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {t('footer.social.instagram')}
                            </a>
                        </div>
                    </StyledContainer>
                </StyledContainer>
            </Footer>
        </>
    );
};

export default Footer;

const DownButtons = styled.div`
    display: none;
        justify-content: space-between;


@media (max-width: 800px) {
        position: sticky;
        bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 10px;
    
}`;

