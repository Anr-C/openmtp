import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { styles } from '../styles/ProgressBar';

class ProgressBar extends PureComponent {
  render() {
    const {
      classes: styles,
      bodyText1,
      bodyText2,
      trigger,
      titleText,
      fullWidthDialog,
      maxWidthDialog,
      progressValue,
      variant,
      helpText,
      children,
    } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        className={styles.root}
        open={trigger}
        fullWidth={fullWidthDialog}
        maxWidth={maxWidthDialog}
        aria-labelledby="progressbar-dialogbox"
      >
        <DialogTitle>
          <span className={styles.dialogTitleInnerWrapper}>
            <span className={styles.titleText}>{titleText}</span>
            {helpText && (
              <span>
                <Tooltip title={helpText}>
                  <LiveHelpIcon className={styles.helpText} />
                </Tooltip>
              </span>
            )}
          </span>
        </DialogTitle>

        <DialogContent>
          <DialogContentText className={styles.dialogContentTextTop}>
            {bodyText1}
          </DialogContentText>

          <LinearProgress
            color="secondary"
            variant={variant}
            value={progressValue}
          />

          <DialogContentText className={styles.dialogContentTextBottom}>
            {bodyText2}
          </DialogContentText>

          {children && <div className={styles.childrenWrapper}>{children}</div>}
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ProgressBar);
