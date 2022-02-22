import styled, { css } from "styled-components";
import { COLORS } from "../../constants/style_guide";

export const ValueBox = styled.div`
  line-height: 0.75rem;
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
    font-style: italic;
  }
`;

export const Selector = styled.div`
  width: 40%;
  height: 100%;
  margin: auto;
  justify-content: space-around;
  text-align: left;
  label {
    padding: 0.5rem;
  }
  Select {
  }
`;

export const Label = styled.label`
  font-weight: bold;
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
  align-items: center;
  justify-content: center;
  .more-text-icon:hover {
    opacity: 0.7;
  }
  .more-text-icon {
    margin: 1rem;
  }
`;

export const Row = styled.div`
  display: flex;
  margin: 1rem;
  align-items: center;
  justify-content: space-around;
  .plotly {
    border: 5px solid ${COLORS.primary};
    border-top: 2px solid ${COLORS.highlight};
    background-color: ${COLORS.primary} !important;
    text {
      fill: #ffffff !important;
    }
    text-align: -webkit-center;
  }

  .bar-chart {
    width: 125%;
  }
  ${Label} {
    margin: 0;
    color: #fff;

    ${Title} {
      margin: 0;
    }
  }
  ${Selector} {
    width: 100%;
    margin: 4rem !important;
    padding: 2rem;
  }
`;

export const Column = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.primary};
  height: 100%;
  margin: 1rem;
  border-top: 2px solid ${COLORS.highlight};
  }
`;

export const Nav = styled.nav`
  background-color: ${COLORS.primary};
  border-top: 2px solid ${COLORS.highlight};
  //  height: 64px;
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
  h1 {
    color: #fff;
    text-align: left;
    padding-left: 1rem;
    margin-top: auto;
  }
  svg {
    margin-top: auto;
    color: white;
    height: 100%;
    padding-left: 1rem;
    width: unset;
  }
  .svg-inline--fa.fa-w-14 {
    width: 3rem;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 1rem;
  }
`;

export const LeftAlign = styled.div`
  display: inline-flex;
`;

export const Center = styled.div`
  display: inline-flex;
  h2 {
    color: #fff;
    margin-top: auto;
  }
  width: 33%;
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
    color: #ffffff !important;
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
`;

export const MenuDiv = styled.div`
  padding: 1rem;
  background: ${COLORS.primary};
  border-top: 2px solid ${COLORS.highlight};
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 4rem;
  // transform: translate3d(-100vw, 0, 0);
  width: 20vw;
  height: 100vh;
  display: ${(props) => (props.show ? "block" : "none")};
  ${Selector} {
    width: 100%;
    height: min-content;
    ${Label} {
      color: #fff;
    }
  }
  ${Label} {
    color: #fff;
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
    color: #ffffff;
    margin: 0 -1rem;
    padding: 0.6rem 1rem;
    text-decoration: none;
    position: relative;
    display: flex;
    align-items: center;
  }

  nav a:hover {
    color: ${COLORS.third_highlight};
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
  color: #fff;
  padding: 1rem;
`;

export const FAQBox = styled.div`
  line-height: 1.5rem;
  color: #fff;
  border: 5px solid ${COLORS.primary};
  border-top: 2px solid ${COLORS.highlight};
  border-top: 2px
  border-radius: 5px;
  width: 75%;
  padding: .5rem;
  text-align: left;
  background-color: ${COLORS.primary};

  h4 {
    padding-top: 0.25rem;
    margin-bottom: 1rem;
    font-style: italic;
  }
`;
