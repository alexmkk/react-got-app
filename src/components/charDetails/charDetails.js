import React, { Component } from 'react';
import GotService from '../../services/services';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import './charDetails.css';
export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    updateChar() {
        const { charId } = this.props;
        if (!charId) return;
        this.setState({
            loading: true
        })

        this.gotService.getCharacter(charId)
            .then(char => {
                this.setState({
                    char,
                    loading: false
                });
            })
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        if (!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }

        if (this.state.loading) {
            return <Spinner />
        }

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <div className="char-details rounded">
                {this.state.loading
                    ? <Spinner />
                    : <CharCard char={this.state.char} />
                }
            </div>
        );
    }
}

const CharCard = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}