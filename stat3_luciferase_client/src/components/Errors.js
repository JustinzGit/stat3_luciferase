export default function Errors({ messages }){
    return(
        <div>
            {<h2 style={{color: 'red'}}>Error!</h2>}
            {messages.map((message, index) => <p key={index}><b>{message}</b></p>)}
        </div>
    )
}