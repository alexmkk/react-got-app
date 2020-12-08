import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './app.css';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../pages/characterPage';
import HousesPage from '../pages/housesPage';
import BooksPage from '../pages/booksPage';
import BooksItem from '../pages/booksItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {

    state = {
        showRandom: true,
        error: false,
        selectedChar: 130
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onToggleRandomChar = (e) => {
        this.setState(state => {
            return {
                showRandom: !this.state.showRandom
            }
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const char = this.state.showRandom ? <RandomChar /> : null;
        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {char}
                                <button
                                    className="toggle-btn"
                                    onClick={this.onToggleRandomChar}
                                >Toggle Random Char</button>
                            </Col>
                        </Row>
                        <Route path="/" component={() => <h1>Welcome to GOT DB</h1>} exact />
                        <Route path="/characters" component={CharacterPage} />
                        <Route path="/houses" component={HousesPage} />
                        <Route path="/books" exact={true} component={BooksPage} />
                        <Route path="/books/:id" render={
                            ({ match }) => {
                                const { id } = match.params;
                                return <BooksItem bookId={id} />
                            }
                        }
                        />
                    </Container>
                </div>
            </Router>
        );
    }

};

export default App;