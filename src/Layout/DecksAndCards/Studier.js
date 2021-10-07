import React, {useState} from "react"
import{useParams, useHistory} from "react-router-dom"
import BreadCrumb from "../HeaderAndBreadCrumb/BreadCrumb";
function Studier({decks, cards}){
   
    const [currentCard, setCurrentCard] = useState(cards[0]);
    const [currentSide, setCurrentSide] = useState(true);
    const {deckId} = useParams();
    const hist = useHistory()
    const found = decks.find(current => {
        if(current.id === Number(deckId)){
            return current
        }
    })
    console.log(found)
    function nextCard() {
        if(currentIndex < (cards.length-1)){
            setCurrentCard(cards[currentIndex+1])
        }
        setCurrentSide(true)
    }
    function handleShift(event)  {
        event.preventDefault()
        setCurrentSide(!currentSide)
    }
    const currentIndex = cards.reduce((accu, current, index)=> {
        if(current.id === currentCard.id){
            accu = index;
        }
        return accu;
    }, 0)
    const nextButton = currentCard === cards[cards.length-1] ? <button onClick={() => {hist.push("/")}}class="btn btn-primary m-4">Return Home</button> : <button onClick={nextCard} class="btn btn-primary m-4">Next</button>
    return <div>
        <BreadCrumb type={'studyDeck'} decks={decks} title={found.name}/>
        <h2 class="m-3">{found.name}</h2>
        <div class="border ">
            <h4 class="m-4">Card {currentIndex+1} of {cards.length}</h4>
            <p class="m-4">{currentSide ? currentCard.front : currentCard.back} </p>
            <div class="d-flex justify-content-around">
            <button onClick={handleShift} class="btn btn-secondary m-4">Flip</button>
            {!currentSide ? nextButton : null}
            </div>
        </div>
        
    </div>
}
export default Studier