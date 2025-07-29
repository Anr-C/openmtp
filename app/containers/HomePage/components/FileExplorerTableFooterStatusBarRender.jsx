import React, { PureComponent, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { styles } from '../styles/FileExplorerTableFooterStatusBarRender';
import { getPluralText } from '../../../utils/funcs';
import { DEVICE_TYPE } from '../../../enums';
import { DEVICES_LABEL } from '../../../constants';

class FileExplorerTableFooterStatusBarRender extends PureComponent {
  getDirectoryListStats = () => {
    const { directoryLists } = this.props;

    let directories = 0;
    let files = 0;

    (directoryLists.nodes || []).map((a) => {
      if (a.isFolder) {
        directories += 1;
      } else {
        files += 1;
      }

      return a;
    });

    const total = directories + files;

    return { total, directories, files };
  };

  getSelectedDirectoryStats = () => {
    const { directoryLists } = this.props;

    const total = directoryLists.queue.selected.length;

    return { total };
  };

  RenderDeviceName = () => {
    const { classes: styles, deviceType, mtpDevice } = this.props;

    if (deviceType === DEVICE_TYPE.local) {
      return (
        <Fragment>
          <FontAwesomeIcon icon={faLaptop} title={deviceType} />
          <span className={styles.deviceTypeWrapper}>
            {DEVICES_LABEL[deviceType]}
            <span> - </span>
          </span>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <FontAwesomeIcon icon={faMobile} title={deviceType} />
        <span className={styles.deviceTypeWrapper}>
          {mtpDevice?.isAvailable && mtpDevice?.info?.mtpDeviceInfo
            ? mtpDevice?.info?.mtpDeviceInfo?.Model
            : DEVICES_LABEL[deviceType]}
          <span> - </span>
        </span>
      </Fragment>
    );
  };

  render() {
    const { classes: styles, fileTransferClipboard } = this.props;

    const { directories, files, total } = this.getDirectoryListStats();
    const { total: selectedTotal } = this.getSelectedDirectoryStats();
    const fileTransferClipboardLength = fileTransferClipboard.queue.length;
    const { RenderDeviceName } = this;

    return (
      <div className={styles.root}>
        <Typography variant="caption" className={styles.bodyWrapper}>
          <RenderDeviceName />

          {selectedTotal > 0 ? (
            <Fragment>{`${selectedTotal} 个已选中，共 ${total} 个`}</Fragment>
          ) : (
            <Fragment>{`${total} ${getPluralText('项', total)} (${directories} ${getPluralText('目录', directories, '目录')}, ${files} ${getPluralText('文件', files)})`}</Fragment>
          )}
          {`, 剪贴板中有 ${fileTransferClipboardLength} ${getPluralText('项', fileTransferClipboardLength)}`}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(FileExplorerTableFooterStatusBarRender);
