
const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLigth = 'light'

const body = document.getElementsByTagName('body')[0]
 function setCookie(cname, cvalue, exdays){
     var d = new Date()
     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
     var expires = "expires=" + d.toUTCString()
     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
 }
 function getCookie(cname){
     var name = cname + "="
     var ca = document.cookie.split(';')
     for(var i = 0 ; i< ca.length;i++){
         var c = ca[i];
         while (c.charAt(0) == ' '){
             c = c.substring(1)
         }if(c.indexOf(name)== 0){
             return c.substring(name.length, c.length)
         }
     }
     return ""
 }
 loadTheme()
 function loadTheme(){
    var theme = getCookie(themeCookieName)
    body.classList.add(theme === "" ? themeLigth : theme )       
 }
 function switchTheme() {
    if(body.classList.contains(themeLigth)){
    body.classList.remove(themeLigth)
    body.classList.add(themeDark)
    setCookie(themeCookieName, themeDark)
    }else{
        body.classList.remove(themeDark)
        body.classList.add(themeLigth)
        setCookie(themeCookieName, themeLigth)
    }     
}

function collapseSidebar(){
    body.classList.toggle('sidebar-expand')
}

window.onclick=function(event){
    openCloseDropdown(event)
  
}
function closeAllDropdown() {
    var dropdowns = document.getElementsByClassName('dropdown-expand')
    for ( var i = 0 ; i < dropdowns.length; i++){
        dropdowns[i].classList.remove('dropdown-expand')
    } 
}
function openCloseDropdown(event){
    if (!event.target.matches('.dropdown-toggle')) {
        

        closeAllDropdown()
    }else{
        var toggle = event.target.dataset.toggle
        var content = document.getElementById(toggle)
        if (content.classList.contains('dropdown-expand')){
            closeAllDropdown()
        }else{
            closeAllDropdown()
            content.classList.add('dropdown-expand')
        }
    }
}
function openCity(evt, cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  document.getElementById(cityName).style.display = "block";
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", ""); 
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";  
}

// chart
document.addEventListener('DOMContentLoaded', ()=>{
const options = {
    chart:{
        type: 'line',
        zoomType:'xy'
    },
    title:{
        text:'Our First Chart'
    },
    yAxis:{
        title:{
            text: 'Fruits Eaten'
        }
    }
};
options.data ={
    csvURL: 'sm.csv',
    enablePolling: true,
    dataRefreshRate: 2
    
};
Highcharts.chart('container', options);

});



// 
// Create the chart
// document.addEventListener('DOMContentLoaded', ()=>{
//   const options = {
//   chart: {
//     type: 'column'
//   },
//   title: {
//     text: 'CẢNH BÁO CHẤT LƯỢNG KHÔNG KHÍ'
//   },
//   subtitle: {
//     text: 'Trường đại học Công nghệ thong tin và truyền thông Việt - Hàn: <a href="http://vku.udn.vn/" target="_blank">vku.udn.vn</a>'
//   },
//   accessibility: {
//     announceNewData: {
//       enabled: true
//     }
//   },
//   xAxis: {
//     type: 'category'
//   },
//   yAxis: {
//     title: {
//       text: '0-100'
//     }

//   },
//   legend: {
//     enabled: false
//   },
//   plotOptions: {
//     series: {
//       borderWidth: 0,
//       dataLabels: {
//         enabled: true,
//         format: '{point.y:.1f}%'
//       }
//     }
//   },

//   tooltip: {
//     headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//     pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
//   },

//   // series: [
//   //   {
//   //     name: "Mức cảnh báo",
//   //     colorByPoint: true,
//   //     data: [
//   //       {
//   //         name: "Tốt",
//   //         y: 62.74,
//   //         color:"#00e400"
          
//   //       },
//   //       {
//   //         name: "Trung bình",
//   //         y: 10.57,
//   //         color:"#FFFF00"
          
//   //       },
//   //       {
//   //         name: "Kém",
//   //         y: 7.23,
//   //         color:"#FF7E00"
        
//   //       },
//   //       {
//   //         name: "Xấu",
//   //         y: 5.58,
//   //         color:"#FF0000"
          
//   //       },
//   //       {
//   //         name: "Rất xấu",
//   //         y: 4.02,
//   //        color:"#99004c"
//   //       },
//   //       {
//   //         name: "Nguy hại",
//   //         y: 1.92,
//   //         color:"#7E0023"
//   //       }
//   //     ]
//   //   }
//   // ],
// };
// options.data ={
//     csvURL: 'http://localhost:5000/kq-train.csv',
//     startColumn : 5,
//     enablePolling: true,
//     dataRefreshRate: 2,
//     enabled: true,
// };

// Highcharts.chart('container-speed', options);

// });


const data_test = []

var chart = new Chart('container-speed', {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Tốt', 'Trung bình', 'Kém', 'Xấu', 'Rất xấu', 'Nguy hại'],
        datasets: [{
            label: ['CẢNH BÁO CHẤT LƯỢNG KHÔNG KHÍ'],
            backgroundColor: ['#00e400','#FFFF00','#FF7E00','#FF0000','#99004c','#7E0023'],
            data: [0, 0, 0, 0,0,0]
        }
      ]
    },

    // Configuration options go here
    options: {}
});


