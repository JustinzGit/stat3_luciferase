export default function Errors({ messages }){
    return(
        <div>
            {messages.length !== 0 && <h2 style={{color: 'red'}}>Error!</h2>}
            {messages.map(message => <p><b>{message}</b></p>)}
        </div>
    )
}