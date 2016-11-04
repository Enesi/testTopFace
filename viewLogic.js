//инициализаци€ и загрузка данных при обновлении страницы
function init()
{
	logicInit();
	updateData();
}

//очистка localStorage, удаление всех записей   
function onClearClick()
{
	window.localStorage.clear();
	location.reload();
	return false;
}
   
//добавление новой записи
function onAddClick()
{
   var Description = document.getElementById('description').value;
   //если текстовое поле не заполнено
   if(Description == '') 
   {
		document.getElementById('alert').html("<strong>¬нимание!</strong> ¬ведите запись в текстовое поле.");
		document.getElementById('alert').fadeIn().delay(3000).fadeOut();
		return false;
   }

   allNotes.push(new Note(Description,parseTags(Description)));
   saveData();
   //document.getElementById('descriprtion').value = "";
   //updateNotes();
   return false;
}

//обновление отображени€ данных, tagIndex-индекс тега, по которому фильтровать (если есть)
function updateData(tagIndex)
{				
	var notes = document.getElementById("notes");
	var tags =  document.getElementById("tags");
	notes.innerHTML="";
	tags.innerHTML="";
	reloadData();
	var tag;
	if(tagIndex>=0)
	   tag = allTags[tagIndex];
		console.log("tag="+tag+",index="+tagIndex)
	for (var i=0; i<allNotes.length;i++)
	if(!tag || (allNotes[i].tags.indexOf(tag)!=-1))
		notes.innerHTML="<div id='txtNote"+i+"' class='scroll'  >"+ allNotes[i].content + "</div><div id='noteEditDel"+i+"'><button onClick='onEditNoteClick("+i+");'>ѕравить</button><button onClick='onDeleteNoteClick("+i+");'>X</button></div>"
		+"<div id='noteOkCancel"+i+"' style='display:none;'><button onClick='onSaveNoteClick("+i+");'>—охранить</button><button id='btnCancel"+i+"' onClick='onCancelNoteClick("+i+");'>ќтмена</button><br></div> tags:"+allNotes[i].tags+"<br><br>"+notes.innerHTML;
	for (var i=0; i<allTags.length;i++)
		tags.innerHTML="<p id='pTag"+i+"' onclick=updateData("+i+")>"+allTags[i]+" <button onClick='onDeleteTagClick("+i+");'>X</button></p>"+tags.innerHTML;		
}

var savedRange;
function saveSelection()
{
    if(window.getSelection)//non IE Browsers
    {
        savedRange = window.getSelection().getRangeAt(0);
    }
    else if(document.selection)//IE
    { 
        savedRange = document.selection.createRange();  
    } 
}

function restoreSelection(el)
{
    el.focus();
    if (savedRange != null) {
        if (window.getSelection)//non IE and there is already a selection
        {
            var s = window.getSelection();
            if (s.rangeCount > 0) 
                s.removeAllRanges();
            s.addRange(savedRange);
        }
        else if (document.createRange)//non IE and no selection
        {
            window.getSelection().addRange(savedRange);
        }
        else if (document.selection)//IE
        {
            savedRange.select();
        }
    }
}

