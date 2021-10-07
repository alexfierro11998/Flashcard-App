import React from "react"
import {NavLink, useHistory} from "react-router-dom"
import { deleteDeck } from "../../utils/api"


function Deck({data, getDeck}){
    const abortController = new AbortController()
        const history = new useHistory()
        const handleDelete = event => {
            event.preventDefault()
             
            let currentDiv = event.target.parentNode.parentNode.parentNode.id;
            if(window.confirm("Are you sure you want to delete this deck?\nYou will not be able to recover it.\n")){
                deleteDeck(currentDiv, abortController.signal);
                getDeck();
            }
         
        }
    
        const returnData = data.map((currentData) => {
        
            
            return(<div class="mt-5 " id={currentData.id}><li key={currentData.id} class="card text-white bg-dark">
                <h2 class="m-3">{currentData.name}</h2>
                <p class="ml-3">{currentData.cards.length} cards</p>
                <p class="ml-3">{currentData.description}</p>
                <div class="mb-3 ml-3">
                <button class="btn btn-dark"><NavLink class="mr-2" to={`/decks/${currentData.id}/study`}>Study</NavLink></button>
                <button class="btn btn-dark"><NavLink class="mr-2" to={`/decks/${currentData.id}`}> View</NavLink></button>
                <button onClick={handleDelete} class="btn btn-dark text-primary">Delete</button>
                
                </div>
            </li></div>)
        })

        return(
   
            
            <div>
                <ul class="list-unstyled mt-4">{returnData}</ul>
            </div>
            
            
        )
    
    
}
export default Deck