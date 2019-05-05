import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.props.name}. Welcome to the React App!!!</h1>
      </div>
    )
  }
}

ReactDOM.render(<App name='Billy'/>, document.getElementById('root'));
export default App;
