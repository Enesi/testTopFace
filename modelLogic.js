 //����������� ������� Note
function Note(content, tags) 
{
	this.content = content;
	this.tags = tags;
}

//������ Note, ������ ����� ������� � ������ �����
Note.prototype = {	};

//������ ���� �������
var allNotes;
//������ ���� �����
var allTags;

function logicInit()
{
	allNotes = new Array();
	allTags = new Array();
}

//���������� ������ �����, ������������ � ������
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

//�������� � localStorage, ��������� ������ ������� � �����
function saveData()
{
	var sAllNotes = JSON.stringify(allNotes);
	localStorage.setItem('allNotes', sAllNotes);
	var sAllTags = JSON.stringify(allTags);
	localStorage.setItem('allTags', sAllTags);
}

//�������� � localStorage, ��������� ������ ������� � �����
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