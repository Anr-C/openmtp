/* keymaps must be in lowercase */
import { IS_DEV } from './env';

export const fileExplorerKeymaps = {
  newFolder: {
    label: `New Folder`,
    keys: ['command+n'],
  },
  copy: {
    label: `Copy`,
    keys: ['command+c'],
  },
  copyToQueue: {
    label: `Copy to Queue`,
    keys: ['command+shift+c'],
  },
  paste: {
    label: `Paste`,
    keys: ['command+v'],
  },
  delete: {
    label: `Delete`,
    keys: ['backspace', 'delete'],
  },
  refresh: {
    label: `Refresh`,
    keys: IS_DEV ? ['command+alt+r'] : ['command+r'],
  },
  up: {
    label: `Folder Up`,
    keys: ['command+b'],
  },
  selectAll: {
    label: `Select All`,
    keys: ['command+a'],
  },
  rename: {
    label: `Rename`,
    keys: ['command+d'],
  },
  open: {
    label: `Open`,
    keys: ['enter'],
  },
  fileExplorerTabSwitch: {
    label: `Switch Tab`,
    keys: ['command+1'],
  },
  navigationLeft: {
    label: `Navigate Left`,
    keys: ['left'],
  },
  navigationRight: {
    label: `Navigate Right`,
    keys: ['right'],
  },
  navigationUp: {
    label: `Navigate Up`,
    keys: ['up'],
  },
  navigationDown: {
    label: `Navigate Down`,
    keys: ['down'],
  },
  multipleSelectLeft: {
    label: `Select Multiple Files Forward (for Grid view)`,
    keys: ['shift+left'],
  },
  multipleSelectRight: {
    label: `Select Multiple Files Backward (for Grid view)`,
    keys: ['shift+right'],
  },
  multipleSelectUp: {
    label: `Select Multiple Files Forward (for List view)`,
    keys: ['shift+up'],
  },
  multipleSelectDown: {
    label: `Select Multiple Files Backward (for List view)`,
    keys: ['shift+down'],
  },
  multipleRangeSelectClick: {
    label: `Select Range of Files (using mouse)`,
    keys: ['shift+click'],
  },
  multipleSelectClick: {
    label: `Select Multiple Files (using mouse)`,
    keys: ['command+click'],
  },
};
