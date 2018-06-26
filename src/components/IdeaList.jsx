import React, {Component} from 'react';
import axios from 'axios';
import Idea from './Idea.jsx';
import IdeaNewForm from './IdeaNewForm.js';

class IdeaList extends Component {
    constructor() {
        super();
        this.updateIdea = this.updateIdea.bind(this);
    }
	state = {
		ideas: []
	}
    
    async componentDidMount() {
        axios.get('/ideas')
            .then( (response) => {
                this.setState({ideas: response.data});
                console.log(this.state);
            })
            .catch( (error) => {
                console.log('Error retrieving ideas!');
                console.log(error);
            });
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('CURRENT STATE', this.state);
        console.log('NEXT STATE', nextState);
        console.log('IS EQUAL', this.state.ideas[0] === nextState.ideas[0]);
    }

    deleteIdea = async (ideaId, index) => {
        console.log('IDEA ID', ideaId);
        console.log('INDEX', index);
        try {
            await axios.delete(`/ideas/${ideaId}`)
            
            const updatedIdeasList = [...this.state.ideas]
            updatedIdeasList.splice(index, 1)
            this.setState({ideas: updatedIdeasList})
            
        } catch (error) {
            console.log(`Error deleting Idea with ID of ${ideaId}`)
            console.log(error)
        }
    }

    createIdea = async (newIdea, event) => {
        event.preventDefault();
        console.log('IDEA', newIdea);
        try {
            const newIdeaResponse = await axios.post(`/ideas`, newIdea)
            console.log('DATA FIELD FROM POST', newIdeaResponse.data);
            const firstObj = this.state.ideas[0];
            const updatedIdeasList = [...this.state.ideas]
            updatedIdeasList.push(newIdeaResponse.data)
            this.setState({ideas: updatedIdeasList})
    
        } catch(error) {
            console.log('Error creating new User!')
            console.log(error)
        }
    }

    handleIdeaChange = (index, event) => {
        console.log('INDEX', index);
        console.log('EVENT', event);
        const attributeToChange = event.target.name;
        const newValue = event.target.value;

        const updatedIdeasList = [...this.state.ideas];
        const ideaToUpdate = updatedIdeasList[index];
        ideaToUpdate[attributeToChange] = newValue;
        this.setState({ideas: updatedIdeasList});
    }

    async updateIdea(index) {
        try {
            const ideaToUpdate = this.state.ideas[index];
            let response = await axios.patch(`/ideas/${ideaToUpdate.id}`, ideaToUpdate);
            console.log('RESPONSE FROM PATCH', response);
            console.log('DATA FIELD FROM PATCH', response.data)
        } catch(error) {
            console.log('Error updating Idea!', error);
        }
    }

	render() {
	    return (
	        <div>
	            <h1>Idea Board</h1>
            <IdeaNewForm createIdea={this.createIdea} />
                
                { this.state.ideas.map( (element, index) => {
                    return <Idea {...element} key={index} title={element.title} index={index} handleIdeaChange={this.handleIdeaChange} deleteIdea={this.deleteIdea} createIdea={this.createIdea} updateIdea={this.updateIdea}/>
                })}
	        </div>
	    )
	}
}

export default IdeaList