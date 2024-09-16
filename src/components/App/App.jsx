import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import SearchPage from '../Search/SearchPage';
import SearchResults from '../Search/SearchResults';
import SongInfo from '../SongDisplay/SongInfo';
import SongEdit from '../SongDisplay/SongEdit';
import AddSong from '../SongDisplay/AddSong';
import ViewNotes from '../Performances/ViewNotes';
import Calendar from '../Calendar/Calendar';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#23b5d3', // Custom primary color '#1976d2'
    },
    secondary: {
      main: '#75abbc', // Custom secondary color '#dc004e'
    },
    background: {
      default: 'a2aebb', // Background color  '#f4f4f4'
    },
  },
  typography: {

    h3: {
      fontFamily: 'Pacific, cursive',
    }
  }
});

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
        <Container component="main" disableGutters  sx={{ display: 'flex',  gap:12, margin:2 }}>
          {user.id && <Sidebar />}
          {children}
        </Container>
        <Footer />
       </>
       )  
      }

  return (
    <><ThemeProvider theme={theme}>
      <Router>

          <Layout >
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/about">
              <AboutPage />
            </Route>

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
      </ThemeProvider>
    </>
  )

}

export default App;
