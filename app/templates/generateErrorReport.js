import { APP_NAME, APP_VERSION, AUTHOR_EMAIL } from '../constants/meta';

const subject = `错误日志 - ${APP_NAME} | 版本: ${APP_VERSION}`;
const body = subject;

export const mailTo = `mailto:${AUTHOR_EMAIL}?Subject=${subject}&Body=${body}.`;

export const mailToInstructions = (zippedLogFileBaseName) =>
  `%0D%0A %0D%0A 请将生成的错误报告文件 "${zippedLogFileBaseName}"（位于您的桌面文件夹中）附加到此电子邮件中。`;

export const reportGenerateError = `错误报告生成失败。请重试！`;

export const REPORT_BUGS_PAGE_TITLE = `报告错误`;
