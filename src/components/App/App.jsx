import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Paper } from '@mui/material';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import SearchPage from '../Search/SearchPage';
import SearchResults from '../Search/SearchResults';
import SongInfo from '../SongDisplay/SongInfo';
import SongEdit from '../SongDisplay/SongEdit';
import AddSong from '../SongDisplay/AddSong';
import ViewNotes from '../Performances/ViewNotes';
import Scheduler from '../Calendar/Scheduler';
import Calendar from '../Calendar/Calendar';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';


import './App.css';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_USER'})
  },[dispatch]);


  const user = useSelector(store => store.user);

  const Layout = ({children}) => {
    return (
      <>
        <Header />
        <Nav />
        <Container component="main" style={{ display: 'flex', flex: 1}}>
          {user.id && <Sidebar />}
          {children}
        </Container>
        <Footer />
       </>
       )  
      }

  return (
    <>
      <Router>

          <Layout >
          <Switch>
            <Redirect exact from="/" to="/home" />

            <ProtectedRoute exact path="/user">
              <SearchPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/search/:id">
              <SearchResults />
            </ProtectedRoute>

            <ProtectedRoute exact path="/info/:id">
              <SongInfo />
            </ProtectedRoute>

            <ProtectedRoute exact path="/edit/:id">
              <SongEdit />
            </ProtectedRoute>

            <ProtectedRoute exact path="/addsong">
              <AddSong />
            </ProtectedRoute>

            <ProtectedRoute exact path="/notes/:id">
              <ViewNotes />
            </ProtectedRoute>


            <ProtectedRoute exact path="/calendar">
              <Calendar />
            </ProtectedRoute>



            <Route exact path="/login" >
              {user.id ? <Redirect to="/user" /> : <LoginPage /> }
            </Route>

            <Route exact path="/registration">
              {user.id ? <Redirect to="/user" /> : <RegisterPage />}
            </Route>

            <Route exact path="/home">
              {user.id ?  <Redirect to="/user" />  :  <LandingPage />  }
            </Route>

            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          </Layout>

      </Router>
    </>
  )

}

export default App;
