import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Home from '../components/Home';
import Admin from '../components/Admin/Admin';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
      <div>
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>


        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
