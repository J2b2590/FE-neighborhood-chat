import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import MessageContainer from './Containers/MessageContainer'


import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
    <Switch>
      <Route component={Login} exact path='/'/>
      <Route component={MessageContainer} exact path='/rooms'/>
    </Switch>
    </div>
  );
}

export default App;
