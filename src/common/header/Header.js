import React, {Component} from 'react';
import './Header.css';

//Header component which is rendered in all the pages
class Header extends Component{
    render(){
        return(
            <div>
                <header className="app-header">
                <a id="app-logo">Image Viewer</a>
                    </header>
            </div>
        )
    }
}

export default Header;