import logo from './logo.svg';
import './App.css';
import { AppBar } from '@mui/material'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AppBar>
            DSB-Track
        </AppBar>
      </header>
    </div>
  );
}

export default App;
