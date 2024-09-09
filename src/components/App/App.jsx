import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  BrowserRouter,
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
import AddNotes from '../Performances/AddNotes';
import Scheduler from '../Calendar/Scheduler';
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
          <Sidebar />
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

            <ProtectedRoute exact path="/edit">
              <SongEdit />
            </ProtectedRoute>

            <ProtectedRoute exact path="/addsong">
              <AddSong />
            </ProtectedRoute>

            <ProtectedRoute exact path="/viewnotes">
              <ViewNotes />
            </ProtectedRoute>

            <ProtectedRoute exact path="/newnote">
              <AddNotes />
            </ProtectedRoute>

            <ProtectedRoute exact path="/calendar">
              <Scheduler />
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







    // <Router>
    //   <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
    //     <Header />
    //     <Nav />
    //     <Container component="main" style={{ display: 'flex', flex: 1}}>
    //       <Sidebar />
    //       <Switch>
    //         {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
    //         <Redirect exact from="/" to="/home" />

    //         {/* Visiting localhost:5173/about will show the about page. */}
    //         <Route
    //           // shows AboutPage at all times (logged in or not)
    //           exact
    //           path="/about"
    //         >
    //           <AboutPage />
    //         </Route>

    //         {/* For protected routes, the view could show one of several things on the same route.
    //           Visiting localhost:5173/user will show the UserPage if the user is logged in.
    //           If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
    //           Even though it seems like they are different pages, the user is always on localhost:5173/user */}
    //         <ProtectedRoute
    //           // logged in shows UserPage else shows LoginPage
    //           exact
    //           path="/user"
    //         >
    //           <MainContent />
    //         </ProtectedRoute>

    //         <ProtectedRoute
    //           // logged in shows InfoPage else shows LoginPage
    //           exact
    //           path="/info"
    //         >
    //           <InfoPage />
    //         </ProtectedRoute>

    //         <Route
    //           exact
    //           path="/login"
    //         >
    //           {user.id ?
    //             // If the user is already logged in, 
    //             // redirect to the /user page
    //             <Redirect to="/user" />
    //             :
    //             // Otherwise, show the login page
    //             <LoginPage />
    //           }
    //         </Route>

    //         <Route
    //           exact
    //           path="/registration"
    //         >
    //           {user.id ?
    //             // If the user is already logged in, 
    //             // redirect them to the /user page
    //             <Redirect to="/user" />
    //             :
    //             // Otherwise, show the registration page
    //             <RegisterPage />
    //           }
    //         </Route>

    //         <Route
    //           exact
    //           path="/home"
    //         >
    //           {user.id ?
    //             // If the user is already logged in, 
    //             // redirect them to the /user page
    //             <Redirect to="/user" />
    //             :
    //             // Otherwise, show the Landing page
    //             <LandingPage />
    //           }
    //         </Route>

    //         {/* If none of the other routes matched, we will show a 404. */}
    //         <Route>
    //           <h1>404</h1>
    //         </Route>
    //       </Switch>
    //     </Container>
    //     <Footer />
  //     </div>
  //   </Router>
  // );
}

export default App;
