//The Knight's Travails - JavaScript Version (client end browser based app)
// Software Developer:MAO WEIQING
// Mobile:04 3238 8818
// Place: Perth Western Australia
// Email: weiqingmao@robertnicholson.org
// html5 appcache has been used in this application
// therefore users can use the application even when the Internet is off
//Class Parent
function ChessBoard(Board, BoardSize) {
  if(Board == null)
  {
  	this.board = 
  	[
  	[-1,-1,-1,-1,-1,-1,-1,-1],
  	[-1,-1,-1,-1,-1,-1,-1,-1],
  	[-1,-1,-1,-1,-1,-1,-1,-1],
  	[-1,-1,-1,-1,-1,-1,-1,-1],
  	[-1,-1,-1,-1,-1,-1,-1,-1],
  	[-1,-1,-1,-1,-1,-1,-1,-1],
  	[-1,-1,-1,-1,-1,-1,-1,-1],
  	[-1,-1,-1,-1,-1,-1,-1,-1]
  	];
  }
  else
  {
  	this.board = Board;
  }
  if(BoardSize = null)
  this.boardsize = 8;
  else
  this.boardsize = BoardSize;
}

ChessBoard.prototype.getSinglePosition = function(row, column) {
	if(this.board !=null)
  	return this.board[row][column];
};

ChessBoard.prototype.setSinglePosition = function(row, column, val) {
  	if(this.board != null)
  	{
  	this.board[row][column] = val;
  	}
};

ChessBoard.prototype.printBoard = function() {
    if(this.board != null)
  	{
  		for(var i = 0; i< this.board.length; i++)
  		{
  			for(var j = 0; j< this.board[i].length; j++)
  			{
  				console.log(this.board[i][j]+" ");
  			}
  			console.log("\n");
  		}
  	}
};

ChessBoard.prototype.printHash = function(hashboard) {
    if(hashboard!= null)
  	{
  		for(var i = 0; i< hashboard.length; i++)
  		{
  			for(var j = 0; j< hashboard[i].length; j++)
  			{
  				console.log(hashboard[i][j]+" ");
  			}
  			console.log("\n");
  		}
  	}
};
//general functions
function FindParent(table, childName){
	var parentName = null;
	for(var i = 0; i<table.length;i++)
	{
		for(var j = 0; j<table[i].length;j++)
		{
			if(table[i][j] == childName)
			{
				parentName = table[i][0];
				break;
			}
		}
		if(parentName != null)
		break;
	}
	return parentName;
}

function RecursiveFindNode(n, nodes, childname, arr) {
	if(n == 0)
	return arr;
	else
	var upname = FindParent(nodes, childname);
	if(upname != null)
	{
		arr.push(upname); 
	}
	return RecursiveFindNode(n-1, nodes, upname, arr);
}

function FloodFill(start_x, start_y, boardsize, board)
	{
		var movementX = [-2,-2,-1,-1,1,1,2,2];
		var movementY = [-1,1,-2,2,-2,2,-1,1];
		var nodestable = [];
		
		board.setSinglePosition(start_x,start_y,0);

		for(var step = 0; step < 7; step++)
		{
			for(var i = 0; i < boardsize; i++)
			{
				for(var j = 0; j < boardsize; j++)
				{
					if(board.getSinglePosition(i, j)==step)
					{
						var r =  [];
						r.push(i.toString()+j.toString());
						
						for(var k = 0; k < movementX.length;k++)
						{
							if (i + movementY[k] >= 0 && i + movementY[k] < boardsize && j + movementX[k] >= 0 && j + movementX[k] < boardsize)//if this position is a legal movement by a Knight within the chessboard
							{	
							
								if (board.getSinglePosition((i + movementY[k]), (j + movementX[k])) == -1)//if the value of this position is -1, meaning accessible
								{
									board.setSinglePosition((i + movementY[k]), (j + movementX[k]),step+1);// board has all steps information
									
									r.push((i + movementY[k]).toString()+(j + movementX[k]).toString());//save parent node and child nodes to the array of array
								}
							}
						}
						nodestable.push(r);//array of all parent nodes and child nodes information
					}
				}
			}
		}
		return nodestable;
	}

function Convert_N_to_A(bd)
{
	if(bd != null)
	{
		for(var i = 0; i< bd.length; i++)
		{
			for(var j = 0;j<bd[i].length;j++)
			{
				var first = String.fromCharCode(parseInt(bd[i][j].substring(0,1))+65);
				var last = (8 - parseInt(bd[i][j].substring(1))).toString();
				bd[i][j] = first+last;
			}
		}
		return bd;
	}
}

