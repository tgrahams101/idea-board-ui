import React, {Component} from 'react'

class Idea extends Component {

    render() {
        return (
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.description}</div>
                <hr/>
                <button onClick={this.props.deleteIdea.bind(null, this.props.id, this.props.index)}> Delete </button>
            </div>
        )
    }

}

export default Idea