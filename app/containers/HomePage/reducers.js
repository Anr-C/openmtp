import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faSync,
  faSdCard,
  faCog,
  faPlug,
  faArrowLeft,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faPaypal } from '@fortawesome/free-brands-svg-icons';
import { actionTypes } from './actions';
import { PATHS } from '../../constants/paths';
import {
  DEVICES_DEFAULT_PATH,
  FILE_EXPLORER_DEFAULT_FOCUSSED_DEVICE_TYPE,
} from '../../constants';
import { DEVICE_TYPE } from '../../enums';
import {
  buyMeACoffeeText,
  supportUsingPayPal,
} from '../../templates/fileExplorer';
import { isKalamModeSupported } from '../../helpers/binaries';

export const initialState = {
  focussedFileExplorerDeviceType: {
    accelerator: FILE_EXPLORER_DEFAULT_FOCUSSED_DEVICE_TYPE,
    onClick: FILE_EXPLORER_DEFAULT_FOCUSSED_DEVICE_TYPE,
    value: FILE_EXPLORER_DEFAULT_FOCUSSED_DEVICE_TYPE,
  },

  sidebarFavouriteList: {
    top: [
      {
        label: '主页',
        path: PATHS.homeDir,
        icon: 'folder',
        enabled: true,
      },
      {
        label: '桌面',
        path: PATHS.desktopDir,
        icon: 'folder',
        enabled: true,
      },
      {
        label: '下载',
        path: PATHS.downloadsDir,
        icon: 'folder',
        enabled: true,
      },
      {
        label: '可移动磁盘',
        path: PATHS.volumesDir,
        icon: 'folder',
        enabled: true,
      },
      {
        label: '根目录',
        path: PATHS.systemRootDir,
        icon: 'folder',
        enabled: true,
      },
    ],
    bottom: [],
  },

  toolbarList: {
    [DEVICE_TYPE.local]: {
      up: {
        enabled: true,
        label: '上一级文件夹',
        icon: faArrowLeft,
      },
      refresh: {
        enabled: true,
        label: '刷新',
        icon: faSync,
      },
      delete: {
        enabled: true,
        label: '删除',
        icon: faTrashAlt,
      },
      gitHub: {
        enabled: true,
        label: 'GitHub',
        icon: faGithub,
      },
      settings: {
        enabled: true,
        label: '设置',
        icon: faCog,
      },
      faqs: {
        enabled: true,
        label: '帮助 - 常见问题',
        icon: faQuestionCircle,
      },
    },
    [DEVICE_TYPE.mtp]: {
      up: {
        enabled: true,
        label: '文件夹上一级',
        icon: faArrowLeft,
      },
      refresh: {
        enabled: true,
        label: '刷新',
        icon: faSync,
      },
      delete: {
        enabled: true,
        label: '删除',
        icon: faTrashAlt,
      },
      storage: {
        enabled: true,
        label: '存储',
        icon: faSdCard,
      },
      mtpMode: {
        enabled: isKalamModeSupported(),
        label: 'MTP模式',
        icon: faPlug,
      },
      paypal: {
        enabled: true,
        label: '通过PayPal支持',
        icon: faPaypal,
      },
      buyMeACoffee: {
        enabled: true,
        label: '请我喝咖啡',
        image: 'toolbar/buymeacoffee.png',
        icon: null,
      },
      settings: {
        enabled: true,
        label: '设置',
        icon: faCog,
      },
    },
  },

  directoryLists: {
    [DEVICE_TYPE.local]: {
      order: 'asc',
      orderBy: 'name',
      queue: {
        selected: [],
      },
      nodes: [],
      isLoaded: false,
    },
    [DEVICE_TYPE.mtp]: {
      order: 'asc',
      orderBy: 'name',
      queue: {
        selected: [],
      },
      nodes: [],
      isLoaded: false,
    },
  },

  currentBrowsePath: {
    [DEVICE_TYPE.local]: DEVICES_DEFAULT_PATH.local,
    [DEVICE_TYPE.mtp]: DEVICES_DEFAULT_PATH.mtp,
  },

  mtpDevice: {
    isAvailable: false,
    error: null,
    isLoading: false,

    /**
     * params: {mtpDeviceInfo, usbDeviceInfo} - info
     *
     */
    info: {},
  },

  contextMenuList: {
    [DEVICE_TYPE.local]: {
      rename: {
        enabled: true,
        label: '重命名',
        data: {},
      },
      copy: {
        enabled: true,
        label: '复制',
        data: {},
      },
      copyToQueue: {
        enabled: true,
        label: '加入复制队列',
        data: {},
      },
      paste: {
        enabled: true,
        label: '粘贴',
        data: {},
      },
      newFolder: {
        enabled: true,
        label: '新建文件夹',
        data: {},
      },
      showInEnclosingFolder: {
        enabled: true,
        label: '在Finder中打开',
        data: {},
      },
    },
    [DEVICE_TYPE.mtp]: {
      rename: {
        enabled: true,
        label: '重命名',
        data: {},
      },
      copy: {
        enabled: true,
        label: '复制',
        data: {},
      },
      copyToQueue: {
        enabled: true,
        label: '加入复制队列',
        data: {},
      },
      paste: {
        enabled: true,
        label: '粘贴',
        data: {},
      },
      newFolder: {
        enabled: true,
        label: '新建文件夹',
        data: {},
      },
    },
  },

  /**
   * description - MTP Storage list
   *
   *    {
   *      string: { <----- storageId
   *        "name": string,
   *        "selected": boolean,
   *        "info": {} | undefined,
   *      }
   *    }
   *
   */
  mtpStoragesList: {},

  fileTransfer: {
    clipboard: {
      queue: [],
      source: null,
    },
    progress: {
      toggle: false,
      titleText: null,
      bottomText: null,

      /**
       *  [{
       *    percentage,
       *    variant,
       *    bodyText1,
       *    bodyText2,
       *  }]
       */
      values: [],
    },
  },

  filesDrag: {
    sourceDeviceType: null,
    destinationDeviceType: null,
    enter: false,
    lock: false,
    sameSourceDestinationLock: false,
  },
};

