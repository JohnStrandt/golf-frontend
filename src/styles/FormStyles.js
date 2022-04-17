import styled from "styled-components";
import golfball_bg from '../images/golfball_bg.png';



export const LoginWrapper = styled.div`
  background-image: url(${golfball_bg});
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

`;

export const FormWrapper = styled.div`
  background-image: url(${golfball_bg});
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

`;


export const CustomForm = styled.div`
  position: relative;
  width: 95%;
  max-width: 380px;
  padding: 40px;
  background: rgba(0,0,0,0.7);
  border-radius: 10px;
  color: white;
  box-shadow: 0 15px 25px rgba(0,0,0,0.5);
  img {
    position: absolute;
    top:-50px;
    left: calc(50% - 50px); 
    width: 100px;
    background: rgba(255,255,255,0.8);
    border-radius: 50%;
  }
  h2 {
    text-align: center;
    letter-spacing: 1px;
    margin-bottom: 2rem;
    color: #ff652f;
  }
  .close {
    position: absolute;
    right: 1.5rem;
    top: 0.5rem;
    font-size: 3rem;
    font-weight: 900;
    text-decoration: none;
    color: inherit;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  `

export const CardButtons = styled.div`
  position: relative;
  display: flex;

`;

export const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  
  button {
    color: #ff652f;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
  }

`;

export const InputGroup = styled.div`
  position: relative;

  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 1rem;
    pointer-events: none;
    transition: .3s ease-out;
  }

  input {
    width: 100%;
    padding: 10px 0;
    font-size: 1rem;
    letter-spacing: 1px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background-color: transparent;
    color: inherit;

    &:focus + label,
    &:valid + label {
      transform: translateY(-18px);
      color: #ff652f;
      font-size: .8rem;
    }
  }

`;

export const SubmitButton = styled.button`

    display: block;
    margin-left: auto;
    border: none;
    outline: none;
    background: #ff652f;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

`;