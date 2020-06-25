(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/day.7f93fbdb.svg"},function(e,t,a){e.exports=a.p+"static/media/night.a3f3f38d.svg"},function(e,t,a){e.exports=a.p+"static/media/cloudy-day.b931d84d.svg"},function(e,t,a){e.exports=a.p+"static/media/cloudy-night.ef1c6aa1.svg"},function(e,t,a){e.exports=a.p+"static/media/rainy.2bd23641.svg"},function(e,t,a){e.exports=a.p+"static/media/snowy.3def7c9f.svg"},function(e,t,a){e.exports=a(24)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(9),s=a.n(r);a(21),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(8);var i=a(2),o=a(3),l=a(5),u=a(4),m=a(6),h=a(1),p=a(10),d=a.n(p),f=a(11),v=a.n(f),g=a(12),y=a.n(g),E=a(13),w=a.n(E),b=a(14),k=a.n(b),x=a(15),S=a.n(x),N=(a(22),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={searchRequest:"",temps:[],timestamps:[],currentDescription:null,sunset:null,sunrise:null,currentTemp:null,currentFeelsLike:null,currentMain:null,descriptions:[],cityName:null},n.handleInput=n.handleInput.bind(Object(h.a)(n)),n.handleSearch=n.handleSearch.bind(Object(h.a)(n)),n.handleReturn=n.handleReturn.bind(Object(h.a)(n)),n}return Object(o.a)(a,[{key:"fetchWeatherData",value:function(e,t){var a=this;Promise.all([fetch(e),fetch(t)]).then((function(e){var t=Object(m.a)(e,2),a=t[0],n=t[1];if(a.ok&&n.ok)return[a,n];throw new Error("Network response was not ok.")})).then((function(e){var t=Object(m.a)(e,2),a=t[0],n=t[1];return Promise.all([a.json(),n.json()])})).then((function(e){var t=Object(m.a)(e,2),n=t[0],c=t[1];a.setState({sunrise:new Date(1e3*n.sys.sunrise).toLocaleTimeString().slice(0,-3),sunset:new Date(1e3*n.sys.sunset).toLocaleTimeString().slice(0,-3),currentTemp:n.main.temp.toFixed(0),currentHigh:n.main.temp_max.toFixed(0),currentLow:n.main.temp_min.toFixed(0),currentFeelsLike:n.main.feels_like.toFixed(0),currentDescription:n.weather[0].description,currentMain:n.weather[0].main,timestamps:c.list.map((function(e){return new Date(1e3*e.dt).toLocaleString().slice(0,-6)})),temps:c.list.map((function(e){return e.main.temp.toFixed(0)})),descriptions:c.list.map((function(e){return e.weather[0].main})),cityName:c.city.name}),console.log(a.state.temps)})).catch((function(e){console.log(e)}))}},{key:"componentDidMount",value:function(){console.log(this.state.searchRequest);var e=this.props,t=e.lon,a=e.lat,n="541d088bac0c6ef615e53e06d8497f14",c="https://api.openweathermap.org/data/2.5/weather?lat=".concat(a,"&lon=").concat(t,"&appid=").concat(n,"&units=metric"),r="https://api.openweathermap.org/data/2.5/forecast?lat=".concat(a,"&lon=").concat(t,"&appid=").concat(n,"&units=metric");this.fetchWeatherData(c,r)}},{key:"handleInput",value:function(e){this.setState({searchRequest:e.target.value}),console.log(this.state.searchRequest)}},{key:"handleSearch",value:function(){if(""!==this.state.searchRequest){var e="541d088bac0c6ef615e53e06d8497f14",t="https://api.openweathermap.org/data/2.5/weather?q=".concat(this.state.searchRequest,"&appid=").concat(e,"&units=metric"),a="https://api.openweathermap.org/data/2.5/forecast?q=".concat(this.state.searchRequest,"&appid=").concat(e,"&units=metric");this.fetchWeatherData(t,a)}}},{key:"handleReturn",value:function(){this.setState({searchRequest:""});var e=this.props,t=e.lon,a=e.lat,n="541d088bac0c6ef615e53e06d8497f14",c="https://api.openweathermap.org/data/2.5/weather?lat=".concat(a,"&lon=").concat(t,"&appid=").concat(n,"&units=metric"),r="https://api.openweathermap.org/data/2.5/forecast?lat=".concat(a,"&lon=").concat(t,"&appid=").concat(n,"&units=metric");this.fetchWeatherData(c,r)}},{key:"getBoxes",value:function(e){var t=this,a=["January","February","March","April","May","June","July","August","September","October","November","December"];return e.map((function(e){return c.a.createElement("div",{key:e[0],className:"card"},c.a.createElement("p",null,e[0].slice(0,2)+" "+a[parseInt(e[0].slice(3,5))-1]),c.a.createElement("p",null,e[0].slice(-2)+":00"),c.a.createElement("img",{src:t.getIcons(e[0],e[2])}),c.a.createElement("p",null,e[1],"\xb0"),c.a.createElement("p",null,e[2]))}))}},{key:"getIcons",value:function(e,t){var a=parseInt(e.slice(-2)),n=a>=18||a<=5;return"Rain"===t?k.a:"Clouds"===t&&n?w.a:"Clouds"!==t||n?"Clear"!==t||n?"Clear"===t&&n?v.a:S.a:d.a:y.a}},{key:"render",value:function(){if(null==this.state.cityName||this.state.temps==[])return c.a.createElement("h2",null,"Loading...");var e=this.state,t=e.timestamps,a=e.temps,n=e.descriptions,r=(e.city,function(e,t,a){return e.map((function(e,n){return[e,t[n],a[n]]}))});return c.a.createElement(c.a.Fragment,null,console.log(r(t,a,n)),c.a.createElement("div",{className:"current-weather"},c.a.createElement("div",{className:"city",style:{fontSize:54,fontFamily:"Exo"}},this.state.cityName),c.a.createElement("img",{src:this.getIcons((new Date).toLocaleString().slice(0,-6),this.state.currentMain),alt:"weatherIcon",className:"current-weatherIcon"}),c.a.createElement("div",{className:"weatherIcon"},c.a.createElement("p",{style:{fontSize:25,fontFamily:"Exo"}},this.state.currentDescription),c.a.createElement("p",{style:{fontSize:44,fontFamily:"Exo"}},this.state.currentTemp,"\xb0"),c.a.createElement("p",null,"feels like ",this.state.currentFeelsLike,"\xb0")),c.a.createElement("div",{className:"more-info"},c.a.createElement("p",null,"sunrise at ",this.state.sunrise),c.a.createElement("p",null,"sunset at ",this.state.sunset),c.a.createElement("p",null,"today's high: ",this.state.currentHigh,"\xb0"),c.a.createElement("p",null,"today's low: ",this.state.currentLow,"\xb0")),c.a.createElement("div",{className:"search"},"Select another location:",c.a.createElement("input",{onChange:this.handleInput,value:this.state.searchRequest,type:"text",className:"input"}),c.a.createElement("button",{onClick:this.handleSearch},"Search"),c.a.createElement("p",null,c.a.createElement("button",{onClick:this.handleReturn,className:"button-style"},"Return to my location")))),c.a.createElement("div",{className:"bottom-forecast"},c.a.createElement("div",{style:{fontSize:40,fontFamily:"Exo"},className:"forecast"},"Forecast"),c.a.createElement("div",{className:"forecast-wrapper"},this.getBoxes(r(t,a,n)))))}}]),a}(n.Component)),j=(a(23),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={lat:null,lon:null},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.setState({lat:t.coords.latitude,lon:t.coords.longitude})}))}},{key:"render",value:function(){return null==this.state.lat||null==this.state.lon?c.a.createElement("h2",null,"Loading...."):c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"background"},c.a.createElement(N,{lon:this.state.lon,lat:this.state.lat})))}}]),a}(n.Component));s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[16,1,2]]]);
//# sourceMappingURL=main.06ade809.chunk.js.map