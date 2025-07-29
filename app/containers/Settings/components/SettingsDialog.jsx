import React, { PureComponent } from 'react';
import { ipcRenderer } from 'electron';
import electronIs from 'electron-is';
import classNames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DEVICES_LABEL } from '../../../constants';
import SettingsDialogTabContainer from './SettingsDialogTabContainer';
import {
  DEVICE_TYPE,
  FILE_EXPLORER_VIEW_TYPE,
  APP_THEME_MODE_TYPE,
  MTP_MODE,
  FILE_TRANSFER_DIRECTION,
} from '../../../enums';
import { capitalize, isPrereleaseVersion } from '../../../utils/funcs';
import { IpcEvents } from '../../../services/ipc-events/IpcEventType';
import { isKalamModeSupported } from '../../../helpers/binaries';

const isMas = electronIs.mas();

export default class SettingsDialog extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
    };

    this.isMasHidePosition = 1;
  }

  _handleTabChange = (event, index) => {
    this.setState({
      tabIndex: index,
    });
  };

  shoudThisTabHeadRender = (position) => {
    return !(isMas && this.isMasHidePosition === position);
  };

  tabBodyRenderTabIndex = (position) => {
    if (isMas && this.isMasHidePosition === position) {
      return null;
    }

    if (isMas && position > this.isMasHidePosition) {
      return position - 1 < 1 ? 0 : position - 1;
    }

    return position;
  };

  render() {
    const {
      open,
      freshInstall,
      hideHiddenFiles,
      fileExplorerListingType,
      appThemeMode,
      styles,
      enableAutoUpdateCheck,
      enableBackgroundAutoUpdate,
      enablePrereleaseUpdates,
      enableAnalytics,
      enableStatusBar,
      showLocalPane,
      showLocalPaneOnLeftSide,
      showDirectoriesFirst,
      mtpMode,
      filesPreprocessingBeforeTransfer,
      onAnalyticsChange,
      onHiddenFilesChange,
      onFileExplorerListingType,
      onDialogBoxCloseBtnClick,
      onAutoUpdateCheckChange,
      onEnableBackgroundAutoUpdateChange,
      onPrereleaseUpdatesChange,
      onStatusBarChange,
      onAppThemeModeChange,
      onShowLocalPaneChange,
      onShowLocalPaneOnLeftSideChange,
      onShowDirectoriesFirstChange,
      onMtpModeChange,
      onFilesPreprocessingBeforeTransferChange,
      onEnableUsbHotplug,
      enableUsbHotplug,
    } = this.props;

    const { tabIndex } = this.state;

    const hideHiddenFilesLocal = hideHiddenFiles[DEVICE_TYPE.local];
    const hideHiddenFilesMtp = hideHiddenFiles[DEVICE_TYPE.mtp];

    const fileExplorerListingTypeLocalGrid =
      fileExplorerListingType[DEVICE_TYPE.local] ===
      FILE_EXPLORER_VIEW_TYPE.grid;
    const fileExplorerListingTypeMtpGrid =
      fileExplorerListingType[DEVICE_TYPE.mtp] === FILE_EXPLORER_VIEW_TYPE.grid;

    const showMtpModeSelection = isKalamModeSupported();

    return (
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        aria-labelledby="settings-dialogbox"
        disableEscapeKeyDown={false}
        onEscapeKeyDown={() =>
          onDialogBoxCloseBtnClick({
            confirm: false,
          })
        }
      >
        <Typography variant="h5" className={styles.title}>
          设置
        </Typography>
        <DialogContent>
          <Tabs
            className={styles.tabHeadingWrapper}
            value={tabIndex}
            onChange={this._handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {this.shoudThisTabHeadRender(0) && (
              <Tab label="常规" className={styles.tab} />
            )}
            {this.shoudThisTabHeadRender(1) && (
              <Tab label="文件管理器" className={styles.tab} />
            )}
            {this.shoudThisTabHeadRender(2) && (
              <Tab label="更新" className={styles.tab} />
            )}
            {this.shoudThisTabHeadRender(3) && (
              <Tab label="隐私" className={styles.tab} />
            )}
          </Tabs>

          {/* ----- General Tab ----- */}
          <FormControl component="fieldset" className={styles.fieldset}>
            {tabIndex === this.tabBodyRenderTabIndex(0) && (
              <SettingsDialogTabContainer>
                <div className={styles.tabContainer}>
                  <FormGroup>
                    <Typography variant="subtitle2" className={styles.subtitle}>
                      主题
                    </Typography>
                    <RadioGroup
                      aria-label="app-theme-mode"
                      name="app-theme-mode"
                      value={appThemeMode}
                      onChange={onAppThemeModeChange}
                    >
                      <FormControlLabel
                        value={APP_THEME_MODE_TYPE.light}
                        control={<Radio />}
                        label="浅色"
                      />
                      <FormControlLabel
                        value={APP_THEME_MODE_TYPE.dark}
                        control={<Radio />}
                        label="深色"
                      />
                      <FormControlLabel
                        value={APP_THEME_MODE_TYPE.auto}
                        control={<Radio />}
                        label="自动"
                      />
                    </RadioGroup>

                    {showMtpModeSelection && (
                      <>
                        <Typography
                          variant="subtitle2"
                          className={`${styles.subtitle}  ${styles.fmSettingsStylesFix}`}
                        >
                          MTP 模式
                        </Typography>
                        <RadioGroup
                          aria-label="app-theme-mode"
                          name="app-theme-mode"
                          value={mtpMode}
                          onChange={(e, value) =>
                            onMtpModeChange(e, value, DEVICE_TYPE.mtp)
                          }
                        >
                          <FormControlLabel
                            value={MTP_MODE.kalam}
                            control={<Radio />}
                            label={capitalize(MTP_MODE.kalam)}
                          />
                          <FormControlLabel
                            value={MTP_MODE.legacy}
                            control={<Radio />}
                            label={capitalize(MTP_MODE.legacy)}
                          />
                        </RadioGroup>
                      </>
                    )}

                    <Typography
                      variant="subtitle2"
                      className={`${styles.subtitle} ${styles.fmSettingsStylesFix}`}
                    >
                      启用自动设备检测（USB 热插拔）
                    </Typography>
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={enableUsbHotplug}
                          onChange={(e) =>
                            onEnableUsbHotplug(e, !enableUsbHotplug)
                          }
                        />
                      }
                      label={enableUsbHotplug ? `已启用` : `已禁用`}
                    />
                  </FormGroup>
                </div>
              </SettingsDialogTabContainer>
            )}

            {/* ----- File Manager Tab ----- */}
            {tabIndex === this.tabBodyRenderTabIndex(1) && (
              <SettingsDialogTabContainer>
                <div className={styles.tabContainer}>
                  <FormGroup>
                    <Typography variant="subtitle2" className={styles.subtitle}>
                      显示隐藏文件
                    </Typography>
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={!hideHiddenFilesLocal}
                          onChange={(e) =>
                            onHiddenFilesChange(
                              e,
                              !hideHiddenFilesLocal,
                              DEVICE_TYPE.local
                            )
                          }
                        />
                      }
                      label={DEVICES_LABEL[DEVICE_TYPE.local]}
                    />
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={!hideHiddenFilesMtp}
                          onChange={(e) =>
                            onHiddenFilesChange(
                              e,
                              !hideHiddenFilesMtp,
                              DEVICE_TYPE.mtp
                            )
                          }
                        />
                      }
                      label={DEVICES_LABEL[DEVICE_TYPE.mtp]}
                    />

                    <Typography
                      variant="subtitle2"
                      className={`${styles.subtitle} ${styles.fmSettingsStylesFix}`}
                    >
                      以网格形式查看
                    </Typography>
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={fileExplorerListingTypeLocalGrid}
                          onChange={(e) =>
                            onFileExplorerListingType(
                              e,
                              fileExplorerListingTypeLocalGrid
                                ? FILE_EXPLORER_VIEW_TYPE.list
                                : FILE_EXPLORER_VIEW_TYPE.grid,
                              DEVICE_TYPE.local
                            )
                          }
                        />
                      }
                      label={DEVICES_LABEL[DEVICE_TYPE.local]}
                    />
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={fileExplorerListingTypeMtpGrid}
                          onChange={(e) =>
                            onFileExplorerListingType(
                              e,
                              fileExplorerListingTypeMtpGrid
                                ? FILE_EXPLORER_VIEW_TYPE.list
                                : FILE_EXPLORER_VIEW_TYPE.grid,
                              DEVICE_TYPE.mtp
                            )
                          }
                        />
                      }
                      label={DEVICES_LABEL[DEVICE_TYPE.mtp]}
                    />

                    <Typography
                      variant="subtitle2"
                      className={`${styles.subtitle} ${styles.fmSettingsStylesFix}`}
                    >
                      在文件传输屏幕上显示整体进度
                    </Typography>
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={
                            filesPreprocessingBeforeTransfer[
                              FILE_TRANSFER_DIRECTION.download
                            ]
                          }
                          onChange={(e) =>
                            onFilesPreprocessingBeforeTransferChange(
                              e,
                              !filesPreprocessingBeforeTransfer[
                                FILE_TRANSFER_DIRECTION.download
                              ],
                              FILE_TRANSFER_DIRECTION.download
                            )
                          }
                        />
                      }
                      label={`到 ${DEVICES_LABEL[DEVICE_TYPE.local]}`}
                    />
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={
                            filesPreprocessingBeforeTransfer[
                              FILE_TRANSFER_DIRECTION.upload
                            ]
                          }
                          onChange={(e) =>
                            onFilesPreprocessingBeforeTransferChange(
                              e,
                              !filesPreprocessingBeforeTransfer[
                                FILE_TRANSFER_DIRECTION.upload
                              ],
                              FILE_TRANSFER_DIRECTION.upload
                            )
                          }
                        />
                      }
                      label={`到 ${DEVICES_LABEL[DEVICE_TYPE.mtp]}`}
                    />

                    {freshInstall ? (
                      <Paper
                        className={`${styles.onboardingPaper}`}
                        elevation={0}
                      >
                        <Typography
                          component="p"
                          className={`${styles.onboardingPaperBody}`}
                        >
                          <span className={`${styles.onboardingPaperBodyItem}`}>
                            &#9679;&nbsp;使用开关启用或禁用项目。
                          </span>
                          <span className={`${styles.onboardingPaperBodyItem}`}>
                            &#9679;&nbsp;向下滚动以查看更多设置。
                          </span>
                        </Typography>
                      </Paper>
                    ) : null}

                    <Typography variant="caption">
                      注意：为了获取总传输信息，文件需要先进行处理。根据要复制的文件总数，这可能需要几秒到几分钟的时间。
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      className={`${styles.subtitle} ${styles.fmSettingsStylesFix}`}
                    >
                      首先显示目录
                    </Typography>
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={showDirectoriesFirst}
                          onChange={(e) =>
                            onShowDirectoriesFirstChange(
                              e,
                              !showDirectoriesFirst
                            )
                          }
                        />
                      }
                      label={showDirectoriesFirst ? `已启用` : `已禁用`}
                    />

                    <Typography
                      variant="subtitle2"
                      className={`${styles.subtitle} ${styles.fmSettingsStylesFix}`}
                    >
                      显示状态栏
                    </Typography>
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={enableStatusBar}
                          onChange={(e) =>
                            onStatusBarChange(e, !enableStatusBar)
                          }
                        />
                      }
                      label={enableStatusBar ? `已启用` : `已禁用`}
                    />

                    <Typography
                      variant="subtitle2"
                      className={`${styles.subtitle} ${styles.fmSettingsStylesFix}`}
                    >
                      显示本地磁盘窗格
                    </Typography>
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={showLocalPane}
                          onChange={(e) =>
                            onShowLocalPaneChange(e, !showLocalPane)
                          }
                        />
                      }
                      label={showLocalPane ? `已启用` : `已禁用`}
                    />
                    <Typography variant="caption">
                      注意：您可以将文件从 Finder 拖到移动窗格中，但不能反过来。
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      className={`${styles.subtitle} ${styles.fmSettingsStylesFix}`}
                    >
                      在左侧显示本地磁盘窗格
                    </Typography>
                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={showLocalPaneOnLeftSide}
                          onChange={(e) =>
                            onShowLocalPaneOnLeftSideChange(
                              e,
                              !showLocalPaneOnLeftSide
                            )
                          }
                        />
                      }
                      label={showLocalPaneOnLeftSide ? `已启用` : `已禁用`}
                    />
                  </FormGroup>
                </div>
              </SettingsDialogTabContainer>
            )}

            {/* ----- Updates Tab ----- */}

            {tabIndex === this.tabBodyRenderTabIndex(2) && (
              <SettingsDialogTabContainer>
                <div className={styles.tabContainer}>
                  <FormGroup>
                    <Typography variant="subtitle2" className={styles.subtitle}>
                      自动检查更新
                    </Typography>

                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={enableAutoUpdateCheck}
                          onChange={(e) =>
                            onAutoUpdateCheckChange(e, !enableAutoUpdateCheck)
                          }
                        />
                      }
                      label={enableAutoUpdateCheck ? `已启用` : `已禁用`}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Typography variant="subtitle2" className={styles.subtitle}>
                      自动下载新更新（推荐）
                    </Typography>

                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={enableBackgroundAutoUpdate}
                          disabled={!enableAutoUpdateCheck}
                          onChange={(e) =>
                            onEnableBackgroundAutoUpdateChange(
                              e,
                              !enableBackgroundAutoUpdate
                            )
                          }
                        />
                      }
                      label={
                        enableBackgroundAutoUpdate ? `已启用` : `已禁用`
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Typography
                      variant="subtitle2"
                      className={`${styles.subtitle} ${styles.subtitleMarginFix}`}
                    >
                      启用测试版更新频道
                    </Typography>

                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={enablePrereleaseUpdates}
                          disabled={isPrereleaseVersion()}
                          onChange={(e) =>
                            onPrereleaseUpdatesChange(
                              e,
                              !enablePrereleaseUpdates
                            )
                          }
                        />
                      }
                      label={enablePrereleaseUpdates ? `已启用` : `已禁用`}
                    />
                  </FormGroup>
                  <Typography variant="caption">
                    提前访问即将推出的功能，但可能会导致崩溃。
                  </Typography>
                </div>
              </SettingsDialogTabContainer>
            )}

            {/* ----- Privacy Tab ----- */}

            {tabIndex === this.tabBodyRenderTabIndex(3) && (
              <SettingsDialogTabContainer>
                <div className={styles.tabContainer}>
                  <FormGroup>
                    <Typography variant="subtitle2" className={styles.subtitle}>
                      启用匿名使用统计信息收集
                    </Typography>

                    <FormControlLabel
                      className={styles.switch}
                      control={
                        <Switch
                          checked={enableAnalytics}
                          onChange={(e) =>
                            onAnalyticsChange(e, !enableAnalytics)
                          }
                        />
                      }
                      label={enableAnalytics ? `已启用` : `已禁用`}
                    />
                    <Typography variant="caption">
                      我们不会收集任何个人信息，也不会出售您的数据。我们仅使用此信息来改进用户体验并修复一些错误。&nbsp;
                      <a
                        className={styles.a}
                        onClick={() => {
                          ipcRenderer.send(IpcEvents.OPEN_HELP_PRIVACY_POLICY_WINDOW);
                        }}
                      >
                        了解更多...
                      </a>
                    </Typography>
                  </FormGroup>
                </div>
              </SettingsDialogTabContainer>
            )}
          </FormControl>

          <FormControl component="fieldset" className={styles.fieldset} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              onDialogBoxCloseBtnClick({
                confirm: false,
              })
            }
            color="primary"
            className={classNames(styles.btnPositive)}
          >
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
