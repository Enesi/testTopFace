 //конструктор объекта Note
function Note(content, tags) 
{
	this.content = content;
	this.tags = tags;
}

//объект Note
Note.prototype = 
{
	/*includes: function(x) { 
		return this.from <= x && x <= this.to; },

	foreach: function(func, objectToWrite) {
		for(var x = Math.ceil(this.from); x <= this.to; x++) 
			func.call(objectToWrite, x);
	},

	toString: function() { 
		return "Диапазон (" + this.from + "..." + this.to + ")"; 
	}*/
	
};

//список всех заметок
var allNotes;
//список всех тэгов
var allTags;

function logicInit()
{
	allNotes = new Array();
	allTags = new Array();
}

/*function getAllNotes()
{
	if(!localStorage.getItem('allNotes')) 
	{
		var allNotes = new Array();		
		saveNotes(allNotes);
	}
	var retAllNotes = JSON.parse(localStorage.getItem('allNotes'));
	//console.log(retAllNotes[0].content);
	return retAllNotes;
}*/

function parseTags(content)
{
	var resTags = new Array();
	
	var splitted = content.split("#");
	for (var i=1;i<splitted.length;i++)
	{
		var tag = splitted[i].split(' ')[0];
		resTags.push(tag);
		if(allTags.indexOf(tag)==-1)
			allTags.push(tag);
	}
	return resTags;
}

function saveData()
{
	var sAllNotes = JSON.stringify(allNotes);
	localStorage.setItem('allNotes', sAllNotes);
	var sAllTags = JSON.stringify(allTags);
	localStorage.setItem('allTags', sAllTags);
}

function reloadData()
{
	if(localStorage.getItem('allNotes')) 
	{
		allNotes = JSON.parse(localStorage.getItem('allNotes'));
	}	
		if(localStorage.getItem('allTags')) 
	{
		allTags = JSON.parse(localStorage.getItem('allTags'));
	}	
}