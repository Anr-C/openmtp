import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import CheckIcon from '@material-ui/icons/Check';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import CachedIcon from '@material-ui/icons/Cached';
import UsbIcon from '@material-ui/icons/Usb';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import LockOpenIcon from '@material-ui/icons/Lock';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PowerIcon from '@material-ui/icons/Power';
import ReplayIcon from '@material-ui/icons/Replay';
import SystemUpdate from '@material-ui/icons/SystemUpdate';
import { styles } from '../styles/HelpPhoneNotRecognized';
import { openExternalUrl } from '../../../utils/url';
import {
  APP_GITHUB_ISSUES_URL,
  APP_NAME,
  APP_VERSION,
  AUTHOR_EMAIL,
} from '../../../constants/meta';
import { analyticsService } from '../../../services/analytics';
import { EVENT_TYPE } from '../../../enums/events';
import {
  BUY_ME_A_COFFEE_URL,
  DELETE_KEIS_SMARTSWITCH_URL,
  DEVICES_LABEL,
  SUPPORT_PAYPAL_URL,
} from '../../../constants';
import { DEVICE_TYPE, MTP_MODE } from '../../../enums';
import {
  localErrorDictionary,
  mtpErrors,
} from '../../../helpers/processBufferOutput';
import { MTP_ERROR } from '../../../enums/mtpError';
import { imgsrc } from '../../../utils/imgsrc';
import { helpPhoneNotConnecting } from '../../../templates/fileExplorer';
import { isKalamModeSupported } from '../../../helpers/binaries';

const hotplugSettingText = `Check if 'Enable auto device detection (USB Hotplug)' is enabled under Settings > General Tab`;
const deviceLabel = DEVICES_LABEL[DEVICE_TYPE.mtp];

class HelpPhoneNotRecognized extends PureComponent {
  _handleGithubThreadTap = (events) => {
    openExternalUrl(`${APP_GITHUB_ISSUES_URL}8`, events);

    analyticsService.sendEvent(
      EVENT_TYPE.MTP_HELP_PHONE_NOT_CONNECTED_GITHUB_THREAD_TAP,
      {}
    );
  };

