import '../App.css';
import React from 'react';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <a href='/login'>login</a>
                <a href='/register'>register</a>
                <a href='/account'>my account</a>
            </header>
        </div>
    );
}

export default Home;
