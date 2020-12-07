import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './app.css';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage/characterPage';

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
            <>
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
                    <CharacterPage />
                </Container>
            </>
        );
    }

};

export default App;