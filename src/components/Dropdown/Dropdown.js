import React, { useState, useRef } from "react";

import { Activator, Wrapper, ItemsContainer } from "./StyledDropdown";
import { Paragraph } from '@jp-olvera/jp-viaducto-components'
import { LogoutButton } from '../Buttons';
import { Profile } from '../Buttons/StyledButton'
import AppWidget from '../AppWidget';
import Icon from './sorting.svg';

const Dropdown = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const activatorRef = useRef(null)
  const dropdownListRef = useRef(null)

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  //TODO: implementar esta función
  // const clickOutsideHandler = (event) => {
  // if (dropdownListRef.current.contains(event.target) || activatorRef.current.contains(event.target)) {
  //         return
  //     }
  // setIsOpen(false)
  // }

  //TODO: implementar el useEffect
  // crear el listener mouseup
  // limpiar el componente cuando se deje de usar
  //TODO: Revisar: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
  //TODO: Revisar: https://developer.mozilla.org/en-US/docs/Web/API/Event/type
  /**
  useEffect(() => {
        if (isOpen) {
            if (dropdownListRef) {
                dropdownListRef.current.querySelector('a').focus()
            }

            document.addEventListener('mouseup', clickOutsideHandler)
        } else {
            document.removeEventListener('mouseup', clickOutsideHandler)
        }

        // clean up on unmount
        return function cleanup () {
            document.removeEventListener("mouseup", clickOutsideHandler)
        }
    }, [isOpen])
   */

  return (
    <Wrapper>
      <Paragraph>
        asd
      </Paragraph>
      <Activator
        aria-haspopup="true"
        aria-controls="dropdown1"
        data-testid="dropdown-activator"
        onClick={clickHandler}
        ref={activatorRef}
      >
        <img className="activator-img-profile" src={user.picture} alt="" />
        <span className="activator-text">{user.given_name}</span>
        <img className="activator-icon" src={Icon} alt="" />
      </Activator>
      <ItemsContainer
        id="dropdown1"
        className={isOpen && 'active'}
        role="list"
        data-testid="dropdown-itemList"
        ref={dropdownListRef}
      >
        <div className="your-apps">
          <p className="title">your apps</p>
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
              <h1 className="title">company settings</h1>
              <div className="company-settings">
                <div>
                  <p>User Management</p>
                  <p>Team Members</p>
                  <p>Roadmap</p>
                </div>
                <div>
                  <p>Billing</p>
                  <p>Plugins</p>
                </div>
              </div>
            </>
          )}
          <h1 className="title">user settings</h1>
          <div className="user-settings">
            <Profile>Your Profile</Profile>
            <LogoutButton callback={logout} />
          </div>
        </div>
        <div className="docs"></div>
      </ItemsContainer>
    </Wrapper>
  );
};

export default Dropdown;
