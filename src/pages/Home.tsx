import '../App.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                <a onClick={()=>navigate("/login")}>login</a>
                <a onClick={()=>navigate("/register")}>register</a>
                <a onClick={()=>navigate("/account")}>my account</a>
                <a onClick={()=>navigate("/agenda")}>agenda</a>
            </header>
        </div>
    );
}

export default Home;
