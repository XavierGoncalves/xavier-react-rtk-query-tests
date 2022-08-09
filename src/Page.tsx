import React from 'react';
import Flex from '@cobalt/react-flex';
import { useTheme } from '@cobalt/react-theme-provider';

function Page({ children }) {
  return (
    <Flex direction="column" height="100%">
      {children}
    </Flex>
  );
}

function PageContent({ children }) {
  const theme = useTheme();

  return (
    <Flex direction="column" grow width="100%" backgroundColor={theme.gray100}>
      {children}
    </Flex>
  );
}

Page.Content = PageContent;

export default Page;
