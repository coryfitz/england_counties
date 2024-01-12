import React from "react";
import {title} from './Config.tsx';

function Home() {
    return (
        <div className="container">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand justify-content-end" href="/" style={{color: 'black', marginLeft: 15}}><h2>{title}</h2></a>
                <div>
                    <a type="button" className="btn btn-success" href="study" style={{margin: 5}}>Study</a>
                    <a type="button" className="btn btn-success" href="quiz" style={{margin: 5}}>Quiz</a>
                </div>
            </nav>
       
            <div className="container" style={{marginTop: 80, textAlign: 'center'}}>
                <h2>
                    Select study or quiz mode
                </h2>
            </div>
            
        </div>
    )
}

export default Home;