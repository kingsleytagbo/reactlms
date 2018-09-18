import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import logo from './logo.svg';
import Navigation from './components/Navigation';
import Page from './components/Page';
import Contact from './components/Contact';
import './App.css';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)


// Main component
class App extends Component {
  componentDidMount() {
    document.body.className = ''
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">
                <img src={require('./content/images/trophy-32px.png')} width="21" height="32" className="d-inline-block align-top" />
                LMS
              </a>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/topics">Topics</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/ask-a-question">Ask A Question</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                </ul>
              </div>
            </nav>
            <div className="container">
              <div><hr /></div>
                {this.props.children}
              <Route exact path="/" component={Home} />
              <Route path="/contact" component={Contact} />
              <Route path="/topics" component={Topics} />
            </div >
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
