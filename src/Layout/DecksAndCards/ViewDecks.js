import React, {useEffect, useState} from "react"
import {useParams,Route, Switch, useRouteMatch} from "react-router-dom"
import ViewWhole from "./ViewWhole"
import StudyComponent from "./StudyComponent"
import Form from "../Form"
const {listCards} = require("../../utils/api/index")





function ViewDecks({decks, signal, getDeck}){
    const { url, path } = useRouteMatch()
    const [cards, setCards] = useState([])
    const abort = new AbortController();
    const {deckId} = useParams()
    useEffect(() => {
        async function getCards(){
            try{
                const response = await listCards(deckId, abort.signal)
                
                setCards(response)
            }catch(e){
                if(e.name==="AbortError"){
                    throw e
                }
            }
        }
        getCards()
        
        return(() => {
            abort.abort()
        })
    }, [cards.length])
    return (<Switch>
        

        <Route path="/decks/:deckId/study">
            <StudyComponent decks={decks}/>
        </Route>

        <Route path="/decks/:deckId/cards/new">
            <Form type={"card"} getDeck={getDeck} decks={decks} cards={cards}/>
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
            <Form type={"card"} decks={decks} edit={true}/>
        </Route>
        <Route path="/decks/:deckId/edit">
            <Form type={'deck'} decks={decks} edit={true} getDeck={getDeck}/>
        </Route>
        <Route path="/decks/:deckId">
                <ViewWhole data={decks} signal={signal} getDeck={getDeck}/> 
            
        </Route>
        
      </Switch>
    )   
}
        

    


export default ViewDecks