import { app, Menu } from 'electron';
import {
  appFeaturesWindow,
  keyboardShortcutsWindow,
  privacyPolicyWindow,
  reportBugsWindow,
} from './helpers/createWindows';
import { ENV_FLAVOR } from './constants/env';
import { APP_NAME, APP_GITHUB_URL } from './constants/meta';
import { openExternalUrl } from './utils/url';
import { BUY_ME_A_COFFEE_URL } from './constants';
import { inviteViaEmail } from './templates/menu';

export default class MenuBuilder {
  constructor({ mainWindow, autoAppUpdate, appUpdaterEnable }) {
    this.mainWindow = mainWindow;
    this.autoAppUpdate = autoAppUpdate;
    this.appUpdaterEnable = appUpdaterEnable;
  }

  buildMenu() {
    if (ENV_FLAVOR.allowDevelopmentEnvironment) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: '检查元素',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          },
        },
      ]).popup(this.mainWindow);
    });

    this.mainWindow.openDevTools();
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: `${APP_NAME}`,
      submenu: [
        {
          label: `关于 ${APP_NAME}`,
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        {
          visible: this.appUpdaterEnable,
          label: '检查更新',
          click: () => {
            this.autoAppUpdate.forceCheck();
          },
        },
        { type: 'separator' },
        {
          label: `隐藏 ${APP_NAME}`,
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: '隐藏其他',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: '显示全部', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit = {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
          accelerator: 'Command+Z',
          selector: 'undo:',
          role: 'undo',
        },
        {
          label: '重做',
          accelerator: 'Command+Y',
          selector: 'redo:',
          role: 'redo',
        },
        { type: 'separator' },
        {
          label: '剪切',
          accelerator: 'Command+X',
          selector: 'cut:',
          role: 'cut',
        },
        {
          label: '复制',
          accelerator: 'Command+C',
          selector: 'copy:',
          role: 'copy',
        },
        {
          label: '粘贴',
          accelerator: 'Command+V',
          selector: 'paste:',
          role: 'paste',
        },
        {
          label: '全选',
          accelerator: 'Command+A',
          selector: 'selectAll:',
          role: 'selectAll',
        },
      ],
    };
    const subMenuViewDev = {
      label: '视图',
      submenu: [
        {
          label: '重新加载',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: '切换全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: '切换开发者工具',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd = {
      label: '视图',
      submenu: [
        {
          label: '切换全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow = {
      label: '窗口',
      submenu: [
        {
          label: '最小化',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: '关闭', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: '全部置顶', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp = {
      label: '帮助',
      submenu: [
        {
          label: '报告问题',
          click: () => {
            reportBugsWindow();
          },
        },
        {
          label: '键盘快捷键',
          click: () => {
            keyboardShortcutsWindow();
          },
        },
        {
          label: '新功能与更新',
          click: () => {
            appFeaturesWindow();
          },
        },
        {
          label: '隐私政策',
          click: () => {
            privacyPolicyWindow();
          },
        },
        {
          label: '请我喝咖啡！',
          click: () => {
            openExternalUrl(BUY_ME_A_COFFEE_URL);
          },
        },
        {
          label: `邀请朋友`,
          click: () => {
            openExternalUrl(inviteViaEmail);
          },
        },
        {
          label: '在 GitHub 上找到我们',
          click: () => {
            openExternalUrl(APP_GITHUB_URL);
          },
        },
      ],
    };

    const subMenuView = ENV_FLAVOR.allowDevelopmentEnvironment
      ? subMenuViewDev
      : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    return [
      {
        label: '文件',
        submenu: [
          {
            label: '打开',
            accelerator: 'Ctrl+O',
          },
          {
            label: '关闭',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '视图',
        submenu: ENV_FLAVOR.allowDevelopmentEnvironment
          ? [
              {
                label: '重新加载',
                accelerator: 'Ctrl+R',
                click: () => {
                  this.mainWindow.webContents.reload();
                },
              },
              {
                label: '切换全屏',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(
                    !this.mainWindow.isFullScreen()
                  );
                },
              },
              {
                label: '切换开发者工具',
                accelerator: 'Alt+Ctrl+I',
                click: () => {
                  this.mainWindow.toggleDevTools();
                },
              },
            ]
          : [
              {
                label: '切换全屏',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(
                    !this.mainWindow.isFullScreen()
                  );
                },
              },
            ],
      },
      {
        label: '帮助',
        submenu: [
          {
            visible: this.appUpdaterEnable,
            label: '检查更新',
            click: () => {
              this.autoAppUpdate.forceCheck();
            },
          },
          {
            label: '报告问题',
            click: () => {
              reportBugsWindow();
            },
          },
          {
            label: '键盘快捷键',
            click: () => {
              keyboardShortcutsWindow();
            },
          },
          {
            label: '新功能与更新',
            click: () => {
              appFeaturesWindow();
            },
          },
          {
            label: '隐私政策',
            click: () => {
              privacyPolicyWindow();
            },
          },
          {
            label: '请我喝咖啡！',
            click: () => {
              openExternalUrl(BUY_ME_A_COFFEE_URL);
            },
          },
          {
            label: `邀请朋友`,
            click: () => {
              openExternalUrl(inviteViaEmail);
            },
          },
          {
            label: '在 GitHub 上找到我们',
            click: () => {
              openExternalUrl(APP_GITHUB_URL);
            },
          },
        ],
      },
    ];
  }
}