  RenderFileTransfer = () => {
    const { classes: styles } = this.props;

    return (
      <>
        <ListItem>
          <ListItemIcon>
            <TouchAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="在您的设备上，点击“通过USB为此设备充电”的通知"
            secondary={
              <img
                src={imgsrc(`help/usb-notification-charging-via-usb.png`)}
                alt="通过USB充电"
                className={styles.imagePlaceholder}
              />
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <RadioButtonCheckedIcon />
          </ListItemIcon>
          <ListItemText
            primary="在“USB用途”中选择“文件传输”"
            secondary={
              <img
                src={imgsrc(`help/transfer-media-permission.png`)}
                alt="文件传输"
                className={styles.imagePlaceholder}
              />
            }
          />
        </ListItem>
      </>
    );
  };

  RenderRefreshButtonIsStuck = () => {
    const { classes: styles } = this.props;

    const { RenderFileTransfer } = this;

    return (
      <>
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
          <ListItemText
            primary={`请拔掉您的${deviceLabel.toLowerCase()}并重新连接`}
            secondary={`如果您的${deviceLabel.toLowerCase()}仍未被识别，请按照以下说明操作`}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <TouchAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="在您的设备上，点击“正在传输媒体文件”的通知"
            secondary={
              <img
                src={imgsrc(`help/usb-notification-transferring-media.png`)}
                alt="传输媒体文件"
                className={styles.imagePlaceholder}
              />
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <RadioButtonCheckedIcon />
          </ListItemIcon>
          <ListItemText
            primary="在“USB用途”中选择“充电”"
            secondary={
              <img
                src={imgsrc(`help/charge-only-permission.png`)}
                alt="仅充电"
                className={styles.imagePlaceholder}
              />
            }
          />
        </ListItem>

        <RenderFileTransfer />

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText
            primary="设备应会自动连接"
            secondary={hotplugSettingText}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CachedIcon />
          </ListItemIcon>
          <ListItemText
            primary={`如果${deviceLabel.toLowerCase()}未能自动连接，请点击应用中的“刷新”按钮`}
            secondary={hotplugSettingText}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <TouchAppIcon />
          </ListItemIcon>
          <ListItemText
            primary={`如果弹出“允许访问设备数据”窗口，请点击“允许”按钮`}
            secondary={
              <img
                src={imgsrc(`help/allow-data-access.png`)}
                alt="允许访问设备数据"
                className={styles.imagePlaceholder}
              />
            }
          />
        </ListItem>
      </>
    );
  };

  RenderBasicConnection = ({
    showUnplugPhone = true,
    showUnlockPhone = true,
  }) => {
    const { RenderFileTransfer } = this;

    return (
      <>
        {showUnlockPhone && (
          <ListItem>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary="请解锁您的安卓设备" />
          </ListItem>
        )}

        {showUnplugPhone && (
          <ListItem>
            <ListItemIcon>
              <UsbIcon />
            </ListItemIcon>
            <ListItemText
              primary={`请拔掉您的${deviceLabel.toLowerCase()}并重新连接`}
            />
          </ListItem>
        )}

        <RenderFileTransfer />

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText
            primary="设备应会自动连接"
            secondary={hotplugSettingText}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CachedIcon />
          </ListItemIcon>
          <ListItemText
            primary={`如果${deviceLabel.toLowerCase()}未能自动连接，请点击应用中的“刷新”按钮`}
            secondary={hotplugSettingText}
          />
        </ListItem>
      </>
    );
  };

  render() {
    const { classes: styles, showPhoneNotRecognizedNote } = this.props;
    const { RenderBasicConnection, RenderRefreshButtonIsStuck } = this;
    const isKalamModeDisabled = !isKalamModeSupported();

    return (
      <div className={styles.root}>
        <Paper elevation={0}>
          {showPhoneNotRecognizedNote && (
            <>
              <Typography component="p" variant="body2">
                <strong>{APP_NAME}</strong> 是一个我开始的项目，旨在解决一个对我个人非常重要的问题。但我一直知道，有一个社区也面临着与我相同的问题。
              </Typography>
              <Typography component="p" variant="body2" paragraph>
                我想我没有错。现在，我们是一个来自<strong>180多个国家</strong>的强大社区。看到大家对应用的反馈，不仅是赞赏，还有建议和改进意见，真的让人感到欣慰。
              </Typography>
              <Typography component="p" variant="body2">
                正如人们所说，为社区而建，从社区中学习。
              </Typography>
              <Typography component="p" variant="body2" paragraph>
                我阅读了您发送的每一条消息，并根据您的反馈不断改进应用。请继续发送更多的反馈 :)
              </Typography>
              <Typography component="p" variant="body2" paragraph>
                有些用户告诉我，某些手机（<i>主要是三星</i>）连接到 {APP_NAME} 时存在问题。我一直在努力通过迁移现有的 MTP 内核到更好的内核来解决这个问题。
              </Typography>
              <Typography component="p" variant="body2" paragraph>
                您可以通过以下方式与我联系：
                <a
                  href={`mailto:${AUTHOR_EMAIL}?Subject=${helpPhoneNotConnecting}&Body=${APP_NAME} - ${APP_VERSION}`}
                >
                  {AUTHOR_EMAIL}
                </a>
                或查看此
                <a onClick={this._handleGithubThreadTap}>GitHub 线程</a>
                ，以跟踪问题，
                <i>共同协作，让这个社区变得更大更强</i>！
              </Typography>
              <Typography component="p" variant="body2" paragraph>
                如果您想支持我的工作或请我喝杯咖啡，可以通过以下方式捐赠：Paypal：
                <a
                  onClick={(events) => {
                    openExternalUrl(SUPPORT_PAYPAL_URL, events);
                  }}
                >
                  {SUPPORT_PAYPAL_URL}
                </a>
                或 Buy me a coffee：
                <a
                  onClick={(events) => {
                    openExternalUrl(BUY_ME_A_COFFEE_URL, events);
                  }}
                >
                  {BUY_ME_A_COFFEE_URL}
                </a>
                。
              </Typography>
              <Typography component="p" variant="h6" paragraph>
                常见问题
              </Typography>
            </>
          )}

          {isKalamModeDisabled && (
            <Accordion className={styles.expansionRoot}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={styles.heading}>
                  {`升级您的 macOS 版本以获得更好的应用体验`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component="div" disablePadding>
                  <ListItem>
                    <ListItemIcon>
                      <SystemUpdate />
                    </ListItemIcon>
                    <ListItemText
                      primary={`我们已正式停止对 macOS 10.13（OS X El High Sierra）及更低版本的 '${MTP_MODE.kalam}' 内核支持。只有 '${MTP_MODE.legacy}' 模式会继续在这些旧设备上工作。`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <SystemUpdate />
                    </ListItemIcon>
                    <ListItemText
                      primary={`只有最新的 3 个 macOS 版本会收到 '${MTP_MODE.kalam}' 内核更新，包括新设备支持、修复和稳定性提升。`}
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion className={styles.expansionRoot}>
            {/* <----- my device is not connecting -----> */}

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我的 ${deviceLabel.toLowerCase()} 无法连接`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <CloseIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`退出 Google Drive、Android 文件传输、Dropbox、OneDrive、预览（macOS Ventura）或任何可能读取 USB 的应用程序`}
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
                    primary={`如果设备频繁断开连接，请关闭“USB 热插拔”功能`}
                    secondary={`设置 > 常规选项卡`}
                  />
                </ListItem>

                <RenderBasicConnection />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- Google drive is interfering with OpenMTP-----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我在 ${DEVICES_LABEL[DEVICE_TYPE.local]} 上安装了 Google Drive`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`最新版 Google Drive 可能会干扰 ${APP_NAME}。只需退出 Google Drive 应用程序可能会解决此问题`}
                    secondary={
                      <img
                        src={imgsrc(`help/google-drive-not-connecting.png`)}
                        alt="文件和文件夹"
                        className={styles.imagePlaceholder}
                      />
                    }
                  />
                </ListItem>

                <RenderBasicConnection />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- Dropbox is interfering with OpenMTP-----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我在 ${DEVICES_LABEL[DEVICE_TYPE.local]} 上安装了 Dropbox`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`最新版 Dropbox 可能会干扰 ${APP_NAME}。只需退出 Dropbox 应用程序可能会解决此问题`}
                  />
                </ListItem>

                <RenderBasicConnection />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- The app goes blank while trying to connect a Samsung device -----> */}

          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`应用在尝试连接三星设备时变为空白`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="卸载 Samsung SmartSwitch（如果已安装）"
                    secondary={
                      <a
                        onClick={(events) => {
                          openExternalUrl(DELETE_KEIS_SMARTSWITCH_URL, events);
                        }}
                      >
                        如何从 MacBook 中删除 Samsung SmartSwitch 和驱动程序
                      </a>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <ReplayIcon />
                  </ListItemIcon>
                  <ListItemText primary={`重新启动 ${APP_NAME}`} />
                </ListItem>

                <RenderBasicConnection />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- i keep seeing setting up device -----> */}

          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我总是看到 "${mtpErrors[[MTP_ERROR.ErrorDeviceSetup]]}"`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List component="div" disablePadding>
                <RenderBasicConnection />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- i keep seeing allow storage access -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我总是看到 "${
                  mtpErrors[[MTP_ERROR.ErrorAllowStorageAccess]]
                }"`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="请解锁您的安卓设备" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TouchAppIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`如果弹出“允许访问设备数据”窗口，请点击“允许”按钮`}
                    secondary={
                      <img
                        src={imgsrc(`help/allow-data-access.png`)}
                        alt="允许访问设备数据"
                        className={styles.imagePlaceholder}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`如果您没有看到“允许访问设备数据”的弹出窗口，请重新连接您的${deviceLabel.toLowerCase()}`}
                    secondary={`如果您的${deviceLabel.toLowerCase()}仍未被识别，请按照以下说明操作`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`如果系统提示您多次“允许访问设备数据”，请重新连接您的${deviceLabel.toLowerCase()}并重试`}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- Allow access to the device data" multiple times -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我被多次提示 "允许访问设备数据"`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <RenderRefreshButtonIsStuck />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- refresh button is stuck -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`刷新按钮卡住了`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <RenderRefreshButtonIsStuck />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- i keep seeing multiple devices error -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我总是看到 "${
                  mtpErrors[[MTP_ERROR.ErrorMultipleDevice]]
                }"`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary="拔掉所有MTP设备" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <UsbIcon />
                  </ListItemIcon>
                  <ListItemText primary="插入您的MTP设备" />
                </ListItem>

                <RenderBasicConnection showUnplugPhone={false} />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- phone gets disconnected everytime screen goes into sleep -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`每当屏幕进入睡眠状态时，我的 ${deviceLabel.toLowerCase()} 就会断开连接`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`在极少数情况下，当您的 ${deviceLabel.toLowerCase()} 处于睡眠状态时，可能会断开连接。这可能会干扰任何正在进行的文件传输`}
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
                    <RadioButtonCheckedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`打开${deviceLabel.toLowerCase()}的设置 > 显示 > 睡眠，并将其设置为30分钟或更长时间`}
                    secondary={
                      <img
                        src={imgsrc(`help/sleep-setting.jpg`)}
                        alt="睡眠设置"
                        className={styles.imagePlaceholder}
                      />
                    }
                  />
                </ListItem>

                <RenderBasicConnection showUnlockPhone={false} />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- i keep seeing quit android file transfer error -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我总是看到 "退出 'Android File Transfer' 应用（由 Google 提供）并刷新"`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="退出并卸载谷歌的'Android File Transfer'应用" />
                </ListItem>

                <RenderBasicConnection showUnplugPhone={false} />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- my phone is still not detected -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我的手机仍然无法连接`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="卸载 Samsung SmartSwitch（如果已安装）"
                    secondary={
                      <a
                        onClick={(events) => {
                          openExternalUrl(DELETE_KEIS_SMARTSWITCH_URL, events);
                        }}
                      >
                        如何从 MacBook 中删除 Samsung SmartSwitch 和驱动程序
                      </a>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <PowerIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="尝试更改MTP模式"
                    secondary={`设置 > 标签 > 更改“MTP模式”`}
                  />
                </ListItem>

                <RenderBasicConnection />
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- Operation not permitted error -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我每次尝试打开本地磁盘窗格中的文件夹时都看到 "${localErrorDictionary.noPerm}" 错误`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <FolderSpecialIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`macOS 需要您提供对文档、桌面、下载和废纸篓文件夹、iCloud Drive、第三方云存储提供商的文件夹、可移动媒体和外部驱动器的访问权限`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <ThumbUpIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`如果在尝试打开文件夹时看到 "${APP_NAME} 想要访问您在..." 的弹出窗口，请点击 "确定" 按钮`}
                    secondary={
                      <img
                        src={imgsrc(`help/macos-directory-access.jpg`)}
                        alt="Directory access permission prompt"
                        className={styles.imagePlaceholder}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`如果您不断收到 "${localErrorDictionary.noPerm}" 错误，则可能需要通过 "系统偏好设置" 中的 "安全性与隐私" 来授予对这些文件夹的访问权限`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`打开 macOS "系统偏好设置" > "安全性与隐私" > "隐私" 标签`}
                    secondary={`点击 "点击锁定以进行更改" 按钮并进行身份验证`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`在左侧窗格中找到 "文件和文件夹" 选项，选择它。在右侧窗格中找到 "${APP_NAME}"`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`标记您希望授予 ${APP_NAME} 访问权限的所有文件夹`}
                    secondary={
                      <img
                        src={imgsrc(
                          `help/privacy-restricted-folder-access.png`
                        )}
                        alt="文件与文件夹"
                        className={styles.imagePlaceholder}
                      />
                    }
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* <----- Full disk access -----> */}
          <Accordion className={styles.expansionRoot}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.heading}>
                {`我仍然无法访问本地磁盘窗格中的某些文件夹`}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <FolderSpecialIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`macOS 需要您提供对文档、桌面、下载和废纸篓文件夹、iCloud Drive、第三方云存储提供商的文件夹、可移动媒体和外部驱动器的访问权限`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`如果您仍然不断收到 "${localErrorDictionary.noPerm}" 错误，则可以通过 "系统偏好设置" 中的 "安全性与隐私" 授予 "完全磁盘访问" 权限`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`打开 macOS "系统偏好设置" > "安全性与隐私" > "隐私" 标签`}
                    secondary={`点击 "点击锁定以进行更改" 按钮并进行身份验证`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`在左侧窗格中找到 "完全磁盘访问" 选项，选择它。在右侧窗格中找到 "${APP_NAME}"`}
                    secondary={
                      <img
                        src={imgsrc(`help/full-disk-access.png`)}
                        alt="文件与文件夹"
                        className={styles.imagePlaceholder}
                      />
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`如果您在列表中找不到 ${APP_NAME}，请点击 "+" 按钮，并通过导航到 "应用程序" 文件夹来选择 "${APP_NAME}"`}
                    secondary={
                      <img
                        src={imgsrc(`help/full-disk-access-file-picker.jpeg`)}
                        alt="文件与文件夹"
                        className={styles.imagePlaceholder}
                      />
                    }
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(HelpPhoneNotRecognized);
