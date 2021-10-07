import{ useParams, useHistory, useRouteMatch} from "react-router-dom"

export default function BreadCrumb({type, title}){
    const {deckId} = useParams();
    
    const hist = useHistory();
    console.log(hist)
    
    function goHome(event){
        event.preventDefault();
        
        hist.push("/");
    }

    function backToDeck(event){
        event.preventDefault();
        hist.push(`/decks/${deckId}`)
    }
    const separator = <button disabled class=" btn text-muted mx-2">/</button>

    //below is logic for breadcrumb of different pages

    if(type==='editDeck'){  
        return (<nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <button class="btn " onClick={goHome}>&#127968;</button>
            </li>
            {separator}
            <button class="btn breadcrumb-item" onClick={backToDeck}>{title}</button>
            {separator}
            <button class="btn text-muted" disabled>Edit Deck</button>
        </ol>
    </nav>)   
    }
    if(type==='createDeck'){
        return (<nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <button class="btn " onClick={goHome}>&#127968;</button>
            </li>
            {separator}
            
            <button class="btn text-muted" disabled>Create Deck</button>
        </ol>
    </nav>) 
    }

    if(type === 'viewDeck'){
        return (<nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <button class="btn " onClick={goHome}>&#127968;</button>
            </li>
            {separator}
            <li class="text-muted breadcrumb-item">
                <button class= "btn" disabled>{title}</button>
            </li>
        </ol>
    </nav>)  
    }
    if(type==='studyDeck'){
        return (<nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <button class="btn " onClick={goHome}>&#127968;</button>
            </li>
            {separator}
            <button class="btn breadcrumb-item" onClick={backToDeck}>{title}</button>
            {separator}
            <button class="btn text-muted" disabled>Study</button>
        </ol>
    </nav>)
    }
    if(type==='editCard'){
        return (<nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <button class="btn " onClick={goHome}>&#127968;</button>
            </li>
            {separator}
            <button class="btn breadcrumb-item" onClick={backToDeck}>{title}</button>
            {separator}
            <button class="btn text-muted" disabled>Edit Card</button>
        </ol>
    </nav>)
    }
    if(type === 'createCard'){
        return (<nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <button class="btn " onClick={goHome}>&#127968;</button>
            </li>
            {separator}
            <button class="btn breadcrumb-item" onClick={backToDeck}>{title}</button>
            {separator}
            <button class="btn text-muted" disabled>Study</button>
        </ol>
    </nav>)
    }
    return <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <button class="btn " onClick={goHome}>&#127968;</button>
            </li>
        </ol>
    </nav>
   
}