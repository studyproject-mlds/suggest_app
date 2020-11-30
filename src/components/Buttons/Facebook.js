import styled from 'styled-components/native';
import React from 'react';

import Button from '@/components/Button';

const BtnFacebook = styled(Button)`
  width: 165px;
  height: 35px;
  border-radius: 4px;
  background: #3b5998;
  color: white;
  border: 0px transparent;
  text-align: center;
  margin: 5px;

  &:hover {
    background: #3b5998;
    opacity: 0.6;
  }
`;

export default ({}) => (
  <BtnFacebook>&nbsp;&nbsp;Sign In with Facebook </BtnFacebook>
);
