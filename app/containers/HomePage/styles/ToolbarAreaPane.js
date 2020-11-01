'use strict';

import styled, { keyframes } from 'styled-components';
import { variables, mixins } from '../../../styles/js';

export const styles = (theme) => {
  return {
    root: {
      ...mixins().appDragEnable,
    },
    grow: {
      flexGrow: 1,
    },
    toolbarInnerWrapper: {
      display: 'flex',
    },
    toolbar: {
      width: `auto`,
      height: variables().sizes.toolbarHeight,
    },
    lazyLoaderOverLay: {
      position: `absolute`,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `#ffffff`,
      zIndex: 9999,
    },
    appBar: {},
    navBtns: {
      paddingLeft: 5,
    },
    noAppDrag: {
      ...mixins().appDragDisable,
    },
    navBtnImgs: {
      height: 25,
      width: `auto`,
      ...mixins().noDrag,
      ...mixins().noselect,
    },
    disabledNavBtns: {
      backgroundColor: `#f9f9f9 !important`,
    },
    invertedNavBtns: {
      [`&:hover`]: {
        filter: `none`,
      },
      [`&:not(:hover)`]: {
        filter: `invert(100)`,
        background: variables().styles.primaryColor.main,
      },
    },
    focussedFileExplorer: {
      width: '100%',
      height: 5,
      marginTop: -5,
      overflow: 'hidden',
      background: 'rgba(0, 176, 255, 0.22)',
    },
  };
};

const animateLazyLoaderOverLay = keyframes`
  0% {
    opacity: 1;
    position: absolute;
  }
  100% {
    opacity: 0;
    top: -9999px;
    left: -9999px;
    display: none;
    position: unset;
    z-index: -9999;
  }
`;

export const LazyLoaderOverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 9999;

  animation: ${animateLazyLoaderOverLay} 0s 3s forwards;
`;
