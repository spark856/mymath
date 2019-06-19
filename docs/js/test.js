//alert("asdf");

$(document).ready(function(){
	var count;
	var a;
	var b;
	var b2_b_a;
	var width;
	var height;
	var height_up;
	var height_down;
	var spnum = [3,5,11,17,41];
	var sp;
	
	change();
	$('input[type="range"]').rangeslider({
		// polyfillの設定
		polyfill: true,
	 
		// CSS用クラス
		rangeClass: 'rangeslider',
		fillClass: 'rangeslider__fill',
		handleClass: 'rangeslider__handle',
	 
		// 初期化時のコールバック関数
		//onInit: function() {},
	 
		// スライド時のコールバック関数
		onSlide: function(position, value) {},
	 
		// スライド終了時のコールバック関数
		//onSlideEnd: change() {}
	});
	document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});
	var elem = document.getElementsByClassName('range');
　 	var rangeValue = function (elem, target) {
		return function(evt){
			out = String(elem.value);
			if(out.length === 1){
				out = "<span class=\"non\">000</span>"+out+"&nbsp;";
			}else if(out.length === 2){
				out = "<span class=\"non\">00</span>"+out+"&nbsp;";
			}else if(out.length === 3){
				out = "<span class=\"non\">0</span>"+out+"&nbsp;";
			}
	　　		target.innerHTML = out;
			change()
	 	}
	}
	for(var i = 0, max = elem.length; i < max; i++){
		bar = elem[i].getElementsByTagName('input')[0];
	 　　　target = elem[i].getElementsByTagName('span')[1];
	　　　 bar.addEventListener('input', rangeValue(bar, target));
	}	
	
	
	

	$(document).on({
		"mouseenter" : function(){
			$(this).find(".num").fadeIn();
		},
		"mouseleave" : function(){
			$(this).find(".num").hide();
		}
	},".dotcover");
	/*
	$("#id_textBox2").focusout(function(){
		change();
	});
	*/
	$(".ibox").keydown(function(){
		if(event.keyCode===13){
			return false;
		}
	});
	/*
	$('#id_textBox1').change(function() {
		change()
	});
	*/
	function gcd(a,b){
		var tmp;
		if(a<b){
			tmp=a;
			a=b;
			b=tmp;
		}
		if(b===0){
			return a;
		}
		else{
			return gcd(b,a%b);
		}
	}
	function plot(dot){
		var div1 = dot.n1*dot.n1+dot.n1*dot.m1+dot.m1*dot.m1*a;
		var div2 = dot.n2*dot.n2+dot.n2*dot.m2+dot.m2*dot.m2*a;
		if(dot.y === 0){
			div1 = 1;
			div2 = b2_b_a;
		}
		var x = [{A:(dot.x + width/2)*100/width,B:div1+"×"+div2},{A:(-dot.x + width/2)*100/width,B:div2+"×"+div1}];
		var y = (height_up - dot.y)*100/height;
		if(dot.x === 0){
			x.pop()
		}
		for(var vx of x){
			count ++;
			$(".inner").append("<div class=\"dotcover\" id=\"dot"+count+"\"><div class=\"dot\" ></div><div class=\"num\">&nbsp;"+vx.B+"&nbsp;</div></div>");
			$("#dot"+count).css({
				"left": vx.A+"%",
				"top": y+"%",
			});
		}

	}
	function prime(){
		$('head').append('<style class="tmp">.inner::before { background-color: wheat;}</style>');
		$(".b2_b_a").remove();
		$('.disp').append('<span class="b2_b_a">'+b2_b_a+'(<span style="color:blue;">素数</span>)</span>');
	}
	function composite(){
		$(".b2_b_a").remove();
		$('.disp').append('<span class="b2_b_a">'+b2_b_a+'(<span>合成数</span>)</span>');
	}
	function unknown(){
		$(".b2_b_a").remove();
		$('.disp').append('<span class="b2_b_a">'+b2_b_a+'(<span>不明</span>)</span>');
	}
	
	function result(num_count){
		
	}
	function calc(a,b){
		var y=0;
		var num_count=0;
		while(true){
			var D=(y+1)*(y+1)-4*y*(y*a-b);
			if(D<0){
				break;
			}
			var x = Math.sqrt(D);
			if (Number.isInteger(x)){
				num_count++;
				var m = 2*y;
				var n1 = -(y+1)+x;
				var n2 = -(y+1)-x;
				
				var gcd1 = gcd(Math.abs(n1),m);
				var gcd2 = gcd(Math.abs(n2),m);
				
				var dot = {
					x: x,
					y: y,
					n1: n1/gcd1,
					m1: m/gcd1,
					n2: n2/gcd2,
					m2: m/gcd2
				}
				plot(dot);
			}
			y++;
		}
		result(num_count);
		
		if(num_count===1){ 
			if(sp===1){
				prime();
			}
			else{
				unknown();
			}
		}
		else{
			composite();
		}
	}
	
	function change(){
		count=0;
		a = Number($("#a").val());
		b = Number($("#b").val());
		b2_b_a = b*b + b + a;
		width = 4*Math.sqrt((b2_b_a)/(4*a-1));
		height = 4*Math.sqrt(b2_b_a)/(4*a-1);
		height_up = (2*Math.sqrt(b2_b_a)+2*b+1)/(4*a-1);
		height_down = (2*Math.sqrt(b2_b_a)-2*b-1)/(4*a-1);
		var numa = height*100/width;
		var numb = height_down*100/height;
		
		$(".tmp").remove();
		$(".b2_b_a").remove();
		
		if(spnum.indexOf(a) >= 0){
			$('head').append('<style class="tmp">.sp{color:red;}</style>');
			$('.message').show()
			sp = 1;
		}
		else{
			$('.message').hide()
			sp = 0;
		}
		
		$('head').append('<style class="tmp">.inner::before { padding-top: ' + numa + '%}.hr2 { height: ' + numb + '%} </style>');
		
		$(".dot").remove();
		$(".dotcover").remove();
		
		//$('.disp').append('<span class="b2_b_a">'+b2_b_a+'</span>');
		calc(a,b);

		//console.log(b2_b_a);
	}
});	

