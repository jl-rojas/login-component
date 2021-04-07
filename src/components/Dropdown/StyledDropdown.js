import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const Activator = styled.button`
    align-items: center;
    background-color: inherit;
    border: 1px solid #D8DCE6;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    display: flex;
    font-size: inherit;
    margin: 0px;
    min-width: 171px;
    padding: 5px 0px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;

    .activator-img-profile{
        border-radius: 100%;
        object-fit: cover;
        height: 28px;
        width: 28px;
    }

    .activator-text{
        margin-left: 10px;
    }
    .activator-icon{
        height: 16px;
        margin-left: auto;
    }
`;

export const ItemsContainer = styled.ul`
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    background: #FFFFFF;
    border: 1px solid #EAEDF3;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    color: black;
    display: none;
    margin: 0;
    padding: 0;
    position: absolute;
    margin-top: 8px;
    /* min-width: 160px; */

    width: 310px;
    right: 0px;
    &.active {
        display: block;
    }
    .title {
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      text-transform: uppercase;
      color: #9EA0A5;
    }

    .company-settings, .user-settings{
      display: flex;
      justify-content: space-between;
      width: 80%;
    }
    
    .user-settings{
      width: 100%;
    }

    .your-apps{
      padding: 20px 30px;
      border-bottom: 1px solid #EAEDF3;
    }

    .settings {
      padding: 26px 30px;
    }

    .docs {
      padding: 20px 30px;
      background: #FBFBFD;
      border-top: 1px solid #EAEDF3;
      display: flex;
      justify-content: space-between;
    }

    .apps-container {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      background: linear-gradient(270deg, rgba(102, 102, 102, 0.24) 0%, rgba(255, 255, 255, 0) 20%);
    }
`;