import React, { Component } from 'react';
import GotService from '../../services/services';
import './randomChar.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {
    gotService = new GotService();

    state = {
        char: {},
        loading: true
    }
    componentDidMount() {
        this.updadeChar();
        this.timerId = setInterval(this.updadeChar, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })

    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updadeChar = () => {

        const id = Math.floor(Math.random() * 140 + 25); // от 25 до 140 персонажа
        this.gotService.getCharacter(id)
            .then(char => {
                this.onCharLoaded(char);
            })
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
