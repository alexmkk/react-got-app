import React, { Component } from 'react';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import './itemList.css';
export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then(itemList => {
                this.setState({ itemList })
            })

    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    renderItems(arr) {
        return arr.map((item) => {
            const id = item.url.match(/([0-9]*)$/)[0];
            const label = this.props.renderItem(item);

            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </li>
            )
        })
    }

    render() {
        const { itemList } = this.state;

        if (this.state.error) {
            return <ErrorMessage />
        }

        if (!itemList) {
            return <Spinner />
        }
        const items = this.renderItems(itemList);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}