export default function Home(state = initialState, action) {
  const { type, payload, deviceType = null } = action;

  switch (type) {
    case actionTypes.SET_FOCUSSED_FILE_EXPLORER_DEVICE_TYPE:
      return {
        ...state,
        focussedFileExplorerDeviceType: {
          ...state.focussedFileExplorerDeviceType,
          ...payload,
        },
      };

    case actionTypes.SET_SORTING_DIR_LISTS:
      return {
        ...state,
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            ...payload,
          },
        },
      };

    case actionTypes.SET_SELECTED_DIR_LISTS:
      return {
        ...state,
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            queue: {
              selected: payload.selected,
            },
          },
        },
      };

    case actionTypes.SET_CURRENT_BROWSE_PATH:
      return {
        ...state,
        currentBrowsePath: {
          ...state.currentBrowsePath,
          [deviceType]: payload,
        },
      };

    case actionTypes.SET_MTP_STATUS:
      return {
        ...state,
        mtpDevice: {
          ...state.mtpDevice,
          ...payload,
        },
      };

    case actionTypes.LIST_DIRECTORY:
      return {
        ...state,
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            nodes: [...payload.nodes],
            isLoaded: payload.isLoaded,
          },
        },
      };

    case actionTypes.CHANGE_MTP_STORAGE:
      return {
        ...state,
        mtpStoragesList: {
          ...initialState.mtpStoragesList,
          ...payload,
        },
      };

    case actionTypes.SET_FILE_TRANSFER_CLIPBOARD:
      return {
        ...state,
        fileTransfer: {
          ...state.fileTransfer,
          clipboard: {
            ...payload,
          },
        },
      };

    case actionTypes.SET_FILE_TRANSFER_PROGRESS:
      return {
        ...state,
        fileTransfer: {
          ...state.fileTransfer,
          progress: {
            ...payload,
          },
        },
      };

    case actionTypes.CLEAR_FILE_TRANSFER:
      return {
        ...state,
        fileTransfer: {
          ...initialState.fileTransfer,
        },
      };

    case actionTypes.SET_FILES_DRAG:
      return {
        ...state,
        filesDrag: {
          ...state.filesDrag,
          ...payload,
        },
      };

    case actionTypes.CLEAR_FILES_DRAG:
      return {
        ...state,
        filesDrag: {
          ...initialState.filesDrag,
        },
      };

    default:
      return state;
  }
}
