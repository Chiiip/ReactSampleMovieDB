import React, { Component } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './styles.css';

export default class Main extends Component {

    state = {
        filmes: [],
        searchInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadMovies();
    }

    previousPage = () => {
        const { page } = this.state;
        if (page === 1) {
            return;
        } else { 
            const pageNumber = page - 1;
            this.loadMovies(pageNumber);
        }
    }

    nextPage = () => {
        const { page, searchInfo } = this.state;
        if (page === searchInfo.total_pages) {
            return;
        } else {
            const pageNumber = page + 1;
            this.loadMovies(pageNumber);
        }
    }

    render() {

        const { filmes, page, searchInfo } = this.state;
        return <div className="filmes-list">
            {filmes.map(filme => (
                <article key={filme.id}>
                <strong>{filme.title}</strong>
                <p>{filme.overview}</p>
                <Link to={`/movie/${filme.id}`}>Ver mais detalhes</Link>
                </article>
            ))}
            <div className="actions">
            <button disabled={page === 1} onClick={this.previousPage}>Anterior</button>
            <button disabled={page === searchInfo.total_pages} onClick={this.nextPage}>Próxima</button>
            </div>
        </div>
    }

    loadMovies = async (page = 1) => {
        const API_KEY = '99267f935d17bad167337fdaef221166';
        const LANGUAGE = '?language=pt-BR';
        const response = await api.get(`search/movie${LANGUAGE}&query=a&api_key=${API_KEY}&page=${page}`);

        const { results, ...searchInfo } = response.data;


        this.setState({ filmes: results, searchInfo, page })
        console.log(response.data);
    };

}