import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Studier from "./Studier";
const {listCards} = require("../../utils/api/index")


function StudyComponent({decks}){
    const [cards, setCards] = useState([])
    const abort = new AbortController()
    const {deckId} = useParams()
    console.log(deckId)
    useEffect(() => {
    async function getDecks(){
        try{
            const response = await listCards(deckId, abort.signal)
            setCards(response);
        }catch(e){
            if(e.name !== "AbortError"){
                throw e
            }
        }
    }
    getDecks();
    return function() {
        abort.abort();
    }}, [])
    
    
    if(cards.length >= 3){
        return <Studier decks={decks} cards={cards}/>
    }
    return <div>
        <h2>React Router: Study</h2>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
        <button class="btn btn-primary"><Link to={`/decks/${deckId}/cards/new`}style={{ color: '#FFF' }}>&#x2795; Add Cards</Link></button>
    </div>
}

export default StudyComponent