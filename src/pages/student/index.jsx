import React, { useMemo } from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';

import getMessages from './intl';
import Student from './containers/Student';
import configureStore from "../../misc/redux/configureStore";
import rootReducer from "./reducers";
import {Provider} from "react-redux";

const store = configureStore(rootReducer);

function Index(props) {
  const {
    lang,
  } = useLocationSearch();
  const messages = useMemo(() => getMessages(lang), [lang]);
  return (
    <Provider store={store}>
      <IntlProvider messages={messages}>
        <Student {...props} />
      </IntlProvider>
    </Provider>
  );
}

export default Index;
