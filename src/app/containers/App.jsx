import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import {useDispatch, useSelector,} from 'react-redux';
import {addAxiosInterceptors} from 'misc/requests';
import AuthoritiesProvider from 'misc/providers/AuthoritiesProvider';
import Loading from 'components/Loading';
import LoginPage from 'pageProviders/Login';
import PageContainer from 'pageProviders/components/PageContainer';
import SecretPage from 'pageProviders/Secret';
import ThemeProvider from 'misc/providers/ThemeProvider';
import UserProvider from 'misc/providers/UserProvider';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';
import StudentPage from "pageProviders/Student";
import StudentsPage from "pageProviders/Students";
import actionsUser from '../actions/user';
import pageURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';

function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    componentDidMount: false,
  });

  const {
    errors,
    isFailedSignIn,
    isFailedSignUp,
    isFetchingSignIn,
    isFetchingSignUp,
    isFetchingUser,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });
    dispatch(actionsUser.fetchUser());
    setState({
      ...state,
      componentDidMount: true,
    });
  }, []);

  return (
    <UserProvider>
      <AuthoritiesProvider>
        <ThemeProvider>
          <BrowserRouter>
            <SearchParamsConfigurator />
            {/* This is needed to let first render passed for App's
              * configuration process will be finished (e.g. locationQuery
              * initializing) */}
            {state.componentDidMount && (
              <IntlProvider>
                <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />
                {isFetchingUser && (
                  <PageContainer>
                    <Loading />
                  </PageContainer>
                )}
                {!isFetchingUser && (
                  <Routes>
                    <Route
                      element={<StudentPage />}
                      path={`${pageURLs[pages.studentPage]}/:id/`}
                    />
                    <Route
                      element={<StudentsPage />}
                      path={`${pageURLs[pages.studentPage]}`}
                    />
                    <Route
                      element={<SecretPage />}
                      path={`${pageURLs[pages.secretPage]}`}
                    />
                    <Route
                      element={(
                        <LoginPage
                          errors={errors}
                          isFailedSignIn={isFailedSignIn}
                          isFailedSignUp={isFailedSignUp}
                          isFetchingSignIn={isFetchingSignIn}
                          isFetchingSignUp={isFetchingSignUp}
                          onSignIn={({
                            email,
                            login,
                            password,
                          }) => dispatch(actionsUser.fetchSignIn({
                            email,
                            login,
                            password,
                          }))}
                          onSignUp={({
                            email,
                            firstName,
                            lastName,
                            login,
                            password,
                          }) => dispatch(actionsUser.fetchSignUp({
                            email,
                            firstName,
                            lastName,
                            login,
                            password,
                          }))}
                        />
                      )}
                      path={`${pageURLs[pages.login]}`}
                    />
                    <Route
                      element={(
                        <MissedPage
                          redirectPage={`${pageURLs[pages.studentPage]}`}
                        />
                      )}
                      path="*"
                    />
                  </Routes>
                )}
              </IntlProvider>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </AuthoritiesProvider>
    </UserProvider>
  );
}

export default App;