function FindShortestPathByNight(ori,des, boardsize)
	{
	var array_path = [];
	
	var board = new ChessBoard(null,8);
	var sx = ori.charCodeAt(0) -65;
	var sy = boardsize - ori.substring(1);
	var nodeHash = FloodFill(sx, sy, boardsize, board);
	var ex = des.charCodeAt(0) -65;//char to unicode
	var ey = boardsize - des.substring(1);
	var num_of_steps = board.getSinglePosition(ex,ey);
	var hashboard = Convert_N_to_A(nodeHash);
	var re = RecursiveFindNode(num_of_steps, hashboard, des, array_path);
	re.pop();
	var path = re.reverse();
	path.push(des);
	var response = "";
	path.forEach(
		function addString(value) { response += value;}
	);
	return response;
}
// html functions
		var count = 0;
        var index = 0;
        
        $(document).ready(function () {
        resetSize();
        	
  		});
       
        function resetSize() {
			var w = Math.min(document.documentElement.clientWidth, window.innerWidth);
			var h = Math.min(document.documentElement.clientHeight, window.innerHeight);		    
			var elem = document.getElementsByTagName('table')[0];
        	if(w>h)
        	{
	        	elem.style.width = (h*0.8)+'px';
	        	elem.style.height = (h*0.8)+'px';
        	}
        	else
        	{
        		elem.style.width = (w*0.8)+'px';
	        	elem.style.height = (w*0.8)+'px';
        	}

		}   
		window.onresize = function(event) {
		    resetSize()        	
		};

        $('td').hover(function(e){     	
        		$(this).toggleClass("addborder");
			});
			
		$('td').click(function (event) {
		    if (event.target.id)
		    {
		        if (count == 0) {
		            if (localStorage.startingposition) {
		                $("#" + localStorage.startingposition).removeClass("greenbkcolor");
		            }
		                $(this).addClass("greenbkcolor");
		                localStorage.startingposition = event.target.id;
		                console.log("startingposition: " + event.target.id);
		                count++;
		        }
		        else {
		            if (localStorage.endingposition) {
		                $("#" + localStorage.endingposition).removeClass("redbkcolor");
		            }
		                $(this).addClass("redbkcolor");
		                localStorage.endingposition = event.target.id;
		                console.log("endingposition: " + event.target.id);
		                count--;
		                if (index == 0)
		                {
		                    ko.applyBindings(new CsBoardViewModel());//bind ko
		                }
							//find the shortest path
		                	var result = FindShortestPathByNight(localStorage.startingposition, localStorage.endingposition, 8);
		                    
		                    if(result != null)
							{
								resetValue();
							    getNewValue(result);
							    console.log("Shortest Path: "+result);
							}
							
		            index = 1;
		        }
		    }
		    else {
		        resetValue();
		    }
		});	

		function getNewValue(str)
		{
		    var count = 1;
		    for (var i = 0; i < str.length; i = i + 2) {
		        var tmp = str.substring(i, i + 2);
		        $('#' + tmp).text(count++);
		    }
		}
		
		function resetValue()
		{
		    for(var i = 1; i<9;i++)
		    {
		        for(var j = 65; j< 73; j++)
		        {
		            $('#'+String.fromCharCode(j)+i).text('');
		        }
		        			
		    }
		}
		
		function csBoard(
            a8, b8, c8, d8, e8, f8, g8, h8,
            a7, b7, c7, d7, e7, f7, g7, h7,
            a6, b6, c6, d6, e6, f6, g6, h6,
            a5, b5, c5, d5, e5, f5, g5, h5,
            a4, b4, c4, d4, e4, f4, g4, h4,
            a3, b3, c3, d3, e3, f3, g3, h3,
            a2, b2, c2, d2, e2, f2, g2, h2,
            a1, b1, c1, d1, e1, f1, g1, h1
            ) {
                var self = this;
                self.A8 = ko.observable(a8);self.B8 = ko.observable(b8);self.C8 = ko.observable(c8);self.D8 = ko.observable(d8);self.E8 = ko.observable(e8);self.F8 = ko.observable(f8);self.G8 = ko.observable(g8);self.H8 = ko.observable(h8);
                self.A7 = ko.observable(a7);self.B7 = ko.observable(b7);self.C7 = ko.observable(c7);self.D7 = ko.observable(d7);self.E7 = ko.observable(e7);self.F7 = ko.observable(f7);self.G7 = ko.observable(g7);self.H7 = ko.observable(h7);
                self.A6 = ko.observable(a6);self.B6 = ko.observable(b6);self.C6 = ko.observable(c6);self.D6 = ko.observable(d6);self.E6 = ko.observable(e6);self.F6 = ko.observable(f6);self.G6 = ko.observable(g6);self.H6 = ko.observable(h6); 
                self.A5 = ko.observable(a5);self.B5 = ko.observable(b5);self.C5 = ko.observable(c5);self.D5 = ko.observable(d5);self.E5 = ko.observable(e5);self.F5 = ko.observable(f5);self.G5 = ko.observable(g5);self.H5 = ko.observable(h5); 
                self.A4 = ko.observable(a4);self.B4 = ko.observable(b4);self.C4 = ko.observable(c4);self.D4 = ko.observable(d4);self.E4 = ko.observable(e4);self.F4 = ko.observable(f4);self.G4 = ko.observable(g4);self.H4 = ko.observable(h4); 
                self.A3 = ko.observable(a3);self.B3 = ko.observable(b3);self.C3 = ko.observable(c3);self.D3 = ko.observable(d3);self.E3 = ko.observable(e3);self.F3 = ko.observable(f3);self.G3 = ko.observable(g3);self.H3 = ko.observable(h3); 
                self.A2 = ko.observable(a2);self.B2 = ko.observable(b2);self.C2 = ko.observable(c2);self.D2 = ko.observable(d2);self.E2 = ko.observable(e2);self.F2 = ko.observable(f2);self.G2 = ko.observable(g2);self.H2 = ko.observable(h2); 
                self.A1 = ko.observable(a1);self.B1 = ko.observable(b1);self.C1 = ko.observable(c1);self.D1 = ko.observable(d1);self.E1 = ko.observable(e1);self.F1 = ko.observable(f1);self.G1 = ko.observable(g1);self.H1 = ko.observable(h1);                
       };
            
       function CsBoardViewModel() {
                var self = this;
                self.chessboard = new csBoard(
                "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", ""
                );
        };
        
            
		/* disable text selection */
		$('body').attr('unselectable','on')
	     .css({'-moz-user-select':'-moz-none',
	           '-moz-user-select':'none',
	           '-o-user-select':'none',
	           '-khtml-user-select':'none',
	           '-webkit-user-select':'none',
	           '-ms-user-select':'none',
	           'user-select':'none'
	     }).bind('selectstart', function(){ return false; });
	     