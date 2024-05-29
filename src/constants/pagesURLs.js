import * as pages from './pages';
import config from 'config';

const result = {
  [pages.studentPage]: `${config.UI_URL_PREFIX}/${pages.studentPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
};

export default result;
