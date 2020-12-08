import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import './itemList.css';
function ItemList({ getData, renderItem, onItemSelected }) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then(data => {
                updateList(data)
            })
    }, []);


    function renderItems(arr) {
        return arr.map((item) => {
            const id = item.url.match(/([0-9]*)$/)[0];
            const label = renderItem(item);

            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </li>
            )
        })
    }

    if (!itemList) {
        return <Spinner />
    }
    const items = renderItems(itemList);
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
}

export default ItemList;