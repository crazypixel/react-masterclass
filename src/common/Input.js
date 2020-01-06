import React from 'react';
import styled from 'styled-components';

const Input = ({onKeyUp}) => (<Container onKeyUp={onKeyUp}/>);

export default Input;

const Container = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #979797;
  box-sizing: border-box;
  transition: all 300ms;
  padding-left: 15px;
  font-size: 14px;
  
  &:focus {
  	outline: none;
  	border-color: #444;
  }
`;
