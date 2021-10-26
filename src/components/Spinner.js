import React, { Component } from 'react'

export class Spinner extends Component {
    render() {
        return (
            <div className="text-center my-3">
                <div className={`spinner-border text-${this.props.mode === 'light'?'dark':'light'}`}>
                </div>
            </div>
        )
    }
}


export default Spinner
