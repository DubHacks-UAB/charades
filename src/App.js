import React from 'react';
import logo from './logo.svg';
import './App.css';
import VideoKitComponent from './VideoKitComponent';
import LandingPage from './LandingPage/LandingPage';

function App() {
  
  var movieList = ["The Gentlemen", "Bad boys", "The Godfather",
                  "Mulan", "The Avengers", "Inception", "Joker",
                 "The Incredibles", "Frozen", "The Lion King", 
                 "Secret Life Of Pets", "Little Women", "Black Panther", 
                  "Parasite", "Mission Impossible", "The Notebook", "Aquaman", "Fury",
                   "Crazy Rich Asians",  "Pulp Fiction", "Revanent", "The Irishman"];

  var tvShows = ["Friends", "Modern Family", "Suits", "Community", "How I Met Your Mother",
                "Normal People", "The Witcher", "Fresh Prince of Bel Air", "Peaky Blinders",
                "The Office", "The Good Place", "Silicon Valley", "The Crown", "Homeland", "Mad Med",
                "Brooklyn Nine-Nine", "The Last Dance", "New Girl", "Gossip Girl", "The Man In The High Castle",
                 "The Simpsons", "Game Of Thrones", "Westworld"];

  
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <LandingPage/>
    </div>
  );
}

export default App;
