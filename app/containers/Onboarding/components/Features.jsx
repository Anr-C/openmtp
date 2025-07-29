import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UsbIcon from '@material-ui/icons/Usb';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ViewListIcon from '@material-ui/icons/ViewList';
import SdStorageIcon from '@material-ui/icons/SdStorage';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import CollectionsIcon from '@material-ui/icons/Collections';
import Collapse from '@material-ui/core/Collapse';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import TabIcon from '@material-ui/icons/Tab';
import MemoryIcon from '@material-ui/icons/Memory';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import KeyboadShortcuts from '../../KeyboardShortcutsPage/components/KeyboadShortcuts';
import { styles } from '../styles/Features';
import { capitalize } from '../../../utils/funcs';
import { MTP_MODE } from '../../../enums';

class Features extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expansionPanel: {
        keyboardNavigation: false,
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

  render() {
    const { classes: styles, hideTitle } = this.props;
    const { expansionPanel } = this.state;

    const kalamLabel = capitalize(MTP_MODE.kalam);

    return (
      <div className={styles.root}>
        {hideTitle ? null : (
          <Typography
            variant="body1"
            className={styles.title}
            color="secondary"
          >
            功能
          </Typography>
        )}
        <List>
          <ListItem>
            <ListItemIcon>
              <UsbIcon />
            </ListItemIcon>
            <ListItemText
              primary="通过 USB 数据线连接"
              secondary="最高数据传输速率"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText
              primary="5-6 倍更快的文件复制速度"
              secondary={`设置 > '常规' 标签 > 'MTP 模式' > 选择 '${kalamLabel} 模式'`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText
              primary="深色主题模式"
              secondary="设置 > '常规' 标签 > '主题'"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FlipToBackIcon />
            </ListItemIcon>
            <ListItemText primary="从 macOS Finder 窗口拖放文件" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary="一次传输多个大于 4GB 的文件。" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <MemoryIcon />
            </ListItemIcon>
            <ListItemText primary="支持 Apple Silicon" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SmartphoneIcon />
            </ListItemIcon>
            <ListItemText primary={`支持 Garmin 设备`} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CameraRollIcon />
            </ListItemIcon>
            <ListItemText primary={`支持 Fujifilm 设备`} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText
              primary="在网格视图和列表视图之间选择"
              secondary="设置 > '文件管理器' 标签"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SettingsOverscanIcon />
            </ListItemIcon>
            <ListItemText
              primary="单窗格模式"
              secondary="设置 > '文件管理器' 标签 > '显示本地磁盘窗格'"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <TabIcon />
            </ListItemIcon>
            <ListItemText
              primary="标签布局"
              secondary="使用鼠标点击或键盘快捷键进行导航"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SdStorageIcon />
            </ListItemIcon>
            <ListItemText primary="在内部存储和 SD 卡之间选择" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <FlashOnIcon />
            </ListItemIcon>
            <ListItemText primary="自动设备检测（USB 热插拔）" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <HourglassFullIcon />
            </ListItemIcon>
            <ListItemText
              primary="在文件传输屏幕上显示整体进度"
              secondary="设置 > 文件管理器标签 > 启用 '在文件传输屏幕上显示整体进度'"
            />
          </ListItem>

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
              primary="键盘导航"
              secondary={
                !expansionPanel.keyboardNavigation
                  ? '点击此处查看键盘快捷键'
                  : '点击此处隐藏键盘快捷键'
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
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Features);
