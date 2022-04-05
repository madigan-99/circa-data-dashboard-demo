import styled, { css } from "styled-components";
import { COLORS, FONTS, FONT_SIZE } from "../../constants/style_guide";

export const ValueBox = styled.div`
  color: #fff;
  border: 5px solid ${COLORS.primary};
  border-top: 2px solid ${COLORS.highlight};
  border-top: 2px
  border-radius: 5px;
  width: 20%;
  min-width: max-content;
  padding: .5rem;
  background-color: ${COLORS.primary};
  h4 {
    padding-top: 0.25rem;
    margin-bottom: 0;
    font-family: ${FONTS.main};
    font-size: ${FONT_SIZE.subtitle};
    
  }
  h2 {
    font-family: ${FONTS.secondary};
    font-size: ${FONT_SIZE.header};
  }
  h5 {
    font-family: ${FONTS.secondary};
    font-size: ${FONT_SIZE.regular}
  }
`;

export const Selector = styled.div`
  // width: 40%;
  // height: 100%;
  margin: auto;
  justify-content: space-around;
  text-align: left;
  label {
    padding: 0.5rem;
  }
  .selector-options {
    font-family: ${FONTS.main};
  }
  .selector-options__menu {
    font-family: ${FONTS.detail} !important;
    z-index: 1000 !important;
  }
  .selector-options__single-value {
    font-family: ${FONTS.detail} !important;
  }
`;

export const Label = styled.label`
  // font-weight: bold;
  font-size: 1rem;
  h1 {
    font-size: 1rem;
    display: inline;
    margin: 0;
  }
  margin: 0;
`;

export const Title = styled.div`
  display: flex;
  margin: 1.5rem;
  align-items: left;
  justify-content: left;
  font-family: ${FONTS.secondary};
  text-transform: uppercase;
  font-size: ${FONT_SIZE.header};

  .more-text-icon:hover {
    opacity: 0.7;
  }
  .more-text-icon {
    font-size: 1.25rem;
    margin-left: 0.5rem;
    // margin: 1rem;
  }
`;

export const Row = styled.div`
  display: flex;
  margin: 1rem;
  align-items: center;
  justify-content: space-around;
  font-family: ${FONTS.secondary};
  // .plotly {
  //   border: 5px solid ${COLORS.primary};
  //   border-top: 2px solid ${COLORS.highlight};
  //   background-color: ${COLORS.primary} !important;
  //   text {
  //     fill: #ffffff !important;
  //     font-family: ${FONTS.main} !important;
  //     text-transform: capitalize !important;
  //   }
  //   text-align: -webkit-center;
  //   .g-gtitle .gtitle {
  //     font-family: ${FONTS.secondary};
  //     font-size: ${FONT_SIZE.subtitle} !important;
  //   }
  //   .slice:first-of-type .slicetext {
  //     text-transform: uppercase !important;
  //   }
  //   .surface {
  //     fill: #07efc3 !important;
  //     fill-opacity: 50% !important;
  //   }
  // }

  // .bar-chart {
  //   width: 125%;
  // }
  // ${Label} {
    margin: 0;
    color: #fff;

    ${Title} {
      margin: 0;
      font-family: ${FONTS.main} !important;
    }
  }
  ${Selector} {
    ${Label} {
      margin: 0;
      color: #fff;
    }  
    width: 100%;
    margin: 4rem !important;
    padding: 2rem;
    color: ${COLORS.black};
    .selector-cutom > .selector-options {
      font-family: ${FONTS.main};
      z-index: 1000;
      color: ${COLORS.black};
    }
    .selector-options__option {
      font-family: ${FONTS.main};
      z-index: 1000;
      color: ${COLORS.black};
    }
  }
  #react-3-select-listbox {
    z-index: 1000;
    font-family: ${FONTS.detail};
    color: ${FONTS.black}
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 560px !important;
  align-items: center;
  background: ${(props) =>
    props.isFAQ ? COLORS.main_background : COLORS.primary};
  // height: 100%;
  margin: 1rem;
  border-top: 2px solid ${COLORS.highlight};
  min-width: 40%;
  .plotly {
    // border: 5px solid ${COLORS.primary};
    // border-top: 2px solid ${COLORS.highlight};
    // background-color: ${COLORS.primary} !important;
    text {
      fill: #ffffff !important;
      font-family: ${FONTS.main} !important;
      text-transform: capitalize !important;
    }
    text-align: -webkit-center;
    .g-gtitle .gtitle {
      font-family: ${FONTS.secondary};
      font-size: ${FONT_SIZE.subtitle} !important;
    }
    .slice:first-of-type .slicetext {
      text-transform: uppercase !important;
    }
    .surface {
      fill: #07efc3 !important;
      fill-opacity: 50% !important;
    }
  }
  justify-content: space-evenly;
`;

export const HeaderItem = styled.div`
  display: inline-flex;
  width: 33%;
  img {
    height: 70px;
  }
  h2 {
    color: #fff;
    margin-top: auto;
  }
`;

