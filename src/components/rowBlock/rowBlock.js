import React from 'react';
import { Col, Row } from 'reactstrap';

const RowBlock = ({ leftContent, rigthContent }) => {
    return (
        <Row className='mb-5'>
            <Col md='6'>
                {leftContent}
            </Col>
            <Col md='6'>
                {rigthContent}
            </Col>
        </Row>
    )
}

export default RowBlock;