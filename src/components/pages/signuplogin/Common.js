import styled from "styled-components";


export const FormControlDiv = styled.form`
    width:100%;
    display:flex;
    flex-direction:column;
    
    justify-content:center;
    align-items:center;
    row-gap:2vh;
`;

export const Input = styled.input`
    
    outline:none;
    width:70%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 10px 10px;
    border-bottom: 0.1rem solid #4158D0;
    transition:all,250ms ease-in-out;
    font-size: 1rem;

    ::-webkit-input-placeholder {
    /* Chrome */
    color: gray;
    opacity:0.9;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: gray;
    opacity: 0.9;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: gray;
    opacity: 0.9;
  }
  :-moz-placeholder {
    /* Firefox 4 - 18 */
    color: gray;
    opacity: 0.9;
  }

  ${'' /* &:not(:last-of-type) {
    border-bottom: 0.1rem solid #8ec5fc;
  } */}

  &:focus {
    
    outline: none;
    border-bottom: 0.3rem solid #C850C0;
    
  }

`;

// background-color: #4158D0;
//   background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);


export const Submit = styled.button`
  width: 50%;
  padding: 15px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);

  &:hover {
    opacity:0.8;
    
  }

`;

export const MutedLink = styled.button`
    border:none;
    background:transparent;
    cursor:pointer;
    text-decoration: none;
    color:#4158D0;
    font-size:;

    &:hover{
        opacity:0.8;
    }
`;