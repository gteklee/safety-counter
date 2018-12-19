/** JULY 24TH 2017 -- START DATE **/

//deleteStorage();

let IS_DATE_STARTED = false; // Has the start date been selected.
let START_DATE = "";		 // Date timer was started (first accident).
let LAST_ACCIDENT = "";		 // Date timer left off at. JS Version of Date.

let ACCIDENT_COUNT = 0;		 // Count of accidents.
let ACCIDENTS = [];			 // Array of the dates of all reported accidents
let JS_ACCIDENTS = [];		 // Array of the JS version of dates of all reported accidents

/**
 * JQUERY UI -------------------------------------------------------------------------------------------------------
 */
$(() => {
 	$('#datepicker').datepicker({
 		showOn: 'both',
 		buttonText: '<i class="fa fa-calendar" aria-hidden="true"></i>',
 		changeMonth: true,
 		changeYear: true,
 		dateFormat: 'MM d, yy'
 	});
});

// Report Accident calendar UI.
$(() => {
	$('#date_accident_report').datepicker({
		dateFormat: 'MM d, yy',
		onSelect: function(value, date)
		{
			// Hide date when selected
			$('#date_accident_report').hide();

			toggleHourSelection();
			//reportAccident();
		}
	});
});

//--------------------------------------------------------------------------------------------------------------------------
/**
 * Set values and default data within program.
 */
function setup()
{
	// Set today's date.
	this.today = $.datepicker.formatDate('MM d, yy', new Date()); // Today's date.
	$('#date_today').val(this.today); // Set today's date in input 'text' box.
	// Report accident calendar.
	$('#date_accident_report').hide(); // Hide report accident calendar
	$('.quote_console_open').hide();
	$('.hour_selection_container').hide();
	$('.quote_blur').hide();

	getLocalStorage();
}	



/**
 * This function is called when window is loaded.
 * All appropriate objects are centered based on screen height.
 */
function CenterObjects()
{
	// Window width and height.
	const HEIGHT = $(window).height();
	const WIDTH = $(window).width();

	// Object heights.
	const COUNTER_HEIGHT = $('.counter').innerHeight(); 	// Height of the .counter div.
	const QUOTE_HEIGHT = $('.quote').innerHeight();			// Height of the .quote div.
	let pos = ((HEIGHT - QUOTE_HEIGHT) - COUNTER_HEIGHT) / 2;
	// Set height position of .counter div
	$('.counter').css('margin-top', pos);

	// Admin console - Report date calendar.
	const CAL_WIDTH = $('#date_accident_report').innerWidth();
	const CAL_HEIGHT = $('#date_accident_report').innerHeight();
	pos = (WIDTH - CAL_WIDTH) / 2;
	$('#date_accident_report').css('right',pos);

	// Accident report button and display.
	const REP_WIDTH = $('.console_open').innerWidth();
	const TD_WIDTH = $('.console_data_open').innerWidth();
	const COUNT_WIDTH = $('.accident_count_button').innerWidth();
	pos = ((WIDTH - REP_WIDTH) / 2);
	$('.accident_count_container').css('right',pos);
	pos = (TD_WIDTH - COUNT_WIDTH) / 2;
	$('.accident_count_container').css('margin-right',pos);

	// Center accident count text.
	const HIS_BUTTON_HEIGHT = $('.accident_count_button').innerHeight();
	const HIS_BUTTON_TEXT_HEIGHT = $('.p_accident_count').innerHeight();
	pos = (HIS_BUTTON_HEIGHT - HIS_BUTTON_TEXT_HEIGHT) / 2;
	$('.p_accident_count').css('margin-top',pos);

	// Set width of update quote input elements.
	const INPUT_QUOTE_CONTAINER_WIDTH = $('.quote_console_open').innerWidth();
	pos = INPUT_QUOTE_CONTAINER_WIDTH - 34;
	$('.quote_input').css('width', pos);
}



/**
 * This function is called when the #console_button is clicked.
 * This hides the admin console.
 */
function hideConsole()
{
	$('.blur').toggle(); // Set background blur

	$('.console_open').toggleClass('console_close'); 				// Toggle between close and open.
	$('.fa-caret-down').toggleClass('fa-caret-up');	 				// Toggle the caret facing up / down.

	// Toggle table within the console.
	$('.console_table_open').toggleClass('.console_table_close');
	$('.console_row_open').toggleClass('.console_row_close');
	$('.console_data_open').toggleClass('.console_data_close');

	if($('#history').hasClass('accident_history_open'))
		$('.accident_history_close').toggleClass('accident_history_open')

	// Hide accident count history.
	$('.accident_count_button').slideToggle(400);

	$('#date_accident_report').hide();
}



