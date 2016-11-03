 //конструктор объекта Note
function Note(content, tags) 
{
	this.content = content;
	this.tags = tags;
}

//объект Note, хранит текст заметки и список тегов
Note.prototype = {	};

//список всех заметок
var allNotes;
//список всех тегов
var allTags;

function logicInit()
{
	allNotes = new Array();
	allTags = new Array();
}

//возвращает список тегов, содержащихся в тексте
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

//работает с localStorage, сохраняет список заметок и тегов
function saveData()
{
	var sAllNotes = JSON.stringify(allNotes);
	localStorage.setItem('allNotes', sAllNotes);
	var sAllTags = JSON.stringify(allTags);
	localStorage.setItem('allTags', sAllTags);
}

//работает с localStorage, извлекает список заметок и тегов
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