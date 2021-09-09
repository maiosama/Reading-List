let crud = 	new function (){
	this.readList = document.getElementById("book");
	this.bookList = [];

	this.fetchAll = function(){
		var bookData = '';
		if(this.bookList.length>0){
			for(i =0; i<this.bookList.length; i++){
				bookData+= '<tr>';
				bookData+='<td>' +(i+1)+'. '+ this.bookList[i]+'</td>';
				bookData+='<td><button onclick="crud.edit(' + i + ')"  class="btn">Edit</button></td>';
				bookData+='<td><button onclick="crud.read(' + i + ')"  class="btn">Read</button></td>';
				bookData+='</tr>';
	
			}
		}
		localStorage.getItem("bookData")
		return this.readList.innerHTML=bookData;

	}

	this.addBook = function(){
		item = document.getElementById("title");
		let book=item.value;

		if(book){
			this.bookList.push(book.trim());
			item.value='';
			localStorage.setItem("bookData", JSON.stringify(this.bookList))
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
				self.fetchAll();
				closeInput();
			}
		}


	};

	this.read= function(item){
		this.bookList.splice(item, 1);
		this.fetchAll();
	}
	

}

crud.fetchAll();

function closeInput(){
	document.getElementById("edit-box").style.display="none"
}
