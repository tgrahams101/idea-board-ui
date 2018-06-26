import React, {Component} from 'react'

class Idea extends Component {

    handleKeyUp(event) {
        console.log('HANDLING KEY UP', event);
    }
    render() {
        return (
            <div>
                <p><b>Idea: {this.props.title}</b></p>
                <p>Description: {this.props.description}</p>
                <button onClick={ (event) => {
                    console.log('EVENT', event);
                    this.props.deleteIdea(this.props.id, this.props.index);
                }} > Delete
                </button>
                <h5>Change Idea details below </h5>
                <input name="title" value={this.props.title} onChange={this.props.handleIdeaChange.bind(null, this.props.index)} onKeyUp={this.handleKeyUp} onBlur={this.props.updateIdea.bind(null, this.props.index)}/>
                <br />
                <textarea name="description" value={this.props.description} onChange={this.props.handleIdeaChange}/>

                <hr/>
            </div>
        )
    }

}

export default Idea