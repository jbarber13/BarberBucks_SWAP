import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                Hello World
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
