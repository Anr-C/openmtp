import React from 'react';
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import HomePage from '../containers/HomePage/Loadable';
import ReportBugsPage from '../containers/ReportBugsPage/Loadable';
import AppUpdatePageUpdateAvailable from '../containers/AppUpdatePage/UpdateAvailable';
import AppUpdatePageUpdateProgress from '../containers/AppUpdatePage/UpdateProgress';
import PrivacyPolicyPage from '../containers/PrivacyPolicyPage/Loadable';
import AppFeaturesPage from '../containers/AppFeaturesPage/Loadable';
import KeyboardShortcutsPage from '../containers/KeyboardShortcutsPage/Loadable';
import NotFoundPage from '../containers/NotFoundPage/Loadable';
import HelpFaqsPage from '../containers/HelpFaqsPage/Loadable';

export const routes = {
  Home: {
    path: '/',
    exact: true,
    component: HomePage,
  },
  ReportBugsPage: {
    path: '/reportBugsPage',
    exact: true,
    component: ReportBugsPage,
  },
  AppUpdatePageUpdateProgress: {
    path: '/appUpdatePage/updateProgress',
    exact: true,
    component: AppUpdatePageUpdateProgress,
  },
  AppUpdatePageUpdateAvailable: {
    path: '/appUpdatePage/updateAvailable',
    exact: true,
    component: AppUpdatePageUpdateAvailable,
  },
  PrivacyPolicyPage: {
    path: '/privacyPolicyPage',
    exact: true,
    component: PrivacyPolicyPage,
  },
  HelpFaqsPage: {
    path: '/helpFaqsPage',
    exact: true,
    component: HelpFaqsPage,
  },
  AppFeaturesPage: {
    path: '/appFeaturesPage',
    exact: true,
    component: AppFeaturesPage,
  },
  KeyboardShortcutsPage: {
    path: '/keyboardShortcutsPage',
    exact: true,
    component: KeyboardShortcutsPage,
  },
  NotFound: {
    path: '*',
    component: NotFoundPage,
  },
};

export default () => (
  <HashRouter>
    <Switch>
      {Object.keys(routes).map((a) => {
        const route = routes[a];
        const { component: Component, path, exact } = route;

        return (
          <Route
            key={path || 'notfound'}
            path={path}
            exact={exact}
            render={() => <Component />}
          />
        );
      })}
    </Switch>
  </HashRouter>
);
