/**
 * Stores passed in value into local storage with name passed in as string.
 */
function store_Value(val, name)
{
	this.value = val;
	localStorage.setItem(name, this.value);
}

function store_Array(array, name)
{
	let JSONformat = JSON.stringify(array);
	localStorage.setItem(name, JSONformat);
}