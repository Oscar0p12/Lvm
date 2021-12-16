
import React, { Component } from 'react';
import archivo from './archivo.js'

class pdf extends Component {
    onResumeClick() {
        window.open(Pdf);
      }
    
    render() {
        return (
            <a onClick={this.onResumeClick}>
            Resume
         </a>
        );
    }
}

export default pdf;