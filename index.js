let crud = 	new function (){
	this.readList = document.getElementById("book");
	// this.bookList=[]
	this.bookList=JSON.parse(localStorage.getItem('bookList')) ||[]
	
	this.fetchAll = function(){
		var view = '';
		var list =localStorage.getItem("bookList");
		bookData= JSON.parse(list)
		console.log("fetch", bookData)
		if(this.bookList.length>0){
			for(i =0; i<this.bookList.length; i++){
				view+= '<tr>';
				view+='<td>' +(i+1)+'. '+ this.bookList[i]+'</td>';
				view+='<td><button onclick="crud.edit(' + i + ')"  class="btn btn-warning">Edit</button></td>';
				view+='<td><button onclick="crud.read(' + i + ')"  class="btn btn-danger">Read</button></td>';
				view+='</tr>';
			}
		}
		
		return this.readList.innerHTML=view;
	}

	this.addBook = function(){
		item = document.getElementById("title");
		let book=item.value;

		if(book){
			console.log(this.bookList)
			this.bookList.push(book.trim());
			item.value='';
			console.log(localStorage)
			localStorage.setItem("bookList", JSON.stringify(this.bookList));
			this.fetchAll();
		}
	};

	this.edit = function(item){
		let book = document.getElementById("read-book");
		book.value= this.bookList[item];
		document.getElementById("edit-box").style.display='block';
		self = this;

		document.getElementById("edit").onsubmit= function(){
			var read = book.value;
			if(read){
				self.bookList.splice(item, 1, read.trim());
				localStorage.setItem("bookList", JSON.stringify(self.bookList));
				self.fetchAll();
				closeInput();
			}
		}
	};

	this.read= function(item){
		this.bookList.splice(item, 1);
		localStorage.setItem('bookList', JSON.stringify(this.bookList))
		this.fetchAll();
	}

	this.search = function(){
		let input= document.getElementById("search");
		let searchResult= document.getElementById("result");

		inputValue = input.value;
		console.log(inputValue)
		for (i=0; i<this.bookList.length; i++){
			if(this.bookList[i].match(inputValue))
			return searchResult.innerHTML=this.bookList[i]
		}

		
	}	
}

crud.fetchAll();

function closeInput(){
	document.getElementById("edit-box").style.display="none"
}
