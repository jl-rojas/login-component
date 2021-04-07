import React from "react";
import styled from "styled-components";

const Logo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 15px;
  object-fit: cover;
  opacity: ${(p) => (p.disabled ? 0.7 : 1)};
`;
const StyledSpan = styled.span`
  margin-top: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 18px;
  color: ${(p) => (p.disabled ? "#EFEFEF" : "#3E3F42")};
`;
const Wrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 19px;
`;
const AppWidget = ({ name, src, alt, disabled = false }) => {
  return (
    <Wrapper>
      <Logo src={src} alt={alt} disabled={disabled} />
      {!disabled && <StyledSpan disabled={disabled}>{name}</StyledSpan>}
    </Wrapper>
  );
};

export default AppWidget;
