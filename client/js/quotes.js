let pastQuotes = [];	// Create an array to store already used quotes.

/**
 * Get a random quote. Make sure that the previous quote is not the same.
 */
function getQuote() 
{	// Generate a random number from 0 - QUOTE.length - 1.
	let num = Math.floor((Math.random() * QUOTE.length)); 
	let duplicate = false;
	// Jump through each used quote and generate a random number that has not been used already.
	do {
		duplicate = false;
		for(let i = 0; i < pastQuotes.length; i++) { 	
			// Check if the generated number has been used.
			if(num === pastQuotes[i]) {
				duplicate = true;
			}
		}
		// Generate a new number as it has been used and then check again.
		if(duplicate) {
			num = Math.floor((Math.random() * QUOTE.length)); 
		}
	} while(duplicate);

	pastQuotes.push(num);

	if(pastQuotes.length === QUOTE.length) {
		pastQuotes = [];
	}

	generateQuote(QUOTE[num].quote, QUOTE[num].source);
}



/**
 * Updates the quote displayed
 */
function generateQuote(quote, source)
{
	this.quote = '"' + quote + '"';
	this.source = '-- ' + source;

	// Update quote and source.
	$('#quote').text(this.quote);
	$('#source').text(this.source);
}



const QUOTE = [
	{
		"quote": "Nothing is of greater importance that the conservation of human life.",
		"source": "Former U.S. President Calvin Coolidge"
	},
	{
		"quote": "The danger which is least expected soonest comes to us.",
		"source": "Voltaire, French dramatist, poet and reformer born in 1694"
	},
	{
		"quote": "Technology is moving at a much faster clip than our laws can keep up with.",
		"source": "Deborah Hersman, President and CEO of the National Safety Council"
	},
	{
		"quote": "At the end of the day, the goals are simple: Safety and security.",
		"source": "Jodi Rell, former Governor of Connecticut"
	},
	{
		"quote": "The safety of the people shall be the highest law.",
		"source": "Marcus Tullius Cicero, Roman philosopher born in 106 BC"
	},
	{
		"quote": "Shallow men believe in luck; wise and strong men in the cause and effect.",
		"source": "Ralph Waldo Emerson"
	},
	{
		"quote": "Someone is sitting in the shade today because someone planted a tree a long time ago.",
		"source": "Warren Buffett, investor and philanthropist"
	},
	{
		"quote": "Safety work is today recognized as an economic necessity. It is the study of the right way to do things.",
		"source": "Robert W. Campbell, first president of the National Safety Council"
	},
	{
		"quote": "Obedience is the mother of success and is wedded to safety.",
		"source": "Aeschylus"
	},
	{
		"quote": "Less intelligence capacity equals less safety.",
		"source": "Mike Pompeo"
	},
	{
		"quote": "For safety is not a gadget but a state of mind.",
		"source": "Eleanor Everet"
	},
	{
		"quote": "Safety is as simple as ABC - Always Be Careful.",
		"source": "Colorado School of Mines Magazine"
	},
	{
		"quote": "The dangers of life are infinite, and among them is safety.",
		"source": "Goethe"
	},
	{
		"quote": "Safety first is safety always.",
		"source": "Charles M. Hayes"
	},
	{
		"quote": "It is better to be safe than sorry.",
		"source": "American Proverb"
	},
	{
		"quote": "Precaution is better than cure.",
		"source": "Edward Coke"
	},
	{
		"quote": "There is always safety in valor.",
		"source": "Ralph Waldo Emerson"
	},
	{
		"quote": "Better a thousand times careful than once dead.",
		"source": "American Proverb"
	},
	{
		"quote": "One earnest worker can do more by personal suggestion to prevent accidents than a carload of safety signs.",
		"source": "Making Paper"
	},
	{
		"quote": "Safety brings first aid to the uninjured.",
		"source": "F.S. Hughes"
	},
	{
		"quote": "An incident is just the tip of the iceberg, a sign of a much larger problem below the surface.",
		"source": "Don Brown"
	},
	{
		"quote": "Prepare and prevent; don't repair and repent.",
		"source": "unknown"
	},
	{
		"quote": "If you put good people in bad systems, you get bad results. You have to water the flowers you want to grow.",
		"source": "Stephen Covey"
	},
	{
		"quote": "Working safely may get old, but so do those who practice it.",
		"source": "unknown"
	},
	{
		"quote": "It takes leadership to improve safety.",
		"source": "Jackie Stewart"
	}
]
