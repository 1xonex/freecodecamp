
import { useEffect, useState} from 'react';
import './App.css';
import ColorsArray from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


var quoteDBlink = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const [quote, setQuote] = useState("Definiteness of purpose is the starting point of all achievement.");
  const [author, setAuthor] = useState("W. Clement Stone")
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c3')

  const fetchQuotes = async (link) => {
    const response = await fetch(link)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)}

  useEffect(() => {
    fetchQuotes(quoteDBlink)
  }, [quoteDBlink])

  const getRandomQuote = ()=> {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setAccentColor(ColorsArray[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
    }
  return (
    
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor, color: accentColor}}>
        <div id="quote-box">
        <p id="text">
          "{quote}"
        </p>
        <p id="author">
          - {author}
        </p>
        <div className='button'><a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
        <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a></div>

        <button id="new-quote" onClick={()=>getRandomQuote()}>Generate A Random Quote</button>
        </div>
      </header>
    </div>
  );
}

export default App;
