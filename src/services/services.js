export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Error ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=15&pageSize=10')
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books');
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses');
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    _transformCharacter(char) {
        return {
            name: char.name || 'no data',
            gender: char.gender || 'no data',
            born: char.born || 'no data',
            died: char.died || 'no data',
            culture: char.culture || 'no data',
            url: char.url || 'no data'
        }
    }

    _transformHouse(house) {
        return {
            name: house.name || 'no data',
            region: house.region || 'no data',
            words: house.words || 'no data',
            titles: house.titles || 'no data',
            overlord: house.overlord || 'no data',
            ancentralWeapons: house.ancentralWeapons || 'no data',
            url: house.url || 'no data'
        }
    }

    _transformBook(book) {
        return {
            name: book.name || 'no data',
            numberOfPages: book.numberOfPages || 'no data',
            publisher: book.publisher || 'no data',
            released: book.released || 'no data',
            url: book.url || 'no data'
        }
    }

}