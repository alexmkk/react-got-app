import React, { Component } from 'react';
import ItemDetails, { Field } from '../../itemDetails/itemDetails'
import ErrorMessage from '../../errorMessage/errorMessage';
import ItemList from '../../itemList';
import GotService from '../../../services/services';
import RowBlock from '../../rowBlock/rowBlock';
export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedItem: 30,
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
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`}
            />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedItem}
                getData={this.gotService.getCharacter}
            >
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Deied' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )

        return (
            <RowBlock leftContent={itemList} rigthContent={itemDetails} />
        )
    }
}