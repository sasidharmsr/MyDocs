import React, { useState } from 'react'
import Texteditor from './Texteditor'
import { BrowserRouter as Router,Switch,Redirect,Route,useParams} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Login from './components/login';
import Main from './components/Main';
const App = () => {

  const [page,setpage]=useState(0);
  return (
    <Router>
      <Switch>
        <Route path="/Msrdocs/:id">
            <Texteditor/>
        </Route>
        <Route path="/" exact>
          <Redirect to={`/Register`} />
        </Route>
        <Route path="/Register">
          <Login/>
        </Route>
        <Route path="/User/:id">
            <Main/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