//редактировать запись
function onEditNoteClick(index)
{
    var noteTextArea = document.getElementById("txtNote"+index);
	noteTextArea.contentEditable = "true";
	
	/*noteTextArea.addEventListener('keyup', function (event) {
		if(event.keyCode==" ".charCodeAt(0))
		{
			console.log("keykod")
			var root = this;
			console.log(root)
			var text = this.textContent;
			console.log("text"+text)
			var match = text.match(/(#\w+)/g);
			console.log("match"+match);
			if (match!=undefined)
			for(var i=0;i<match.length;i++)
			{
				var foundIndex = text.indexOf(match[i]);
				console.log("foundIndex="+foundIndex);
				if(foundIndex!=-1)
				{

						var rng = document.createRange();
						var start =  root.getElementsByTagName('span')[i];
													console.log("start="+start.innerHTML)
						if(start.innerHTML!=match[i])	
						{						
							if((i!=0)&&(start!=undefined))
							{
								console.log("start="+start)
							   rng.setStartAfter(start);
							   rng.setEnd(start,match[i].length);
							}
							else 
							{
								rng.setStart( root.firstChild, foundIndex );
								rng.setEnd( root.firstChild, foundIndex + match[i].length );
							}
						console.log("rng="+rng);
							var highlightDiv = document.createElement('span');
							highlightDiv.classList.add("hashtag");
							rng.surroundContents( highlightDiv );
							//var highlighted = text.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');
							//this.innerHTML = highlighted;
							//restoreSelection(noteTextArea);
						}
				}
			}
		}
    });*/

	var text = noteTextArea.textContent;

    var highlighted=text;	
	for (var i=0;i<allNotes[index].tags.length;i++)
	{
	    highlighted = text.replace(new RegExp(allNotes[index].tags[i], 'g'),'<span class="hashtag">'+allNotes[index].tags[i]+'</span>')		
	}
    noteTextArea.innerHTML = highlighted;
    document.getElementById("noteEditDel"+index).style.display = "none";
    document.getElementById("noteOkCancel"+index).style.display = "block";
	
	noteTextArea.addEventListener('click', function (event) {
		/*console.log("onmousedown")
		if ( window.getSelection )
		{
			var s = window.getSelection();
			console.log("noteTextArea.lastChild="+noteTextArea.lastChild)
			var rng = document.createRange();
			rng.setStartBefore(noteTextArea.lastChild);
			rng.setEndAfter(noteTextArea.lastChild);
			console.log("rng="+rng.toString());
			rng.collapse(false);
			s.removeAllRanges();
			s.addRange(rng);
		}*/
    });
}

//удал€ет из форматировани€ текста записи теги подсветки ключевых слов
function redoHighlight(text,index)
{	
	text = text.replace(/<span.*?>(.*?)<\/span>/ig, function(a) 
	{  
		a=a.replace(/<span.*?>/,'');
		a=a.replace(/<\/span>/,'');
		return a;
	})
	return text;
}

//отмена редактировани€
function onCancelNoteClick(index)
{
    document.getElementById("txtNote"+index).contentEditable = "false";
	
	document.getElementById("txtNote"+index).innerHTML=allNotes[index].content;
	document.getElementById("noteEditDel"+index).style.display = "block";
    document.getElementById("noteOkCancel"+index).style.display = "none";
}

//сохранение редактировани€
function onSaveNoteClick(index)
{
    document.getElementById("txtNote"+index).contentEditable = "false";
	var text = document.getElementById("txtNote"+index).innerHTML;
	console.log("text before="+text);
	text = redoHighlight(text,index);
	console.log("text after="+text);
	allNotes[index].content=text;
	allNotes[index].tags=parseTags(allNotes[index].content);
	document.getElementById("noteEditDel"+index).style.display = "block";
    document.getElementById("noteOkCancel"+index).style.display = "none";
	saveData();
	updateData();
}

//удаление записи
function onDeleteNoteClick(index)
{
	allNotes.splice(index,1);
	saveData();
	updateData();
}

//удаление тега
function onDeleteTagClick(index)
{
    if((index>=0)&&(index<allTags.length))
	{
		allTags.splice(index,1);
		document.getElementById("pTag"+index).onclick=function(){};
		saveData();
	}
	updateData();
	//location.reload();
}

//добавление нового тега
function onAddTagClick()
{
   var newTag = document.getElementById('newTag').value;
   if(newTag == '') 
   {
    document.getElementById('alert').html("<strong>¬нимание!</strong> ¬ведите запись в текстовое поле.");
    document.getElementById('alert').fadeIn().delay(3000).fadeOut();
    return false;
   }
   allTags.push(newTag);
   saveData();
   return false;
}
