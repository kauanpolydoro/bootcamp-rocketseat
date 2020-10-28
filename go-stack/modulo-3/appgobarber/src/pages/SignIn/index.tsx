import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => (
  <Container>
    <Image source={logoImg} />
  </Container>
);

export default SignIn;
