import React, { Component } from 'react';
import GotService from '../../services/services';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import './itemDetails.css';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export { Field };

export default class ItemDetails extends Component {

    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    updateItem() {
        const { itemId, getData } = this.props;
        if (!itemId) return;
        this.setState({
            loading: true
        })

        getData(itemId)
            .then(item => {
                this.setState({
                    item,
                    loading: false
                });
            })
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {

        if (!this.state.item) {
            return <span className="select-error">Please select an item</span>
        }

        if (this.state.loading) {
            return <Spinner />
        }

        if (this.state.error) {
            return <ErrorMessage />
        }
        const { item } = this.state;
        const { name } = item;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { item })
                        })
                    }
                </ul>
            </div>
        );
    }
}