/**
 * Sets the first accident, and starts the timer based
 * on set date.
 */
function setTimer()
{	
	if(confirm("Setting the start date will start the timer and report the date as the first accident! Are you sure you want to continue?") == false)
		$('#datepicker').val(START_DATE);
	else
	{

		// Start timer with date to start at.
		this.today = new Date();
		this.startDate = $('#datepicker').datepicker('getDate');

		if(!IS_DATE_STARTED)
		{
			if(this.startDate <= this.today)
			{
				LAST_ACCIDENT = this.startDate;
				store_Value(LAST_ACCIDENT, 'LAST_ACCIDENT');
				setLastAccident('datepicker');	// Set last (first) accident.
				startTimer(this.startDate);		// Start the timer.
				
				IS_DATE_STARTED = true;								// Set that start date has been selected.
				store_Value(IS_DATE_STARTED, 'IS_DATE_STARTED');
				START_DATE = $('#datepicker').val();				// Store the started date.
				store_Value(START_DATE, 'START_DATE');				// Store START_DATE in local storage.
				JS_ACCIDENTS[0] = this.startDate;
				store_Array(JS_ACCIDENTS, 'JS_ACCIDENTS');
				console.log(JS_ACCIDENTS);
			}
			else
			{
				$('#datepicker').val(START_DATE);
				alert("You are not able to choose a date after today.");
			}
		}
		else
		{
			if(this.startDate <= this.today) {
				alert("The date of the first accident will be updated to the date selected.");
				setLastAccident('datepicker'); // Reset first accident.
				START_DATE = $('#datepicker').val();				// Store the started date.
				store_Value(START_DATE, 'START_DATE');				// Store START_DATE in local storage.
				startTimer(this.startDate);		// Start the timer.
			}
			else
			{
				$('#datepicker').val(START_DATE);
				alert("You are not able to choose a date after today.");
			}
		}
	}

}



/**
 * Update quote and close console.
 */
function updateQuote()
{
	// Get Quote and Source text.
	let quote = $('#quote_input_quote').val();
	let src = $('#quote_input_src').val();

	// Add quotes if not provided.
	if(quote != '')
	{
		if(quote[0] != '"')
			quote = '"' + quote;

		if(quote[quote.length - 1] != '"')
			quote = quote + '"';
	}
	else
	{
		$('#quote_input_quote').css('border-color','red');
		return;
	}

	if(src != '')
		src = '-- ' + src;

	// Update quote and source.
	$('#quote').text(quote);
	$('#source').text(src);

	// Close quote and admin consoles.
	toggleQuoteConsole();
	hideConsole();
}



/**
 * Set the last reported accident.
 */
function setLastAccident(id)
{
	this.lastAccident = $('#'+id).val();

	// Store last accident in array, local storage, and update accident count.
	if(id == 'datepicker' && IS_DATE_STARTED == true) {
		console.log(ACCIDENTS[0]);
		ACCIDENTS[0] = this.lastAccident;
		console.log(ACCIDENTS[0]);
	}
	else {
		ACCIDENTS.push(this.lastAccident);
	}

	ACCIDENT_COUNT = ACCIDENTS.length;
	store_Value(ACCIDENT_COUNT, 'ACCIDENT_COUNT');	// Store accident count.
	store_Array(ACCIDENTS, 'ACCIDENTS');			// Store accident array.

	// Update history.
	updateHistory(ACCIDENTS[ACCIDENTS.length - 1]);
	$('#date_last_accident').val(ACCIDENTS[ACCIDENTS.length - 1]);

}



/**
 * Loop that keeps updating the timer every second.
 */
