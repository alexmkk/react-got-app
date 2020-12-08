import React, { Component } from 'react';
import ErrorMessage from '../errorMessage/errorMessage';
import ItemList from '../itemList';
import GotService from '../../services/services';
import { withRouter } from 'react-router-dom';

class BooksPage extends Component {
    gotService = new GotService();

    state = {
        selectedBook: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(`/books/${itemId}`);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({ name }) => name}
            />
        )
    }
}

export default withRouter(BooksPage);