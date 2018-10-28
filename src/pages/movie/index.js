import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';

export default class Movie extends Component {

    state = {
        movie: {}
    }

    async componentDidMount() {
        const API_KEY = '99267f935d17bad167337fdaef221166';
        const LANGUAGE = '?language=pt-BR';
        const { id } = this.props.match.params;
        const response = await api.get(`movie/${id}${LANGUAGE}&api_key=${API_KEY}`);
        console.log(response.data);
        this.setState({ movie: response.data})
    }

    render() {
        const { movie } = this.state;

        return (
        <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>
            URL: <a href={movie.homepage}>{movie.homepage}</a>
        </p>
        </div>);

    }

}