function startTimer(startDate)
{
	this.today = new Date();
	this.count = this.today - startDate;

	this.years = Math.floor((this.count / (60*60*1000*24*365)*1));
	this.days = Math.floor((this.count / (60*60*1000*24)*1) % 365);									   // 365 Days
	this.hours = Math.floor(((this.count % (60*60*1000*24)) / ((60*60*1000)*1)));					   // 24 Hours
	this.minutes = Math.floor(((this.count % (60*60*1000*24) % ((60*60*1000)) / ((60*1000)*1))));	   // 60 Minutes
	this.seconds = Math.floor(((this.count % (60*60*1000*24) % (60*60*1000) % (60*1000)) / (1000*1))); // 60 Seconds

	// Add 0 in front if not double digit.
	if(this.days < 10 && this.days >= 0)
		this.days = '00' + this.days;
	else if(this.days < 100 && this.days >= 0)
		this.days = '0' + this.days;

	if(this.hours < 10 && this.hours >= 0)
		this.hours = '0' + this.hours;
	if(this.minutes < 10 && this.minutes >= 0)
		this.minutes = '0' + this.minutes;
	if(this.seconds < 10 && this.seconds >= 0)
		this.seconds = '0' + this.seconds;

	// Set all values for count up.
	$('#years').text(this.years);
	$('#days').text(this.days);
	$('#hours').text(this.hours);
	$('#minutes').text(this.minutes);
	$('#seconds').text(this.seconds);

	//if(this.days % 1 && this.hours == 0 && this.minutes == 0 && this.seconds == 0)
	if(this.hours == 0 && this.minutes == 0 && this.seconds == 0) {
		getQuote();
	}

	clearTimeout(startTimer.time);
	startTimer.time = setTimeout(() => {
		startTimer(startDate);
	}, 1000); // Keep calling the function every .5 seconds.
}



/**
 * Open the accident history (shows past accident dates)
 */
function toggleHistory()
{
	$('.accident_history_close').toggleClass('accident_history_open');
}



/**
 * Open the calendar if a starting date was selected.
 */
function toggleCalendar()
{
	if(IS_DATE_STARTED) {
		$('#date_accident_report').fadeToggle(500);
	} else {
		alert('You must select a start date (first accident)');
	}
}



/**
 * Open the hour selection console when accident is reported.
 */
function toggleHourSelection()
{
	$('.quote_blur').toggle();
	$('.hour_selection').val('');
	$('.hour_selection_container').fadeToggle(250);
}



/**
 * Open the quote console to update the quote and source.
 */
function toggleQuoteConsole()
{
	$('#quote_input_quote').css('border-color','black');
	$('.quote_blur').toggle();
	$('.quote_console_open').fadeToggle(250);
}



/**
 * Restart the timer and add date to history (last accident).
 */
function reportAccident()
{
	this.hour = $('.hour_selection').val();

	this.accidentDate = $('#date_accident_report').datepicker('getDate'); // Get JS version of date.
	this.accidentDate.setHours(this.hour);
	this.today = new Date();

	if(this.accidentDate <= this.today) {
		startTimer(this.accidentDate) // Start timer with new reported date.
		toggleHourSelection();

		// Store JS version of date as LAST_ACCIDENT
		LAST_ACCIDENT = this.accidentDate;
		store_Value(LAST_ACCIDENT, 'LAST_ACCIDENT');
		setLastAccident('date_accident_report');

		// Store JS version of date in local storage.
		JS_ACCIDENTS.push(this.accidentDate);
		store_Array(JS_ACCIDENTS, 'JS_ACCIDENTS');
	}
	else
		alert("You are not able to choose a date after today.");
}



/**
 * Remove last accident and replace last accident.
 */
function deleteLastAccident()
{
	if(IS_DATE_STARTED && ACCIDENTS.length > 1) {
		if(confirm("This will rollback the last accident! Are you sure you want to continue?")) {
			// Remove last accident from array.
			ACCIDENTS.pop(ACCIDENTS.length - 1);
			store_Array(ACCIDENTS, 'ACCIDENTS');

			// Update last accident in admin console and remove / update history.
			$('#date_last_accident').val(ACCIDENTS[ACCIDENTS.length - 1]);
			updateHistory();

			// Start timer with accident before last.
			JS_ACCIDENTS.pop(JS_ACCIDENTS.length - 1);
			let date = new Date(JS_ACCIDENTS[JS_ACCIDENTS.length - 1])
			console.log(JS_ACCIDENTS);
			startTimer(date);
			store_Array(JS_ACCIDENTS, 'JS_ACCIDENTS'); // Update local storage.

			// Update last accident.
			LAST_ACCIDENT = JS_ACCIDENTS[JS_ACCIDENTS.length - 1];
			store_Value(LAST_ACCIDENT, 'LAST_ACCIDENT');
		}
	}

}



/**
 * This adds passed in date to history and updates count.
 */
