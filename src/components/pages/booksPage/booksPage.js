import React, { Component } from 'react';
import ItemDetails, { Field } from '../../itemDetails/itemDetails'
import ErrorMessage from '../../errorMessage/errorMessage';
import ItemList from '../../itemList';
import GotService from '../../../services/services';
import RowBlock from '../../rowBlock/rowBlock';

export default class BooksPage extends Component {
    gotService = new GotService();

    state = {
        selectedItem: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
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

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({ name, numberOfPages }) => `${name} (${numberOfPages})`}
            />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedItem}
                getData={this.gotService.getBook}
            >
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
                <Field field='numberOfPages' label='Pages' />
            </ItemDetails>
        )

        return (
            <RowBlock leftContent={itemList} rigthContent={itemDetails} />
        )
    }
}