// @flow

import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { connect } from 'react-redux';

import { StatusBar, View } from 'react-native';

import Main from '../components/Main';
import { loadTheme } from '../reducers/config';
import { setTheme } from '../actions';
import { DEFAULT_THEME } from '../utils/constants/defaults';
import type { State, ThemeObject } from '../utils/types';

const Root = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.base00};
`;

const StatusBarContainer = styled(View)`
  height: 22;
  background-color: ${({ theme }) => theme.base00};
`;

const StyledMain = styled(Main)`
  flex: 1;
`;

type Props = {
  setTheme: Function,
  theme: ThemeObject,
};

const App = ({ setTheme, theme }: Props) => {
  // TODO: Remove this
  setTheme(DEFAULT_THEME);

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <StatusBarContainer>
          <StatusBar
            backgroundColor={theme.base00}
            barStyle={theme.isDark ? 'light-content' : 'dark-content'}
          />
        </StatusBarContainer>

        <StyledMain />
      </Root>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ config }: State) => ({
  config,
  theme: loadTheme(config),
});

const mapDispatchToProps = {
  setTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);