function updateHistory()
{
	$('.history_accident').remove(); // Delete all current divs.

	// Rewrite array to history.
	for(let i = (ACCIDENTS.length - 1); i >= 0; i--)
	{
		if(i === 0) {
			$('#history').append('<div class="history_accident"> <p id="p_history_id"> First Accident </p> <p id="p_history"> ' + ACCIDENTS[i] + ' </p> </div>');
		} else if(i === ACCIDENTS.length - 1) {
			$('#history').append('<div class="history_accident"> <p id="p_history_id"> Last Accident </p> <p id="p_history"> ' + ACCIDENTS[i] + ' </p> </div>');
		} else {
			$('#history').append('<div class="history_accident"> <p id="p_history_id"> ' + (i + 1) + ' </p> <p id="p_history"> ' + ACCIDENTS[i] + ' </p> </div>');
		}
	}
	$('.p_accident_count').text('Accident Count: ' + ACCIDENTS.length); // Update accident count.
}



/**
 * Updates current values with past values from past session.
 */
function getLocalStorage()
{
	// Set values based on local storage existance.
	console.log(localStorage.IS_DATE_STARTED);
	if(localStorage.IS_DATE_STARTED != undefined) {
		IS_DATE_STARTED = localStorage.IS_DATE_STARTED
	}

	console.log(localStorage.START_DATE);
	if(localStorage.START_DATE != undefined) {
		START_DATE = localStorage.START_DATE
		$('#datepicker').val(START_DATE);
		// Update date started - mainly as a fail safe.
		// This should already be updated based on local storage.
		IS_DATE_STARTED = true;
	}

	console.log(localStorage.LAST_ACCIDENT);
	if(localStorage.LAST_ACCIDENT != undefined) {
		LAST_ACCIDENT = new Date(localStorage.LAST_ACCIDENT);
	}

	console.log(localStorage.ACCIDENT_COUNT);
	if(localStorage.ACCIDENT_COUNT != undefined) {
		ACCIDENT_COUNT = localStorage.ACCIDENT_COUNT;
		$('.p_accident_count').text('Accident Count: ' + ACCIDENT_COUNT);
	}

	console.log(localStorage.ACCIDENTS);
	if(localStorage.ACCIDENTS != undefined)
	{
		const accidents_length = JSON.parse(localStorage.ACCIDENTS).length;

		for(let i = 0; i < accidents_length; i++) {
			ACCIDENTS[i] = JSON.parse(localStorage.ACCIDENTS)[i]; // Fill array.
		}

		for(let i = (ACCIDENTS.length - 1); i >= 0; i--) {
			if(i === 0) {
				$('#history').append('<div class="history_accident"> <p id="p_history_id"> First Accident </p> <p id="p_history"> ' + ACCIDENTS[i] + ' </p> </div>');
			} else if(i === ACCIDENTS.length - 1) {
				$('#history').append('<div class="history_accident"> <p id="p_history_id"> Last Accident </p> <p id="p_history"> ' + ACCIDENTS[i] + ' </p> </div>');
			} else {
				$('#history').append('<div class="history_accident"> <p id="p_history_id"> ' + (i + 1) + ' </p> <p id="p_history"> ' + ACCIDENTS[i] + ' </p> </div>');
			}
		}
		// Last accident based on array.
		$('#date_last_accident').val(ACCIDENTS[ACCIDENTS.length - 1]);
		// Set date started.
		$('#datepicker').val(ACCIDENTS[0]);
		// Update accident count.
		$('.p_accident_count').text('Accident Count: ' + ACCIDENTS.length);
		// Start timer based on what last accident.
		startTimer(LAST_ACCIDENT);
	}

	console.log(localStorage.JS_ACCIDENTS);
	if(localStorage.JS_ACCIDENTS != undefined) {
		const js_accidents_length = JSON.parse(localStorage.JS_ACCIDENTS).length;
		for(let i = 0; i < js_accidents_length; i++) {
			JS_ACCIDENTS[i] = JSON.parse(localStorage.JS_ACCIDENTS)[i]; // fill array.
		}
	}
}



//--------------------------------------------------------------------------------------------------------------------------
/**
 * 	EVENT LISTENERS
 */

// When the window loads.
$(window).on('load', () => {
	CenterObjects();
	setup();
});

// When the window is resized.
$(window).on('resize', () => {
	CenterObjects();
});

function deleteStorage()
{
	delete localStorage.LAST_ACCIDENT;
	delete localStorage.ACCIDENT_COUNT;
	delete localStorage.ACCIDENTS;
	delete localStorage.IS_DATE_STARTED;
	delete localStorage.START_DATE;
	delete localStorage.JS_ACCIDENTS;
}