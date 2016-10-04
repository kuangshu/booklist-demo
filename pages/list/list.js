Page({
	data: {
		bookList: [
	        {
	            bookName: '红楼梦',
	            bookAuthor: '曹雪芹',
	            bookPrice: 29.8
	        },
	        {
	            bookName: '西游记',
	            bookAuthor: '吴承恩',
	            bookPrice: 19.8
	        },
	        {
	            bookName: '三国演义',
	            bookAuthor: '罗贯中',
	            bookPrice: 34.2
	        },
	        {
	            bookName: '水浒传',
	            bookAuthor: '施耐庵',
	            bookPrice: 49.1
	        }
	    ],
	    sum: 0,
	    curBook: {},
	    toastHidden: true,
	    toastMsg: "无错误"
	},
	onReady: function() {
		wx.setNavigationBarTitle({
			title: "列表页"
		});
		this.update("sum");
	},
	edit: function(e) {
		var book = this.data.bookList[e.target.dataset.index];
		book.index = e.target.dataset.index;
		this.setData({
			curBook: book
		})
	},
	del: function(e) {
		var list = this.data.bookList;
		list.splice(e.target.dataset.index,1);
		this.setData({
			bookList: list
		});
		this.update("sum")
	},
	update: function(type,newBook) {
		if(type == "sum"){
			var sumP = 0;
			for(let i of this.data.bookList){
				sumP += i.bookPrice-0;
			}
			sumP = sumP.toFixed(2);
			this.setData({
				sum: sumP
			})			
		}else if(type == "bookList"){
			console.log("update bookList");
		}
	},
	changValue: function(e) {
		var book = this.data.curBook,
			type = e.target.dataset.type,
			val = e.detail.value;
		book[type] = val.trim();
		this.setData({
			curBook: book
		})
	},
	add: function(){
		var book = this.data.curBook,
			val = book.bookPrice;
		val = Number(val).toFixed(2);
		if(val == "NaN"){
			this.setData({
				toastHidden: false,
				toastMsg: "请填写正确的价格！"
			})
			return
		}
		if(book.bookName && book.bookAuthor && book.bookPrice){
			var idx = this.data.curBook.index,
				list = this.data.bookList;
			if(idx){
				list[idx] = this.data.curBook;

			}else {
				list.push(this.data.curBook);
			}
			this.setData({
				bookList: list,
				curBook: {}
			})		
			this.update("sum")
		}else {
			var errorMsg = "";
			if(!book.bookAuthor){
				errorMsg = "请填写价格！";
			}
			if(!book.bookAuthor){
				errorMsg = "请填写作者！"
			}
			if(!book.bookName){
				errorMsg = "请填写书名！"
			}
			this.setData({
				toastHidden: false,
				toastMsg: errorMsg
			})
		}
	},
	toastChange: function(){
		this.setData({
			toastHidden: !this.data.toastHidden
		})
	}
})