import React from "react"
import {useHistory, useParams} from "react-router-dom"
import BreadCrumb from "./HeaderAndBreadCrumb/BreadCrumb"
const {createCard, updateCard, updateDeck} = require("../utils/api/index")




function Form({decks, createDeck, signal, type, edit, getDeck, cards}){
    const hist = useHistory()
    const {cardId, deckId} = useParams();
    
    const title = decks.find(current => {
        if(current.id === Number(deckId)){
            return current
        }
    })
    async function handleInput(event){
        event.preventDefault()
        if(type==="deck"){
            const formData = new FormData(event.target)
            const deckName = formData.get("deckName")
            const deckDesc = formData.get("description")
            const deckData = {
                name: deckName,
                description: deckDesc,
                cards: [],
            }  
            await createDeck(deckData, signal)
            hist.push("/")
            getDeck()
        }
        if(type==="card"){
            const formData = new FormData(event.target)
            const cardFront = formData.get("deckName");
            const cardBack = formData.get("description")
            const cardData = {                
                front: cardFront,
                back: cardBack,
            }
            await createCard(deckId, cardData, signal)
            hist.go(-1)
            getDeck()
        }
        
    } 
    async function handleEdit(event){
        event.preventDefault()
        if(type==="deck"){
            const formData = new FormData(event.target)
            const cardFront = formData.get("deckName");
            const cardBack = formData.get("description")
            const cardData = {                
                name: cardFront,
                description: cardBack,
                id: deckId,
            }
            
            await updateDeck(cardData, signal)
            hist.go(-1)
        }
        if(type==="card"){
            const formData = new FormData(event.target)
            const cardFront = formData.get("deckName");
            const cardBack = formData.get("description")
            const cardData = {                
                front: cardFront,
                back: cardBack,
                id: cardId,
            }
            await updateCard(cardData, signal)
            hist.go(-1)
        }
    }    
    function cancel(event){
        event.preventDefault()
        hist.go(-1)
    }
    console.log(title)
    if(edit){
        return(
            <div htmlFor="form">
            <BreadCrumb type={type==="deck" ? "editDeck" : "editCard"} cards={cards} title={title.name}/>
            <h2>{type==="deck" ? "Edit Deck" : "Edit Card"}</h2>
            <form onSubmit={handleEdit}>
                <div class="form-group mt-3">
                    <label for="deckName">{type==="deck" ? "Deck Title" : "Front of Card"}</label>
                    <input type="name" class="form-control" name="deckName" id="deckName" aria-describedby="emailHelp" placeholder={type==="deck" ? "Deck Title" : "Front of Card"}/>
                </div>
                <div class="form-group">
                    <label for="description">{type==="deck" ? "Description" : "Back of Card"}</label>
                    <input type="textarea" rows="3" class="form-control" name="description" id="description" placeholder={type==="deck" ? "Description" : "Back of Card"}/>
                </div>
                <button  class="btn btn-secondary mr-4" onClick={cancel}>Cancel</button>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
    return(
        <div htmlFor="form">
            <BreadCrumb type={type==="deck" ? "createDeck" : "createCard"} />
            <h2>{type==="deck" ? "Create Deck" : "Create Card"}</h2>
            <form onSubmit={handleInput}>
                <div class="form-group mt-3">
                    <label for="deckName">{type==="deck" ? "Deck Title" : "Front of Card"}</label>
                    <input type="name" class="form-control" name="deckName" id="deckName" aria-describedby="emailHelp" placeholder={type==="deck" ? "Deck Title" : "Front of Card"}/>
                </div>
                <div class="form-group">
                    <label for="description">{type==="deck" ? "Description" : "Back of Card"}</label>
                    <input type="textarea" rows="3" class="form-control" name="description" id="description" placeholder={type==="deck" ? "Description" : "Back of the card"}/>
                </div>
                <button  class="btn btn-secondary mr-4" onClick={cancel}>Cancel</button>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Form