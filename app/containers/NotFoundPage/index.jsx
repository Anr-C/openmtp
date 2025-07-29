import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { routes } from '../../routing';
import styles from './styles/index.scss';
import { APP_TITLE } from '../../constants/meta';

export default class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <Helmet titleTemplate={`%s - ${APP_TITLE}`}>
          <title>资源未找到!</title>
        </Helmet>
        <div className={styles.container}>
          <h1>资源未找到!</h1>
          <Link to={routes.Home.path}>返回</Link>
        </div>
      </Fragment>
    );
  }
}
