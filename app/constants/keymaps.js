/* keymaps must be in lowercase */
import { IS_DEV } from './env';

export const fileExplorerKeymaps = {
  newFolder: {
    label: `新建文件夹`,
    keys: ['command+n'],
  },
  copy: {
    label: `复制`,
    keys: ['command+c'],
  },
  copyToQueue: {
    label: `加入复制队列`,
    keys: ['command+shift+c'],
  },
  paste: {
    label: `粘贴`,
    keys: ['command+v'],
  },
  delete: {
    label: `删除`,
    keys: ['backspace', 'delete'],
  },
  refresh: {
    label: `刷新`,
    keys: IS_DEV ? ['command+alt+r'] : ['command+r'],
  },
  up: {
    label: `上一级文件夹`,
    keys: ['command+b'],
  },
  selectAll: {
    label: `全选`,
    keys: ['command+a'],
  },
  rename: {
    label: `重命名`,
    keys: ['command+d'],
  },
  open: {
    label: `打开`,
    keys: ['enter'],
  },
  fileExplorerTabSwitch: {
    label: `切换标签页`,
    keys: ['command+1'],
  },
  navigationLeft: {
    label: `向左导航`,
    keys: ['left'],
  },
  navigationRight: {
    label: `向右导航`,
    keys: ['right'],
  },
  navigationUp: {
    label: `向上导航`,
    keys: ['up'],
  },
  navigationDown: {
    label: `向下导航`,
    keys: ['down'],
  },
  multipleSelectLeft: {
    label: `多选（网格视图，向前）`,
    keys: ['shift+left'],
  },
  multipleSelectRight: {
    label: `多选（网格视图，向后）`,
    keys: ['shift+right'],
  },
  multipleSelectUp: {
    label: `多选（列表视图，向前）`,
    keys: ['shift+up'],
  },
  multipleSelectDown: {
    label: `多选（列表视图，向后）`,
    keys: ['shift+down'],
  },
  multipleSelectClick: {
    label: `多选（鼠标点击）`,
    keys: ['command+click', 'shift+click'],
  },
};