export const Nav = styled.nav`
  background-color: ${COLORS.primary};
  border-top: 2px solid ${COLORS.highlight};
  //  height: 64px;
  align-items: center;
  margin-bottom: 0;
  padding: 0;
  padding-bottom: 0.5rem;
  width: 100%;
  display: flex;
  margin-top: 0;
  display: inline-flex;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  justify-content: space-between;
  font-family: ${FONTS.main};
  h1 {
    color: #fff;
    text-align: left;
    padding-left: 1rem;
    margin-top: auto;
    font-size: ${FONT_SIZE.header};
    text-transform: uppercase;
    text-decoration: none;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    opacity: 0.7;
  }
  svg {
    margin-top: auto;
    color: white;
    height: 100%;
    padding-left: 1rem;
    width: unset;
  }
  .svg-inline--fa.fa-w-14 {
    width: 2rem;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 1rem;
  }
  ${HeaderItem}:nth-child(2) {
    justify-content: center;
  }
  ${HeaderItem}:nth-child(3) {
    justify-content: end;
  }
`;

export const SideNav = styled.div`
  margin: 0;
  display: none;
`;

export const Table = styled.table`
  height: min-content;
  overflow-y: scroll;
  position: relative;
  color: #ffffff !important;
  td {
    color: ${COLORS.white} !important;
    text-align: left;
    font-family: ${FONTS.detail};
    font-size: ${FONT_SIZE.regular};
  }
  th {
    font-family: ${FONTS.main};
    font-size: ${FONT_SIZE.regular};
    text-transform: uppercase;
  }
`;

export const TableWrapper = styled.div`
  height: 25rem;
  overflow-y: scroll;
  width: 95%;
  position: relative;
  margin-top: 2rem;
  color: #fff;
`;

export const PseudoCarbon = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem;
`;

export const MenuDiv = styled.div`
  padding: 1rem;
  background: #c4c4c4;
  // border-top: 2px solid ${COLORS.highlight};
  border-right: 1px solid ${COLORS.primary};
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 6rem;
  width: 20vw;
  height: 100vh;
  display: ${(props) => (props.show ? "block" : "none")};
  #react-3-select-listbox {
    z-index: 1000;
    font-family: ${FONTS.detail};
  }
  . ${Selector} {
    width: 100%;
    height: min-content;
    ${Label} {
      color: ${COLORS.black};
      font-family: ${FONTS.main};
      text-transform: uppercase;
    }
  }
  ${Label} {
    color: ${COLORS.black};
    font-family: ${FONTS.main};
    text-transform: uppercase;
    text-align: left;
    width: 100%;
    ${Title} {
      margin: 0.25em;
      text-align: left;
      font-family: ${FONTS.main} !important;
    }
  }

  hr {
    border: 2px solid ${COLORS.primary};
  }

  button {
    background: none;
    border: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }

  nav {
    display: flex;
    flex-direction: column;
  }

  nav a {
    color: ${COLORS.primary};
    margin: 0 -1rem;
    padding: 0.6rem 1rem;
    text-decoration: none;
    position: relative;
    display: flex;
    align-items: center;
    font-family: ${FONTS.main};
    font-size: ${FONT_SIZE.regular};
    text-transform: uppercase;
    font-weight: bold;
  }

  nav a:hover {
    color: ${COLORS.third_highlight};
  }
  .btn-group {
    font-family: ${FONTS.detail} !important;
  }
`;

export const BodyContainer = styled.div`
  position: inherit;
  transform: ${(props) =>
    props.show ? "translate3d(20vw, 0, 0) " : "translate3d(0, 0, 0)"};
  margin-top: 5rem;
  overflow-x: hidden;
  z-index: -1000;
`;

export const FAQTitle = styled.div`
  color: ${COLORS.primary};
  font-family: ${FONTS.secondary};
  padding: 1rem;
`;

export const FAQBox = styled.div`
  line-height: 1.5rem;
  // border: 5px solid ${COLORS.primary};
  border-top: 2px solid ${COLORS.primary};

  width: 75%;
  padding: 0.5rem;
  text-align: left;
  background-color: ${COLORS.main_background};
  color: ${COLORS.primary};
  h4 {
    padding-top: 0.25rem;
    margin-bottom: 1rem;
    font-family: ${FONTS.main};
    font-size: ${FONT_SIZE.subtitle};
    text-transform: capitalize;
  }
  p {
    font-family: ${FONTS.detail};
    font-size: ${FONT_SIZE.regular};
  }
`;

export const CarbonSet = styled.div`
  display: block;
  width: 20%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.main_background};
  height: 100%;
  margin: 1rem;
  border-top: 2px solid ${COLORS.highlight};
  button {
    font-family: ${FONTS.main};
    font-size: ${FONT_SIZE.regular};
    background-color: ${COLORS.primary};
    border: 1px solid ${COLORS.primary};
  }
`;

export const Footer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  // background-color: ${COLORS.main_background};
  text-align: right;
  padding: 1%;
`;
