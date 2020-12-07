import React, { Component } from 'react';
import GotService from '../../services/services';
import Spinner from '../spinner/spinner';
import './itemList.css';
export default class ItemList extends Component {
    gotService = new GotService();

    state = {
        charlist: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then(charlist => {
                this.setState({ charlist })
            })

    }

    renderItems(arr) {
        return arr.map((item, i) => {
            const id = +item.url.match(/\d/g).join('');
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(id)}
                >
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const { charlist } = this.state;

        if (!charlist) {
            return <Spinner />
        }
        const items = this.renderItems(charlist);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}