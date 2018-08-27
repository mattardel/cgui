var portfolio = [];
var portfolio_tickers = [];


function getWholePortfolio (funds_closings, funds_dict, ticker1, ticker2) {
    // all fund functions can be used individually or all together here.
    // after calling,var portfolio is filled!
    getFirstCorrFund(funds_closings, funds_dict, ticker1);
    getSecondCorrFund(funds_closings, funds_dict, ticker2);
    getFinalFund(funds_closings, funds_dict);
}

function getFirstCorrFund (funds_closings, funds_dict, ticker1 = "null") {
    var firstTicker = ticker1;
    if (firstTicker === "null") {
        firstTicker = document.getElementById('ticker1').value;
    }
    var minCC = 1.0;  // 1 is the highest that a correlation coefficient can be
    var minCCTicker;
    var firstTickerClosings = funds_closings[firstTicker];


    count = 1;  // only funds # 1-39 are American Funds, # 40-49 are for the 5th portfolio spot
    for (ticker in funds_closings) {
        if (count++ === 40) {break;}

        currentTickerCC = calculateCorrelation(firstTickerClosings, funds_closings[ticker]);
        if (currentTickerCC < minCC) {
            minCC = currentTickerCC;
            minCCTicker = ticker;
        }
    }
    portfolio.push(funds_dict[firstTicker], funds_dict[minCCTicker]);
    portfolio_tickers.push(firstTicker, minCCTicker);


    // UGLY UGLY TEMP STUFF VERY UGGO
    // TEMPORARY - displays the current portfolio after 1 user selection
    document.getElementById('p1').innerHTML = funds_dict[firstTicker];
    document.getElementById('p2').innerHTML = funds_dict[minCCTicker];

    // TEMPORARY - disgustingly create dropdown for choice2
    var reducedFunds = funds_dict;
    delete reducedFunds[firstTicker];
    delete reducedFunds[minCCTicker];

    var choice2Str = "";
    for (ticker in reducedFunds) {
        choice2Str = choice2Str.concat("<option value=" + ticker + ">" + reducedFunds[ticker] + "</option>");
    }
    document.getElementById("ticker2").innerHTML = choice2Str;
    // UGGO PART IS OVER
}

function getSecondCorrFund (funds_closings, funds_dict, ticker2 = "null") {
    var secondTicker = ticker2;
    if (secondTicker === "null") {
        secondTicker = document.getElementById('ticker2').value;
    }
    var minCC = 1.0;  // 1 is the highest that a correlation coefficient can be
    var minCCTicker;
    var secondTickerClosings = funds_closings[secondTicker];


    count = 1;  // only funds # 1-39 are American Funds, # 40-49 are for the 5th portfolio spot
    for (ticker in funds_closings) {
        if (count++ === 40) {break;}

        currentTickerCC = calculateCorrelation(secondTickerClosings, funds_closings[ticker]);
        if (currentTickerCC < minCC) {
            minCC = currentTickerCC;
            minCCTicker = ticker;
        }
    }
    portfolio.push(funds_dict[secondTicker], funds_dict[minCCTicker]);
    portfolio_tickers.push(secondTicker, minCCTicker);


    // TEMPORARY - displays the current portfolio after 2 user selections
    document.getElementById('p3').innerHTML = funds_dict[secondTicker];
    document.getElementById('p4').innerHTML = funds_dict[minCCTicker];
    getFinalFund(funds_closings, funds_dict);
    // not as ugly
}

function getFinalFund (funds_closings, funds_dict) {
    // function to find an appropriate non-American Fund fund
    // Non-American Fund funds are # 39-49 in funds_dict obj
    // calculate CC each of the 10 Non-AF funds against the 4 portfolio funds
    //      find avg CC, compare it against current lowest avg cc
    var minAvgCC = 1.0;
    var minAvgCCTicker;

    count = 1;
    for (ticker in funds_closings) {
        if (count++ < 39) {continue;}

        var corrCoefs = 0.0;
        for (var i = 0; i < portfolio_tickers.length; i++) {
            corrCoefs = corrCoefs + calculateCorrelation(funds_closings[ticker], funds_closings[portfolio_tickers[i]]);
        }
        var currAvgCC = corrCoefs/4;
        if (currAvgCC < minAvgCC) {
            minAvgCC = currAvgCC;
            minAvgCCTicker = ticker;
        }
    }
    portfolio.push(funds_dict[minAvgCCTicker]);
    portfolio_tickers.push(minAvgCCTicker);

    // TEMPORARY - displays the current portfolio after determining 5th spot
    document.getElementById('p5').innerHTML = funds_dict[minAvgCCTicker];
    // not as ugly
}

