/* ---- Portfolio Logic ---- */

var user_funds = {};
var AF_funds = {};
var nonAF_fund = {};
var allTickers = [];


function getFirstCorrFund (funds_closings, funds_dict, ticker1 = false) {
    var firstTicker = ticker1;
    if (!firstTicker) {
        firstTicker = document.getElementById('firstPick').value;
    }
    user_funds[firstTicker] = funds_dict[firstTicker];
    allTickers.push(firstTicker);

    var reducedFunds = funds_dict;
    delete reducedFunds[firstTicker];
    render2ndPickOptions(reducedFunds);
}


function getSecondCorrFund (funds_closings, funds_dict, ticker2 = false) {
    var secondTicker = ticker2;
    if (!secondTicker) {
        secondTicker = document.getElementById('secondPick').value;
    }
    user_funds[secondTicker] = funds_dict[secondTicker];
    allTickers.push(secondTicker);
}


function compareFunds (funds_closings, funds_dict, selection) {
    var minCC = 1.0;  // 1 is the highest that a correlation coefficient can be
    var minCCTicker;
    var selectionClosings = funds_closings[selection];

    count = 1;  // only funds # 1-39 are American Funds, # 40-49 are for the 5th portfolio spot
    for (ticker in funds_closings) {
        if (count++ === 40) {break;}

        currentTickerCC = calculateCorrelation(selectionClosings, funds_closings[ticker]);
        if (currentTickerCC < minCC) {
            minCC = currentTickerCC;
            minCCTicker = ticker;
        }
    }

    AF_funds[minCCTicker] = funds_dict[minCCTicker];
    allTickers.push(minCCTicker);
}


function render2ndPickOptions(reducedFunds) {
    var choice2Str = "";
    for (ticker in reducedFunds) {
        choice2Str = choice2Str.concat("<option value=" + ticker + ">" + reducedFunds[ticker] + "</option>");
    }
    document.getElementById("secondPick").innerHTML = choice2Str;
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
        for (var i = 0; i < 4; i++) {
            corrCoefs = corrCoefs + calculateCorrelation(funds_closings[ticker], funds_closings[allTickers[i]]);
        }
        var currAvgCC = corrCoefs/4;
        if (currAvgCC < minAvgCC) {
            minAvgCC = currAvgCC;
            minAvgCCTicker = ticker;
        }
    }
    nonAF_fund[minAvgCCTicker] = funds_dict[minAvgCCTicker];
    allTickers.push(minAvgCCTicker);
}


// Calculates other 3 funds and updates right hand side circles 1-3
function calculateRemaining(funds_closings, funds_dict) {
	document.getElementById("directions").innerHTML = "Calculating the best mutual funds to balance your portfolio risk...";

	// Call math logic
	reducedFunds = funds_dict;
	for (var fund in user_funds) {
	    delete reducedFunds[fund];
	}

	for (var fund in user_funds) {
        compareFunds(funds_closings, reducedFunds, fund);
	}

    finalReducedFunds = reducedFunds;
    for (var fund in AF_funds) {
        getFinalFund(funds_closings, finalReducedFunds);
    }

    // Show in animation
	showAmericanFunds();
	showNonAmericanFunds();
	resetScale();
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
	document.getElementById("left-1").style.background = "#009bde";
	document.getElementById("left-1").style.color = "white";
}

// Updates left hand side "Your Pick" circle 2
function updateYourPick2() {
    var fundTicker2= document.getElementById("secondPick").value;
    document.getElementById("left-2").innerHTML = fundTicker2;
	document.getElementById("left-2").style.background = "#009bde";
	document.getElementById("left-2").style.color = "white";
}

function showAmericanFunds() {
	count = 1;
	for (var fund in AF_funds) {
	    document.getElementById("right-" + count.toString()).innerHTML = fund;
	    count++;
	}
	document.getElementById("right-1").style.background = "#009bde";
	document.getElementById("right-2").style.background = "#009bde";
	document.getElementById("right-1").style.color = "white";
	document.getElementById("right-2").style.color = "white";
}

function showNonAmericanFunds() {
    for (var fund in nonAF_fund) {
        document.getElementById("right-3").innerHTML = fund;
    }
	document.getElementById("right-3").style.background = "#777777";
	document.getElementById("right-3").style.color = "white";
}

function showPortfolio() {
	var animationBoard1 = document.getElementById('animation-board-1');
	var animationBoard2 = document.getElementById('animation-board-2');
	animationBoard1.style.display = "none";
    animationBoard2.style.display = "block";

}

function colorPortfolio() {
	document.getElementById("portfolio-1").innerHTML = "TEMP 1";
	document.getElementById("portfolio-2").innerHTML = "TEMP 2";
	document.getElementById("portfolio-3").innerHTML = "TEMP 3";
	document.getElementById("portfolio-4").innerHTML = "TEMP 4";
	document.getElementById("portfolio-5").innerHTML = "TEMP 5";

	document.getElementById("portfolio-1").style.background = "#777777";
	document.getElementById("portfolio-2").style.background = "#009bde";
	document.getElementById("portfolio-3").style.background = "#009bde";
	document.getElementById("portfolio-4").style.background = "#009bde";
	document.getElementById("portfolio-5").style.background = "#009bde";

	document.getElementById("portfolio-1").style.color = "white";
	document.getElementById("portfolio-2").style.color = "white";
	document.getElementById("portfolio-3").style.color = "white";
	document.getElementById("portfolio-4").style.color = "white";
	document.getElementById("portfolio-5").style.color = "white";
}

function resetScale() {
	document.getElementById("directions").innerHTML = "We selected 2 Funds from American Funds and 1 non-American Fund.  If one of your funds fail, the rest of your funds will not be affected and vice versa. Your portfolio is BALANCED!";
	document.getElementById("scale-line").classList.remove("scale-animation");
}

function resetPicks() {
    var fundTicker1= document.getElementById("firstPick").value;
    var fundTicker2= document.getElementById("secondPick").value;
    document.getElementById("left-1").innerHTML = "Your Pick";
    document.getElementById("left-2").innerHTML = "Your Pick";
	document.getElementById("left-2").style.background = none;
	document.getElementById("left-2").style.color = "white";

function startOver() {
	var animationBoard1 = document.getElementById('animation-board-1');
	var animationBoard2 = document.getElementById('animation-board-2');
	animationBoard1.style.display = "block";
    animationBoard2.style.display = "none";
}