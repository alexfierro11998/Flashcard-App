import {Link, useHistory, useParams, useRouteMatch} from "react-router-dom"
import {listCards, deleteCard, deleteDeck} from "../../utils/api"
import React, {useEffect, useState} from "react";
import BreadCrumb from "../HeaderAndBreadCrumb/BreadCrumb";
function ViewWhole({data, signal, getDeck}){
    console.log(data)
    const {deckId} = useParams();
    const history = new useHistory()
    const {url} = useRouteMatch()
    
    const [cards, setCards] = useState([])
    
    useEffect(() => {
        const abortControl = new AbortController();
        async function getCards() {
            try{
                const response = await listCards(deckId, abortControl.signal)
                setCards(response)
            }catch(e){
                if(e.name ==="AbortError"){
                    throw e
                }
            }
        }
        getCards();
        return () => {
            abortControl.abort();
        }
    }, [])
    async function handleDeckDelete(event){
        event.preventDefault();
        if(window.confirm("Are you sure you want to delete this deck?\n You will not be able to retrieve it?\n")){
            await deleteDeck(deckId, signal)
            getDeck();
            history.push("/")
        }
    }
    async function handleDelete(event){
        event.preventDefault();
        if(window.confirm("Are you sure you want to delete this deck?\n You will not be able to retrieve it?\n")){
            const id = event.target.parentNode.parentNode.id;
            await deleteCard(id, signal)
            history.go(0);
        }
    }
    const listOfCards = <ul class="list-unstyled">{cards.map(current => {
        return <li id={current.id}>
            <div class="bg-light" id={current.id}>
                <div class="d-flex justify-content-between">
                    <p>{current.front}</p>
                    <p>{current.back}</p>
                </div>
                <div class="d-flex align-items-end">
                    <Link to={`${url}/cards/${current.id}/edit`}class="btn btn-secondary">Edit</Link>
                    <button onClick={handleDelete} class="btn btn-danger mx-3">Delete</button>
                </div>
            </div>
        </li>
    })}</ul>
    const ifreturn = <div><h2 class="mt-4 mb-2">Cards</h2>
    {listOfCards}</div>
    const currentData = data.find(current => {
        if(current.id === Number(deckId)) return current
    })
    if(cards && currentData){
        return (
            <div>
                <BreadCrumb type={'viewDeck'} title={currentData.name}/>
                <h3>{currentData.name}</h3>
                <p>{currentData.description}</p>
                <div>
                    <Link to={`/decks/${deckId}/edit`}class="btn btn-primary mr-2">Edit</Link>
                    <Link to={`/decks/${deckId}/study`} class="btn btn-primary mx-2">Study</Link>
                    <Link to={`/decks/${deckId}/cards/new`} class="btn btn-primary mx-2">Add Cards</Link>
                    <button onClick={handleDeckDelete}class="btn btn-danger">Delete</button>
                </div>
                {cards.length > 0 ? ifreturn : null}
            </div>
        )
    }
    return <h1>Loading...</h1>
    
    
}
export default ViewWhole