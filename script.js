const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Loading loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loader and bring quoteContainer
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Quotes from api
async function getQuote() {
    loading();
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://dummyjson.com/quotes/random";
  try {
    const respond = await fetch(apiUrl);
    const data = await respond.json();

    console.log(data.quote);

    //If Author is blank add 'unknown'

    if (data.author === "") {
      quoteAuthor.innerText = "Unknown";
    } else {
      quoteAuthor.innerText = data.author;
    }

    //reduce font size when quote is long
    if (data.quote.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quote;
  } catch (error) {
    console.log(error);
  }
  complete();
}

// Tweet Quotes
function tweetQuote() {
  const quote = quoteText.innerHTML;
  const author = quoteAuthor.innerHTML;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listner
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On loading
getQuote();
