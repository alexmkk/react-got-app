import React, { Component } from 'react';
import ItemDetails, { Field } from '../../itemDetails/itemDetails'
import ErrorMessage from '../../errorMessage/errorMessage';
import ItemList from '../../itemList';
import GotService from '../../../services/services';
import RowBlock from '../../rowBlock/rowBlock';

export default class HousesPage extends Component {
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
                getData={this.gotService.getAllHouses}
                renderItem={({ name, region }) => `${name} (${region})`}
            />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedItem}
                getData={this.gotService.getHouse}
            >
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='titles' label='Titles' />
                <Field field='overlord' label='Overlord' />
            </ItemDetails>
        )

        return (
            <RowBlock leftContent={itemList} rigthContent={itemDetails} />
        )
    }
}