const url_api = "http://aqi18cevku.tk:8000/api-smart-campus/get-data-result";
const CO = document.getElementById('CO');
const O3 = document.getElementById('O3');
const SO2 = document.getElementById('SO2');
const NO2 = document.getElementById('NO2');
const PM25 = document.getElementById('PM25');
const PM10 = document.getElementById('PM10');

function startLiveUpdate(){

  fetch(url_api)
  .then(response => {
      return response.json();
  })
  .then(data => {

    var array = data;

    var array_reverse = array.reverse();

    CO.textContent = array_reverse[0].CO;
    O3.textContent = array_reverse[0].O3;
    SO2.textContent = array_reverse[0].SO2;
    NO2.textContent = array_reverse[0].NO2;
    PM25.textContent = array_reverse[0].PM25;
    PM10.textContent = array_reverse[0].PM10;
    

   
      
      
  })
  .catch(function(error){
      console.log(error);
  });
}
setInterval(startLiveUpdate,1000);

document.addEventListener('DOMContentLoaded', function(){
startLiveUpdate(); 
})








var defaultData = url_api;
window.onload = function () {

  var dps1 = [];
  var dps2 = [];
  var dps3 = [];
  var dps4 = [];
  var dps5 = [];
  var dps6 = []; // dataPoints
  var chart = new CanvasJS.Chart("data1", {
    title :{
      text: "DATA UPDATE"
    },
    data: [{
      type: "spline",
      name:"PM25",
      dataPoints: dps1
    },{
      type: "spline",
      name:"PM25",
      dataPoints: dps2

    },
    {
      type: "spline",
      dataPoints: dps3
    },{
      type: "spline",
      dataPoints: dps4

    },
    {
      type: "spline",
      dataPoints: dps5
    },{
      type: "spline",
      dataPoints: dps6

    }
  ],

  });
  
  var xVal = 0;
  var yVal = 100; 
  var updateInterval = 1000;
  var dataLength = 20; // number of dataPoints visible at any point
  
  var updateChart = function (count) {
  
    fetch(url_api)
  .then(response => {
      return response.json();
  })
  .then(data => {

    var array = data;
    var array_reverse = array.reverse();
    console.log(array_reverse[0].PM25);

      const CO = array_reverse[0].CO;
      const CO2 =JSON.parse(CO);
      const PM25 = array_reverse[0].PM25;
      const PM252 =JSON.parse(PM25);
      const PM10 = array_reverse[0].PM10;
      const PM102 =JSON.parse(PM10);
      const NO2 = array_reverse[0].NO2;
      const NO22 =JSON.parse(NO2);
      const SO2 = array_reverse[0].SO2;
      const SO22 =JSON.parse(SO2);
      const O3 = array_reverse[0].O3;
      const O32 =JSON.parse(O3);
      
      dps1.push({
        y:  PM252,
      }),
      dps2.push({
       
        y:  PM102,
        
      }),
      dps3.push({
       
        y:  NO22,
        
      }),
      dps4.push({
       
        y:  CO2,
        
      }),
      dps5.push({
       
        y:  SO22,
        
      }),
      dps6.push({
       
        y:  O32,
        
      })
      
     
      if (PM25.length > dataLength) {
        PM25.shift();
      } if (PM10.length > dataLength) {
        PM10.shift();
      }
      if (NO2.length > dataLength) {
        NO2.shift();
      } if (CO.length > dataLength) {
        CO.shift();
      }
    
      if (SO2.length > dataLength) {
        SO2.shift();
      } if (CO.length > dataLength) {
        CO.shift();
      }
    
    
      
  })
  .catch(function(error){
      console.log(error);
  });
  
    
  

  
    chart.render();
  };
  
  updateChart(dataLength);
  setInterval(function(){updateChart()}, updateInterval);
  
  }
  function updateData (){
    fetch(url_api)
    .then(response => {
        return response.json();
    })
    .then(data => {
      var array = data;
   
      var array_reverse = array.reverse();
  
        const kq1 = array_reverse[0].kq1;
        const kq2 = array_reverse[0].kq2;
        const kq3 = array_reverse[0].kq3;
        const kq4 = array_reverse[0].kq4;
        const kq5 = array_reverse[0].kq5;
        const kq6 = array_reverse[0].kq6;
       console.log(kq1, kq2, kq3, kq4, kq5, kq6);
        chart.data.datasets[0].data = [kq1, kq2, kq3, kq4, kq5, kq6];
        chart.update();
    })
    .catch(function(error){
        console.log(error);
    });
    
  }
  setInterval(function(){updateData()}, 1000);




  



  
// Highcharts.chart('data1', {
//   chart: {
//       type: 'line'
//   },
//   title: {
//       text: 'Live Data'
//   },

//   subtitle: {
//       text: 'Trường đại học Công nghệ thong tin và truyền thông Việt - Hàn: <a href="http://vku.udn.vn/" target="_blank">vku.udn.vn</a>'
//   },

//   data: {
//       csvURL: 'http://14.250.220.17:5000/test.csv',
//       enablePolling: false,
//       dataRefreshRate: 2,

//   }
// });



// 