import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import BugReportIcon from '@material-ui/icons/BugReport';
import SystemUpdate from '@material-ui/icons/SystemUpdate';
import { styles } from '../styles/WhatsNew';
import { APP_NAME, APP_VERSION } from '../../../constants/meta';
import { isKalamModeSupported } from '../../../helpers/binaries';
import { MTP_MODE } from '../../../enums';

class WhatsNew extends PureComponent {
  render() {
    const isKalamModeDisabled = !isKalamModeSupported();
    const { classes: styles, hideTitle } = this.props;

    return (
      <div className={styles.root}>
        {hideTitle ? null : (
          <Typography
            variant="body1"
            className={styles.title}
            color="secondary"
          >
            {APP_NAME}-{APP_VERSION} 的新功能
          </Typography>
        )}

        <List>
          <ListItem>
            <ListItemIcon>
              <BugReportIcon htmlColor="#FF0000" />
            </ListItemIcon>
            <ListItemText primary="修复了导致数据传输速度缓慢的错误" />
          </ListItem>

          {isKalamModeDisabled && (
            <ListItem>
              <ListItemIcon>
                <SystemUpdate htmlColor="#fa4d0a" />
              </ListItemIcon>
              <ListItemText
                primary={`我们已正式停止对 macOS 10.13（OS X El High Sierra）及更低版本的 '${MTP_MODE.kalam}' 内核支持`}
                secondary={`然而，'${MTP_MODE.legacy}' MTP 模式将继续在这些过时的设备上工作`}
              />
            </ListItem>
          )}

          <ListItem>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="其他 UI 优化和性能改进" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(WhatsNew);
