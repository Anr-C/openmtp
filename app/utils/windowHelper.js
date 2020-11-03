import { BrowserWindow, remote } from 'electron';
import { getAppThemeModeSettings } from './theme';
import { getColorPalette } from '../containers/App/styles';

export const getMainWindowMainProcess = () => {
  const _mainWindow = BrowserWindow.getAllWindows();
  if (typeof _mainWindow === 'undefined' || _mainWindow === null) {
    return null;
  }

  return BrowserWindow.getAllWindows()[_mainWindow.length - 1];
};

export const getMainWindowRendererProcess = () => {
  const _mainWindow = remote.BrowserWindow.getAllWindows();
  if (typeof _mainWindow === 'undefined' || _mainWindow === null) {
    return null;
  }

  return remote.BrowserWindow.getAllWindows()[_mainWindow.length - 1];
};

export const getWindowBackgroundColor = () => {
  const appThemeMode = getAppThemeModeSettings();
  const { background } = getColorPalette({ appThemeMode });

  return background.paper;
};
