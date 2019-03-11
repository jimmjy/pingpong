!function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);var r=document.querySelector("#paddleA"),l=document.querySelector("#paddleB"),o=document.querySelector("#playground"),a=document.querySelector("#ball"),d=document.querySelector(".scoreBoard"),i=document.createElement("h1"),c=document.createElement("h1"),u=document.createElement("button");u.innerText="New Game";var p={playground:{offsetTop:o.getBoundingClientRect().top,height:o.getBoundingClientRect().height,width:o.getBoundingClientRect().width},paddleA:{x:80,y:0,width:20,height:70},paddleB:{x:520,y:100,width:20,height:70},ball:{speed:5,x:150,y:100,directionX:1,directionY:1,height:20,width:20,directionChange:[-1,1]},playerAScore:0,playerBScore:0,maxScore:10},y=function(){r.style.top="".concat(p.paddleA.y,"px"),l.style.top="".concat(p.paddleB.y,"px")};y();var h=function(){var e,t=p.ball;((e=p.ball.y)<0||e>p.playground.height-p.ball.height)&&(t.directionY*=-1),p.ball.x>p.playground.width&&(p.ball.x=400,p.ball.y=200,p.ball.directionX=-1,p.playerAScore+=1),p.ball.x<0&&(p.ball.x=200,p.ball.y=200,p.ball.directionX=1,p.ball.directionY=p.ball.directionChange[Math.floor(2*Math.random())],p.playerBScore+=1),p.ball.x===p.paddleB.x-(p.ball.width+p.paddleB.width)&&p.ball.y>=p.paddleB.y&&p.ball.y<=p.paddleB.y+p.paddleB.height&&(p.ball.directionX*=-1),p.ball.x===p.paddleA.x+p.ball.width&&p.ball.y>=p.paddleA.y&&p.ball.y<=p.paddleA.y+p.paddleA.height&&(p.ball.directionX*=-1),t.x+=t.speed*t.directionX,t.y+=t.speed*t.directionY},s=function(){var e;p.isPaused||(e=1,p.paddleA.y+p.paddleA.height/2>p.ball.y&&(e=-1),p.paddleA.y+=4*e,h()),(p.playerAScore>=p.maxScore||p.playerBScore>=p.maxScore)&&(clearInterval(p.timer),d.innerHTML=p.playerAScore===p.maxScore?"<h1>Player A wins</h1>":"<h1>Player B wins</h1>",d.appendChild(u))},g=function(){i.textContent="Player One score: "+p.playerAScore,c.textContent="Player Two score: "+p.playerBScore,d.appendChild(i),d.appendChild(c)},f=function e(){var t;p.playerAScore<p.maxScore&&p.playerBScore<p.maxScore&&(p.isPaused?requestAnimationFrame(e):(g(),t=p.ball,a.style.top="".concat(t.y+t.speed*t.directionY,"px"),a.style.left="".concat(t.x+t.speed*t.directionX,"px"),y(),requestAnimationFrame(e)))},b=function(){var e;f(),p.timer=setInterval(s,25),e=function(){p.isPaused=!1},o.addEventListener("mouseenter",e),o.addEventListener("touchstart",e),o.addEventListener("mouseleave",function(){p.isPaused=!0}),o.addEventListener("touchend",function(){p.isPaused=!0}),o.addEventListener("mousemove",function(e){e.y-o.getBoundingClientRect().top>0&&e.y-o.getBoundingClientRect().top<p.playground.height&&(p.paddleB.y=e.y-o.getBoundingClientRect().top-p.paddleB.height/2)}),o.addEventListener("touchmove",function(e){e.y-o.getBoundingClientRect().top>0&&e.y-o.getBoundingClientRect().top<p.playground.height&&(p.paddleB.y=e.y-o.getBoundingClientRect().top-p.paddleB.height/2)})};b(),u.addEventListener("click",function(){p.playerAScore=0,p.playerBScore=0,d.innerHTML="",g(),b()})},function(e,t,n){}]);