import { useEffect, useState } from 'react';
import './App.css'

const App = () => {
  const [quotes, setQuotes] = useState<{quote: string, author: string}[]>([])
  const [currentQuote, setCurrentQuote] = useState("Loading...")
  const [currentAuthor, setCurrentAuthor] = useState("Loading...")

  useEffect(() => {
    fetchQuotes()
  }, [])


  const fetchQuotes = async () => {
      const res = await (await fetch("https://dummyjson.com/quotes")).json()
      try {
        setQuotes(res["quotes"].map((el: { quote: string; author: string; }) => ({quote: el.quote, author: el.author})))
        
        const randomQuote = getRandomQuote()
        setCurrentAuthor(randomQuote.author);
        setCurrentQuote(randomQuote.quote);

      } catch (error) {
        console.log("Error on fetching quotes", error)
      }
  }


  const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * 30)];
  }

  const buttonClick = () => {
    const randomQuote = getRandomQuote()
    setCurrentAuthor(randomQuote.author);
    setCurrentQuote(randomQuote.quote);
  }


  return (
    <>
      <div id="quote-box">
      <p id="text">{currentQuote}</p>
      <p id="author">{currentAuthor}</p>
      <div className="button-container">
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentQuote)}`} target="_blank">
          Tweet this quote
        </a>
        <button onClick={buttonClick} id="new-quote">New Quote</button>
      </div>
      </div>
    </>
  )
}

export default App
