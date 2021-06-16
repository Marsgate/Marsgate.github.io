var quote = document.getElementById("quote");

var quoteArray = [];
var index = 1;

function readData(json) {
    var data = json.feed.entry;
    data.forEach(e => {
        var cell = e['gs$cell'];
        quoteArray.push(cell.$t)
    });
    shuffleArray(quoteArray);
    quote.innerHTML = quoteArray[0];
    setInterval(nextQuote, 4000);
}

function nextQuote(){
    quote.className = 'hidden';
    setTimeout(quoteReplace, 500);
}

function quoteReplace(){
    quote.innerHTML = quoteArray[index];
    index ++;
    if(index >= quoteArray.length){
        index = 0;
    }
    quote.className = '';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
