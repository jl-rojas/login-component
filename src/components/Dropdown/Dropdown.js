import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {
  Paragraph,
  Spacer,
  Button,
  Anchor,
} from '@jp-olvera/jp-viaducto-components';
import { Activator, Wrapper, ItemsContainer } from './StyledDropdown';
import AppWidget from '../AppWidget';
import Icon from './sorting.svg';
import help from './help.svg';
import docs from './docs.svg';
import Logout from './logout.svg';

const Dropdown = ({ user, logout, info }) => {
  let SVG = () => (
    <>
      <img src={Logout} alt="" style={{ margin: '0 0 0 8px' }} />
    </>
  );
  const [isOpen, setIsOpen] = useState(false);
  const [apps, setApps] = useState([]);
  const activatorRef = useRef(null);
  const dropdownListRef = useRef(null);
  let colors = {
    default: 'transparent',
    click: 'transparent',
    hover: 'transparent',
  };
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };
  let Help = () => <img src={help} alt="" />;
  let Docs = () => <img src={docs} alt="" />;

  const clickOutsideHandler = (event) => {
    if (
      dropdownListRef.current.contains(event.target) ||
      activatorRef.current.contains(event.target)
    ) {
      return;
    }
    setIsOpen(false);
  };
  useEffect(() => {
    if (info !== null) {
      const { addOns, subscriptions } = info;
      var myApps = [];
      for (const sub of subscriptions) {
        for (const add of addOns) {
          for (const sub_add of sub.subscription.addons) {
            if (sub_add.id === add.id) {
              myApps.push({
                name: add.name,
                src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
                url: add.cf_site_url || 'https://www.google.com',
              });
            }
          }
        }
      }
      setApps(myApps);
    }
  }, [info]);
  useEffect(() => {
    if (isOpen) {
      if (dropdownListRef) {
        // dropdownListRef.current.querySelector('button').focus();
        // add some code
      }
      document.addEventListener('mouseup', clickOutsideHandler);
    } else {
      document.removeEventListener('mouseup', clickOutsideHandler);
    }
    // clean up on unmount
    return function cleanup() {
      document.removeEventListener('mouseup', clickOutsideHandler);
    };
  }, [isOpen]);

  const menuItems = apps.map((e, i) => (
    <AppWidget url={e.url} name={e.name} src={e.src} alt="" key={`app-${i}`} />
  ));

  return (
    <Wrapper>
      <Activator
        aria-haspopup="true"
        aria-controls="dropdown1"
        aria-selected="true"
        data-testid="dropdown-activator"
        onClick={clickHandler}
        ref={activatorRef}
      >
        <Spacer direction="horizontal" size="micro" />
        <img
          className="activator-img-profile"
          src={user.picture}
          alt=""
        />
        <Paragraph className="activator-text" size="sm" family="Roboto">
          {user.given_name}
        </Paragraph>
        <img className="activator-icon" src={Icon} alt="" />
        <Spacer direction="horizontal" size="sm" />
      </Activator>
      <ItemsContainer
        id="dropdown1"
        className={isOpen && 'active'}
        data-testid="dropdown-itemList"
        ref={dropdownListRef}
        aria-label="Configuraciones"
      >
        <div className="your-apps">
          <Paragraph
            size="xs"
            family="Roboto"
            color="mutedGray"
            bold="500"
            lineHeight="1.125"
          >
            <FormattedMessage id="titleYourApps" />
          </Paragraph>
          <Spacer size="sm" direction="vertical" />
          <div className="apps-container">
            <ScrollMenu data={menuItems} />
          </div>
        </div>
        <div className="settings">
          {user['http://localhost:3000/roles'][0] === 'Admin' && (
            <>
              <Paragraph
                size="xs"
                family="Roboto"
                color="mutedGray"
                bold="500"
                lineHeight="1.125"
              >
                <FormattedMessage id="titleCompanySettings" />
              </Paragraph>
              <div className="company-settings">
                <div>
                  <Paragraph lineHeight="1.9">
                    <Anchor
                      href="https://www.google.com"
                      target="_blank"
                      color="dark"
                      size="sm"
                      family="Roboto"
                      label={
                        <FormattedMessage
                          id="optionUserManagement"
                          textCompo
                        />
                      }
                    />
                  </Paragraph>
                  <Paragraph lineHeight="1.9">
                    <Anchor
                      href="https://www.google.com"
                      target="_blank"
                      color="dark"
                      size="sm"
                      family="Roboto"
                      label={
                        <FormattedMessage id="optionTeamMembers" />
                      }
                    />
                  </Paragraph>

                  <Paragraph lineHeight="1.9">
                    <Anchor
                      href="https://www.google.com"
                      target="_blank"
                      color="dark"
                      size="sm"
                      family="Roboto"
                      label={
                        <FormattedMessage id="optionRoadmap" />
                      }
                    />
                  </Paragraph>
                </div>
                <div>
                  <Paragraph lineHeight="1.9">
                    <Anchor
                      href="https://www.google.com"
                      target="_blank"
                      color="dark"
                      size="sm"
                      family="Roboto"
                      label={
                        <FormattedMessage id="optionBilling" />
                      }
                    />
                  </Paragraph>
                  <Paragraph lineHeight="1.9">
                    <Anchor
                      href="https://www.google.com"
                      target="_blank"
                      color="dark"
                      size="sm"
                      family="Roboto"
                      label={
                        <FormattedMessage id="optionPlugins" />
                      }
                    />
                  </Paragraph>
                </div>
              </div>
              <Spacer size="md" />
            </>
          )}
          <div>
            <Paragraph
              size="xs"
              family="Roboto"
              color="mutedGray"
              bold="500"
              lineHeight="1.125"
            >
              <FormattedMessage id="titleUserSettings" />
            </Paragraph>
            <Spacer size="sm" direction="vertical" />
          </div>
          <div className="user-settings">
            <Anchor
              label={<FormattedMessage id="optionYourProfile" />}
              color="dark"
              size="sm"
              family="Roboto"
              href="https://www.google.com"
              target="_blank"
            />

            <Anchor
              tabIndex="0"
              onClick={logout}
              icon={<SVG />}
              label={<FormattedMessage id="buttonLogout" />}
              color="dark"
              size="sm"
              family="Roboto"
            />
          </div>
        </div>
        <div className="docs">
          <Button
            label={<FormattedMessage id="optionHelp" />}
            colors={colors}
            icon={<Help />}
            size="small"
            alt=""
            lead={true}
          />
          <Button
            label={<FormattedMessage id="optionDocs" />}
            colors={colors}
            icon={<Docs />}
            size="small"
            alt=""
            lead={true}
          />
        </div>
      </ItemsContainer>
    </Wrapper>
  );
};

export default Dropdown;
