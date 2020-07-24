import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import fetch from 'node-fetch';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        minHeight: '30vh',
        marginLeft: 5
        // backgroundColor: theme.palette.background.paper,
    },
    title: {
        width: '100%',
        textAlign: 'left'
    }
}));

const allfilms = {};

const getFilmId = (film) => {
    if (!film) {
        return -1;
    }
    return film.replace('http://swapi.dev/api/films/', '').replace('/', '');
}

export const getFilmDetail = (films) => {
    return Promise.all(films.map((film) => {
        const id = getFilmId(film);
        return allfilms[id] ? Promise.resolve(allfilms[id]) : fetch(film.replace('http://','https://')).then(async (resp) => {
            const filmDetail = await resp.json();
            allfilms[getFilmId(filmDetail.url)] = filmDetail;
            return filmDetail;
        });
    }))
};


export default function MoviesList({ films, onLatestMovie }) {
    const classes = useStyles();
    const [filmDetails, setFilmDetails] = React.useState([]);
    React.useEffect(() => {
        if (films && films.length > 0) {
            getFilmDetail(films).then(f => {
                setFilmDetails(f);
            });
        }
    }, [films]);

    if (films && filmDetails.length === 0) {
        return <CircularProgress color="inherit" size={20} />;
    }
    if (onLatestMovie && filmDetails.length > 0) {
        setTimeout(() => onLatestMovie(filmDetails[filmDetails.length - 1]), 1000)
    }
    return (
        <Grid container spacing={2} className={classes.root}>
            <p className={classes.title}>
                List of Movies:
          </p>
            <List dense aria-label="contacts">
                {filmDetails && filmDetails.map((flim, index) => (
                    <ListItem key={index}>
                        <ListItemText inset primary={flim.title} />
                    </ListItem>
                ))}
            </List>
        </Grid>
    )
}
