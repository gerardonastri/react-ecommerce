import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-weight: 500;
    align-items: center;

`


function Announcements() {
    return (
        <Container>
            Super deal! Free shipping on orders over $50
        </Container>
    )
}

export default Announcements
