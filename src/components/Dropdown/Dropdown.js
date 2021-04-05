import React, { useState } from "react";

import { Activator, Wrapper, ItemsContainer } from "./StyledDropdown";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };
  const items = [
    {
      url: "https://facebook.com", text: "Facebook"
    },
    {
      url: "https://facebook.com", text: "Facebook"
    },
    {
      url: "https://facebook.com", text: "Facebook"
    }
  ];
  return (
    <Wrapper>
      <Activator
        aria-haspopup="true"
        aria-controls="dropdown1"
        data-testid="dropdown-activator"
        onClick={clickHandler}
      >
        😎 Juan Pablo 🔽
      </Activator>
      <ItemsContainer
        id="dropdown1"
        className={isOpen && 'active'}
        role="list"
        data-testid="dropdown-itemList"
      >
        {items.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url}>{item.text}</a>
            </li>
          );
        })}
      </ItemsContainer>
    </Wrapper>
  );
};

export default Dropdown;
