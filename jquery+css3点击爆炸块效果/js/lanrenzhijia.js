/* ������������֮�� www.lanrenzhijia.com */
$(document).ready(function() {
		
	// 生成片段。在本例中，我使用的是5个(或25个)
	(genClips = function() {
		
		// For easy use
		$t = $('.clipped-box');
		
		// 就像我说的，我们用的是5!
		var amount = 5;
		
		// 获取每个剪切矩形的宽度。
		var width = $t.width() / amount;
		var height = $t.height() / amount;
		
		// 总数是总数的平方。
		var totalSquares = Math.pow(amount, 2);
		
		// 内容的HTML。
		var html = $t.find('.content').html();
		
		var y = 0;
		
		for(var z = 0; z <= (amount*width); z = z+width) { 
		
			$('<div class="clipped" style="clip: rect('+y+'px, '+(z+width)+'px, '+(y+height)+'px, '+z+'px)">'+html+'</div>').appendTo($t);
			
			if(z === (amount*width)-width) {
			
				y = y + height;
				z = -width;
			
			}
			
			if(y === (amount*height)) {
				z = 9999999;
			}
			
		}
		
	})();
	
	// 一种快速随机选择随机数的函数。
	function rand(min, max) {
		
		return Math.floor(Math.random() * (max - min + 1)) + min;
		
	}
	
	// 当动画大部分结束时，一个变量检查。
	var first = false,
		clicked = false;
	
	// On click
	$('.clipped-box div').on('click', function() {
		
		if(clicked === false) {
			
			clicked = true;
			
			$('.clipped-box .content').css({'display' : 'none'});	
	
			// 适用于每个剪贴框div。
			$('.clipped-box div:not(.content)').each(function() {
				
				// 所以速度是在90m/s和120m/s之间的随机速度。我知道这看起来很多。
				// 但除此之外，它似乎太慢了。这是因为我处理超时的方式。
				var v = rand(120, 90),
					angle = rand(80, 89), // 角度(投影的角度)是一个80到89度的随机数字。
					theta = (angle * Math.PI) / 180, // 是弧度的角度。
					g = -9.8; // 和重力是-9.8。如果你住在另一个星球，你可以自由地改变。
					
				// $(this) as self
				var self = $(this);
				
				// 时间最初是零，也设置一些随机变量。它比抛射运动的总时间要高。
				// 因为我们想让方块离开屏幕。 
				var t = 0,
					z, r, nx, ny,
					totalt =  15;
				
				// 方向可以是左(1)，右(-1)或中心(0)，这是水平方向。
				var negate = [1, -1, 0],
					direction = negate[ Math.floor(Math.random() * negate.length) ];
				
				// 改变形状位置的一些随机数。
				var randDeg = rand(-5, 10), 
					randScale = rand(0.9, 1.1),
					randDeg2 = rand(30, 5);
				
				// 因为盒子的阴影有点小(我的意思是“盒子的阴影不会对每个人都起作用”)
				// 我们正在手工修改背景颜色，以便在它们出现时进行区分。
				// 在空中盘旋。
				var color = $(this).css('backgroundColor').split('rgb(')[1].split(')')[0].split(', '),
					colorR = rand(-20, 20),  // 如果您改变颜色，您可能需要手动更改这些。
					colorGB = rand(-20, 20),  // 为了得到正确的一致性。
					newColor = 'rgb('+(parseFloat(color[0])+colorR)+', '+(parseFloat(color[1])+colorGB)+', '+(parseFloat(color[2])+colorGB)+')';
				
				
				// 并应用这些
				$(this).css({
					'transform' : 'scale('+randScale+') skew('+randDeg+'deg) rotateZ('+randDeg2+'deg)', 
					'background' : newColor
				});
				 
				//设置一个时间间隔
				z = setInterval(function() { 	
					
					// 水平速度恒定(互联网上无风阻)
					var ux = ( Math.cos(theta) * v ) * direction;
					
					// 垂直速度随着时间的增加而减小，在达到峰值之前达到0。
					var uy = ( Math.sin(theta) * v ) - ( (-g) * t);
					
					// 的水平位置
					nx = (ux * t);
							
					// s = ut + 0.5at^2
					ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));
					
					// 应用的位置	
					$(self).css({'bottom' : (ny)+'px', 'left' : (nx)+'px'});
					
					// 将时间增加0.10。
					t = t + 0.10;
					
					// 如果时间大于总时间，清除间隔。
					if(t > totalt) {
						
						clicked = false;
						first = true;
						
						
						$('.clipped-box').css({'top' : '-1000px', 'transition' : 'none'});
						$(self).css({'left' : '0', 'bottom' : '0', 'opacity' : '1', 'transition' : 'none', 'transform' : 'none'});
					
								
						// 最后明确时间间隔
						clearInterval(z);
					
					}
					
				}, 10); // 每10毫秒运行这个间隔。改变这一点将改变动画的节奏。
		
			});
			
		}
	
	});
	
				
				
	r = setInterval(function() {
				
				
		// This is a bit rough but it does the job
		if(first === true) {
				
	
			// 我刚把这个放进去，所以被删除的框在被点击后会再次下降。
			// 这样你就可以继续按delete键了。
							
			$('.clipped-box').css({'top' : '0', 'transition' : ''});
			$('.clipped-box div').css({'opacity' : '1', 'transition' : '', 'background-color' : ''});
						
			$('.content').css({'display' : 'block'});
				
			first = false;
			
		}
				
	}, 300);
});
/* ������������֮�� www.lanrenzhijia.com */