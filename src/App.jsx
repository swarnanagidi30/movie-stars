import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.scss';
import CountrySelect from './components/CharacterSelect';
import TextField from '@material-ui/core/TextField';
import MoviesList from './components/MoviesList';


const useStyles = makeStyles((theme) => ({
  appItem: {
    marginTop: theme.spacing(3),
    width: '25%'
  },
  textBox: {
    width: '100%'
  }
}));

function App() {

  const classes = useStyles();
  const [character, setCharacter] = React.useState({});
  const [latestMovie, setLatestMovie] = React.useState(null);

  const handleChange = (value) => {
    setCharacter(value);
  };
  const handleLatestMovie = (value) => {
    setLatestMovie(value);
  }

  const getYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.appItem}>
          <CountrySelect onChange={handleChange} />
        </div>
        <div className={classes.appItem}>
          <MoviesList films={character && character.films} onLatestMovie={handleLatestMovie} />
        </div>
        <div className={classes.appItem}>
          <TextField className={classes.textBox} label="Name / Year last Movie:" value={latestMovie ? (latestMovie.title + ' - ' + getYear(latestMovie.release_date)) : ''} />
        </div>
      </header>
    </div>
  );
}

export default App;
