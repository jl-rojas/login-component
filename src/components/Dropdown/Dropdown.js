import React, { useState, useRef, useEffect } from "react";
import { FormattedMessage } from 'react-intl';
import { Paragraph, Spacer, Button } from '@jp-olvera/jp-viaducto-components'

import { Activator, Wrapper, ItemsContainer } from "./StyledDropdown";
import { LogoutButton } from '../Buttons';
import AppWidget from '../AppWidget';
import Icon from './sorting.svg';
import help from './help.svg';
import docs from './docs.svg';

const Dropdown = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activatorRef = useRef(null);
  const dropdownListRef = useRef(null);
  let colors = {
    default: "transparent",
    click: "transparent",
    hover: "transparent",
  };
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };
  let Help = () => <img src={help} alt="" />;
  let Docs = () => <img src={docs} alt="" />;

  const clickOutsideHandler = (event) => {
    if (dropdownListRef.current.contains(event.target) || activatorRef.current.contains(event.target)) {
      return
    }
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      if (dropdownListRef) {
        // dropdownListRef.current.querySelector('button').focus();
        // add some code
      }

      document.addEventListener('mouseup', clickOutsideHandler)
    } else {
      document.removeEventListener('mouseup', clickOutsideHandler)
    }

    // clean up on unmount
    return function cleanup() {
      document.removeEventListener("mouseup", clickOutsideHandler)
    }
  }, [isOpen])


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
        <img className="activator-img-profile" src={user.picture} alt="" />
        <Paragraph
          className="activator-text"
          size="sm"
          family="Roboto"
        >
          {user.given_name}
        </Paragraph>
        <img className="activator-icon" src={Icon} alt="" />
        <Spacer direction="horizontal" size="sm" />
      </Activator>
      <ItemsContainer
        id="dropdown1"
        className={isOpen && 'active'}
        role="list"
        data-testid="dropdown-itemList"
        ref={dropdownListRef}
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
          <Spacer size="sm" direction='vertical' />
          <div className="apps-container">
            <AppWidget src="https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg" alt="" name="porkscore" />
            <AppWidget disabled src="https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg" alt="" name="porkscore" />
            <AppWidget src="https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg" alt="" name="porkscore" />
            <AppWidget src="https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg" alt="" name="porkscore" />
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
                  <Paragraph
                    size="sm"
                    family="Roboto"
                    lineHeight="1.9"
                  >
                    <FormattedMessage id="optionUserManagement" />
                  </Paragraph>
                  <Paragraph
                    size="sm"
                    family="Roboto"
                    lineHeight="1.9"
                  >
                    <FormattedMessage id="optionTeamMembers" />
                  </Paragraph>
                  <Paragraph
                    size="sm"
                    family="Roboto"
                    lineHeight="1.9"
                  >
                    <FormattedMessage id="optionRoadmap" />
                  </Paragraph>
                </div>
                <div>
                  <Paragraph
                    size="sm"
                    family="Roboto"
                    lineHeight="1.9"
                  >
                    <FormattedMessage id="optionBilling" />
                  </Paragraph>
                  <Paragraph
                    size="sm"
                    family="Roboto"
                    lineHeight="1.9"
                  >
                    <FormattedMessage id="optionPlugins" />
                  </Paragraph>
                </div>
              </div>
              <Spacer size="md" />
            </>
          )}
          <Paragraph
            size="xs"
            family="Roboto"
            color="mutedGray"
            bold="500"
            lineHeight="1.125"
          >
            <FormattedMessage id="titleUserSettings" />
          </Paragraph>
          <div className="user-settings">
            <Button label={<FormattedMessage id="optionYourProfile" />} size="small" alt="" colors={colors} />
            <LogoutButton callback={logout} />
          </div>
        </div>
        <div className="docs">
          <Button label={<FormattedMessage id="optionHelp" />} colors={colors} icon={<Help />} size="small" alt="" />
          <Button label={<FormattedMessage id="optionDocs" />} colors={colors} icon={<Docs />} size="small" alt="" />
        </div>
      </ItemsContainer>
    </Wrapper >
  );
};

export default Dropdown;
