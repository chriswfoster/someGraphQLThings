import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import ApolloClient from 'apollo-boost';
import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag'
import Feed from './Feed'
import './App.css';


// const axiosGitHubGraphQL = axios.create({
//   baseURL: 'http://localhost:4000/graphql',
// })

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount = () => {
    // client.subscribe({
    //   query: gql`{
    //     feed {
    //       id`
    // })
  }

  firstButtonClick = () => {
    // axios.post('http://localhost:4000/graphql', {query: `
    //   feed {
    //     id
    //   }
    // `})
    client.query({
      query: gql`{
      feed {
        id
      }}
      `
    })
    .then(resp => console.log(resp))
  }

  


  render() {
    return (
      <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={this.firstButtonClick}>Click</button>
          <button>Click2</button>
        </header>
        <Feed />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
