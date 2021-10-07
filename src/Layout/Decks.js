// import Deck from "./Deck"
import React from "react" 
import {Route, Link} from "react-router-dom"
import Deck from "./DecksAndCards/Deck"
import BreadCrumb from "./HeaderAndBreadCrumb/BreadCrumb"
function Decks({decks,deleteDeck, getDeck}){  
   
    return(<section>
            <Route>
            <BreadCrumb/>
                <button type="button" class="btn btn-light text-white"><Link to="/decks/new">&#x2795; Create Deck</Link></button>
                <Deck data={decks} deleteDeck={deleteDeck} getDeck={getDeck}/>
            </Route>
        </section>
    )
}
export default Decks