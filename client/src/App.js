import React from 'react'
import './App.css'
import Nav from './Nav'
import About from './About'
import Shop from './Shop'
import ItemDetail from './ItemDetail'
import Posts from './components/posts/Posts'
import Post from './components/posts/Post'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <h2>Blog</h2>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/about" component={About} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/shop/:id" exact component={ItemDetail} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

export default App
