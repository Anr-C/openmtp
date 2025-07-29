import React, { PureComponent } from 'react';
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import StarRateIcon from '@material-ui/icons/StarRate';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import UsbIcon from '@material-ui/icons/Usb';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CachedIcon from '@material-ui/icons/Cached';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { styles } from '../styles/FileExplorerTableBodyEmptyRender';
import KeyboadShortcuts from '../../KeyboardShortcutsPage/components/KeyboadShortcuts';
import Features from '../../Onboarding/components/Features';
import { helpPhoneNotConnecting } from '../../../templates/fileExplorer';
import { analyticsService } from '../../../services/analytics';
import { EVENT_TYPE } from '../../../enums/events';
import { IpcEvents } from '../../../services/ipc-events/IpcEventType';
import { APP_NAME } from '../../../constants/meta';
import { openExternalUrl } from '../../../utils/url';

class FileExplorerTableBodyEmptyRender extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expansionPanel: {
        noMtpInstructions: true,
        keyboardNavigation: false,
        features: false,
      },
    };
  }

  _handleExpansionPanel = ({ key }) => {
    this.setState((prevState) => {
      return {
        expansionPanel: {
          ...prevState.expansionPanel,
          [key]: !prevState.expansionPanel[key],
        },
      };
    });
  };

  _handleHelpPhoneNotRecognizedBtn = () => {
    ipcRenderer.send(IpcEvents.OPEN_HELP_PHONE_NOT_CONNECTING_WINDOW);

    analyticsService.sendEvent(
      EVENT_TYPE.MTP_HELP_PHONE_NOT_CONNECTED_DIALOG_OPEN,
      {}
    );
  };

  render() {
    const {
      classes: styles,
      mtpDevice,
      isMtp,
      currentBrowsePath,
      deviceType,
      directoryLists,
      onContextMenuClick,
    } = this.props;

    const { expansionPanel } = this.state;

    const _eventTarget = 'emptyRowTarget';

    const tableData = {
      path: currentBrowsePath[deviceType],
      directoryLists: directoryLists[deviceType],
    };

    if (isMtp && !mtpDevice.isAvailable) {
      return (
        <TableRow className={styles.emptyTableRowWrapper}>
          <TableCell colSpan={6} className={styles.tableCell}>
            <Paper style={{ height: `100%` }} elevation={0}>
              <Button
                className={styles.helpPhoneNotRecognized}
                onClick={() => {
                  this._handleHelpPhoneNotRecognizedBtn();
                }}
              >
                {helpPhoneNotConnecting}
              </Button>

              <List>
                <ListItem
                  button
                  onClick={() =>
                    this._handleExpansionPanel({
                      key: 'noMtpInstructions',
                    })
                  }
                >
                  <ListItemIcon>
                    <WarningIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="安卓设备正忙或未连接"
                    secondary={
                      !expansionPanel.noMtpInstructions
                        ? '点击此处查看说明'
                        : '点击此处隐藏说明'
                    }
                  />
                  {expansionPanel.noMtpInstructions ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItem>
                <Collapse
                  in={expansionPanel.noMtpInstructions}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <div className={styles.nestedPanel}>
                      <ListItem>
                        <ListItemIcon>
                          <CloseIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="退出 Google Drive、Android 文件传输、Dropbox、OneDrive、预览（macOS Ventura）或任何可能读取 USB 的应用程序"
                          secondary={
                            <span>
                              {`如果每次连接安卓设备时都会弹出 Google 的“Android 文件传输”，请卸载该应用。最新版 Google Drive 和 Dropbox 可能会干扰 ${APP_NAME}，完全退出这些应用可能解决问题。`}
                              <a
                                onClick={(events) => {
                                  openExternalUrl(
                                    'https://github.com/ganeshrvel/openmtp/issues/276',
                                    events
                                  );
                                }}
                              >
                                阅读更多...
                              </a>
                            </span>
                          }
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <ToggleOffIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`如果您遇到设备频繁断开连接的问题，请关闭“USB 热插拔”功能`}
                          secondary={`设置 > 常规选项卡`}
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <LockOpenIcon />
                        </ListItemIcon>
                        <ListItemText primary="请解锁您的安卓设备" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <UsbIcon />
                        </ListItemIcon>
                        <ListItemText primary="使用 USB 数据线将设备连接到电脑" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TouchAppIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="在您的设备上，点击“通过USB为此设备充电”的通知"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RadioButtonCheckedIcon />
                        </ListItemIcon>
                        <ListItemText primary="在“USB用途”中选择“文件传输”" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CachedIcon />
                        </ListItemIcon>
                        <ListItemText primary="点击上方的“刷新”按钮" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PermDeviceInformationIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="如果您尝试连接三星设备，请在手机中接受“允许访问设备数据”的确认弹窗"
                          secondary="再次点击“刷新”按钮。如果仍无效，请重新连接手机并重复上述步骤"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SettingsInputHdmiIcon />
                        </ListItemIcon>
                        <ListItemText primary="重新连接数据线并重复上述步骤，如果您仍然看到此消息" />
                      </ListItem>
                    </div>
                  </List>
                </Collapse>

                <Divider className={styles.divider} />

                <ListItem
                  button
                  onClick={() =>
                    this._handleExpansionPanel({
                      key: 'keyboardNavigation',
                    })
                  }
                >
                  <ListItemIcon>
                    <KeyboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="键盘快捷键"
                    secondary={
                      expansionPanel.keyboardNavigation
                        ? '点击此处隐藏快捷键'
                        : '点击此处查看快捷键'
                    }
                  />
                  {expansionPanel.keyboardNavigation ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItem>
                <Collapse
                  in={expansionPanel.keyboardNavigation}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem>
                      <div className={styles.nestedPanel}>
                        <KeyboadShortcuts />
                      </div>
                    </ListItem>
                  </List>
                </Collapse>

                <Divider className={styles.divider} />

                <ListItem
                  button
                  onClick={() =>
                    this._handleExpansionPanel({
                      key: 'features',
                    })
                  }
                >
                  <ListItemIcon>
                    <StarRateIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="功能"
                    secondary={
                      expansionPanel.features
                        ? '点击此处隐藏可用功能'
                        : '点击此处查看可用功能'
                    }
                  />
                  {expansionPanel.features ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItem>
                <Collapse
                  in={expansionPanel.features}
                  timeout="auto"
                  unmountOnExit
                >
                  <div className={styles.nestedPanel}>
                    <Features hideTitle />
                  </div>
                </Collapse>
              </List>
            </Paper>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow className={styles.emptyTableRowWrapper}>
        <TableCell
          colSpan={6}
          className={styles.tableCell}
          onContextMenu={(event) =>
            onContextMenuClick(event, {}, { ...tableData }, _eventTarget)
          }
        />
      </TableRow>
    );
  }
}

export default withStyles(styles)(FileExplorerTableBodyEmptyRender);
