var quote = document.getElementById("quote");
var img = document.getElementById("bg");

var quoteArray = [];
var index = 1;
var quoteText = "";

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
    qouteText = quoteArray[index];
    if(validURL(qouteText)){
        var imgStr = "URL(" + qouteText + ")";
        quote.style.content = imgStr;
        quote.innerHTML = '';
    }else{
        quote.style.content = '';
        quote.innerHTML = qouteText;
    }
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

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
