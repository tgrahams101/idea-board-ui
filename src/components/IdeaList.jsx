import React, {Component} from 'react';
import axios from 'axios';
import Idea from './Idea.jsx';
import IdeaNewForm from './IdeaNewForm.js';

class IdeaList extends Component {
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

    deleteIdea = async (event, ideaId, index) => {
        console.log(event, ideaId, index);
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

    createIdea = async (...args) => {
        args[1].preventDefault();
        console.log(args, args.length);
        console.log(...args);
        // console.log('IDEA', idea);
        // try {
        //     const newIdeaResponse = await axios.post(`/ideas`, idea)
    
        //     const updatedIdeasList = [...this.state.ideas]
        //     updatedIdeasList.push(newIdeaResponse.data)
        //     this.setState({ideas: updatedIdeasList})
    
        // } catch(error) {
        //     console.log('Error creating new User!')
        //     console.log(error)
        // }
    }

	render() {
	    return (
	        <div>
	            <h1>Idea Board</h1>
            <IdeaNewForm createIdea={this.createIdea} />
                
                { this.state.ideas.map( (element, index) => {
                    return <Idea {...element} key={index} index={index} deleteIdea={this.deleteIdea} createIdea={this.createIdea}/>
                })}
	        </div>
	    )
	}
}

export default IdeaList