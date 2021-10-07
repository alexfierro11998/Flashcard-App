
import Header from "./HeaderAndBreadCrumb/Header";
import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NotFound from "./NotFound";
import Decks from "./Decks";
import Form from "./Form";
import BreadCrumb from "./HeaderAndBreadCrumb/BreadCrumb";
import {createDeck, listDecks} from "../utils/api";
import ViewDecks from "./DecksAndCards/ViewDecks"

function Layout() {
  
  const [decks, setDecks] = useState([]);
  const abortController = new AbortController();
  const history = useHistory();
  const signal = abortController.signal;
  useEffect(() => {
		getDeck();

		return () => {
			abortController.abort();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [decks.length]);
  async function getDeck() {
		try {
			const response = await listDecks(signal);
			setDecks(response);
		}
		catch(error) {
			if(error.name !== "AbortError") {
				throw error;
			}
		}
	}

  async function addDeck(deck){
    const done = await createDeck(deck, signal);
    getDeck();
    return done.id;
  }


  async function deleteDeck(id){
    if(window.confirm(`Delete this deck?\nYou will not be able to recover it.`)){
      await deleteDeck(id, signal);
      getDeck();
      history.push("/");
    }
  }

  

  return (
    <Fragment>
      <Header />
      <div class="container">
      
      <Switch>
        <Route exact path="/">
          <Decks decks={decks} deleteDeck={deleteDeck} getDeck={getDeck}/>
        </Route>
        <Route path="/decks/new">
          
          <Form type="deck" edit={false} decks={decks} getDeck={getDeck} createDeck={addDeck} signal={signal} />
        </Route>
        <Route path="/decks/:deckId">
          
          <ViewDecks decks={decks} signal={signal} getDeck={getDeck}/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
