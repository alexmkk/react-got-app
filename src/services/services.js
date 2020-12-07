export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Error ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=15&pageSize=10')
        return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllBooks() {
        return this.getResource('/books');
    }

    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    getAllHouses() {
        return this.getResource('/houses');
    }

    getHouse(id) {
        this.getResource(`/house/${id}`);
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
            ancentralWeapons: house.ancentralWeapons || 'no data'
        }
    }

    _transformBook(book) {
        return {
            name: book.name || 'no data',
            numberOfPages: book.numberOfPages || 'no data',
            publisher: book.publisher || 'no data',
            released: book.released || 'no data'
        }
    }

}