// x, y = array of closing prices for fund1, fund2
function calculateCorrelation (x, y) {
    var shortestArrayLength = 0;

    if(x.length == y.length) {
        shortestArrayLength = x.length;
    } else if(x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it');
    }

    var xy = [];
    var x2 = [];
    var y2 = [];

    for(var i=0; i<shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }

    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;

    for(var i=0; i< shortestArrayLength; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += xy[i];
        sum_x2 += x2[i];
        sum_y2 += y2[i];
    }

    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt(step2 * step3);
    var answer = step1 / step4;

    return answer;
}

/* ---- Portfolio Animation ---- */

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Updates left hand side "Your Pick" circle 1
function updateYourPick1() {
    var fundTicker1 = document.getElementById("firstPick").value;
    document.getElementById("left-1").innerHTML = fundTicker1;
	document.getElementById("left-1").style.background = "brown";
	document.getElementById("left-1").style.color = "white";
}

// Updates left hand side "Your Pick" circle 2
function updateYourPick2() {
    var fundTicker2= document.getElementById("secondPick").value;
    document.getElementById("left-2").innerHTML = fundTicker2;
	document.getElementById("left-2").style.background = "brown";
	document.getElementById("left-2").style.color = "white";
}

// Calculates other 3 funds and updates right hand side circles 1-3
function calculateRemaining() {
	document.getElementById("directions").innerHTML = "Calculating the best mutual funds to balance your portfolio risk...";
	/* Call math logic*/
}

function showAmericanFunds() {
	document.getElementById("directions").innerHTML = "We found 2 American Funds to balance out your risks!";
	document.getElementById("right-1").innerHTML = "TEMP 1";
	document.getElementById("right-2").innerHTML = "TEMP 2";
	document.getElementById("right-1").style.background = "brown";
	document.getElementById("right-2").style.background = "brown";
	document.getElementById("right-1").style.color = "white";
	document.getElementById("right-2").style.color = "white";
}

function showNonAmericanFunds() {
	document.getElementById("directions").innerHTML = "We also found 1 Non-American Fund to balance out your risks!";
	document.getElementById("right-3").innerHTML = "TEMP 3";
	document.getElementById("right-3").style.background = "gray";
	document.getElementById("right-3").style.color = "white";
}

function showPortfolio() {
	location.replace("full-portfolio.html");
}

function colorPortfolio() {
	document.getElementById("portfolio-1").innerHTML = "TEMP 1";
	document.getElementById("portfolio-2").innerHTML = "TEMP 2";
	document.getElementById("portfolio-3").innerHTML = "TEMP 3";
	document.getElementById("portfolio-4").innerHTML = "TEMP 4";
	document.getElementById("portfolio-5").innerHTML = "TEMP 5";

	document.getElementById("portfolio-1").style.background = "gray";
	document.getElementById("portfolio-2").style.background = "brown";
	document.getElementById("portfolio-3").style.background = "brown";
	document.getElementById("portfolio-4").style.background = "brown";
	document.getElementById("portfolio-5").style.background = "brown";

	document.getElementById("portfolio-1").style.color = "white";
	document.getElementById("portfolio-2").style.color = "white";
	document.getElementById("portfolio-3").style.color = "white";
	document.getElementById("portfolio-4").style.color = "white";
	document.getElementById("portfolio-5").style.color = "white";
}

function resetScale() {
	document.getElementById("directions").innerHTML = "If one of your funds fail, the rest of your funds will not be affected and vice versa. Your portfolio is BALANCED!";
	document.getElementById("scale-line").classList.remove("scale-animation");
}

function showDone() {
	location.replace("done.html");
}

function startOver() {
	location.replace("seesaw.html");
}