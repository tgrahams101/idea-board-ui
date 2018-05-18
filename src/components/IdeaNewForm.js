import React, { Component } from 'react'

class IdeaNewForm extends Component {

    state = {
        newIdea: {}
    }

    handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedNewIdea = { ...this.state.newIdea }
        updatedNewIdea[attributeToChange] = newValue
        this.setState({ newIdea: updatedNewIdea });
    }

    render() {
        return (
            <div>
                <h2>Create New Idea</h2>

                <form onSubmit={this.props.createIdea.bind(null, this.state.newIdea)} >
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            name="title"
                            type="text"
                            onChange={this.handleChange} />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            name="description"
                            type="text"
                            onChange={this.handleChange} />
                    </div>
                    
                    <div>
                        <input type="submit" value="Create Idea"/>
                    </div>
                </form>

                <hr />
                <hr />
            </div>
        )

    }

}

export default IdeaNewForm