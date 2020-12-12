import './App.css';
import AddTask from './Components/AddTask';
import Home from './Components/Home';
import DisplayTask from './Components/DisplayTask';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Admin from './Components/Admin';
import {BrowserRouter as Router, NavLink, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <div id='app-div' className="container">
      <Router>
        <h4 style={{float:'start'}}>
          <center>
            <NavLink style={{padding: '15px'}} exact to='/'>ThinkQuotient</NavLink>
            <NavLink style={{padding: '15px'}}exact to='/'>Home</NavLink>
            <NavLink style={{padding: '15px'}}to='/login'>Login</NavLink>
          </center>
        </h4>

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup}/>
          <Route path='/admin' component = {Admin} />
          <Route path='/addTask/:id' component = {AddTask} />
          
          <Route path='/displayTask/:id' component= {DisplayTask} />
        </Switch>
      </Router>    
    </div>
  );
}

export default App;
