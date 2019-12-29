var Key;

var AssetLoadTrue = false;

var statsSearchHero;

window.onload = async function (){
var HeroSearch = localStorage.getItem('HeroSearch');

console.log("HeroSearch", HeroSearch);
var Loadstring;
  if(HeroSearch == "undefined" || HeroSearch == null){
    Loadstring = 'MAN';
    this.localStorage.setItem("HeroSearch", Loadstring);
  }
  else{
    Loadstring = HeroSearch;
  }

  var loading = document.getElementById('loading');
  loading.style.display = "block !important";
  this.AssetLoadTrue = true;
  this.DashboardPage("/search/"+ Loadstring, Loadstring);
}

var statsSearch = document.querySelector('#statsSearch');
statsSearch.addEventListener('keyup', e => {
  console.log('e', e);
  if (e.keyCode == 13) {
    var loading = document.getElementById('loading');
    loading.style.display = "block !important";
    loading.style.cssText = "display: block !important";
    this.AssetLoadTrue = false;

    this.statsSearchHero = statsSearch.value;
debugger;
    Key = "/search/" + statsSearchHero;
    console.log('value', statsSearch.value);
    this.DashboardPage(Key, statsSearchHero);
  }
});

function AssetLoad(LoadData){

  var statsDashboard = document.getElementById("statsDashboard");
  var NoDataFound = document.getElementById("NoDataFound");
  var cardsuper = document.querySelectorAll("#cardsuper");
  var loading = document.getElementById('loading');

  if(cardsuper != null){
    cardsuper.forEach(characters =>{
      characters.parentNode.removeChild(characters);
    });
  }

  if(LoadData.response != 'error'){

    if(this.statsSearchHero != null )
    localStorage.setItem('HeroSearch',this.statsSearchHero);
    NoDataFound.style.display = "none";
    for(var i=0; i < LoadData.results.length; i++){
      var stats = LoadData.results[i];

      var StatsData = 
                  `<a href="./examples/profile.html">
                    <div class="col-xl-4" id="cardsuper" onclick="SuperHero(${stats.id})">
                      <div class="card shadow card-alignment">
                        <div class="card-body">
                          <div class="chart">
                            <div class="card-profile-image card-transform">
                              <a href="javascript:void(0)">
                                <img src="${stats.image.url}">
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="card-header bg-transparent">
                          <div class="row align-items-center">
                            <div class="col">
                              <h6 class="text-uppercase text-muted ls-1 mb-1">${stats.work.occupation}</h6>
                              <h2 class="mb-0 align-items-center">${stats.name}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>`
      
      statsDashboard.innerHTML += StatsData;
      }
    }
    else{
      var SpanNotFound = document.getElementById("SpanNotFound");
    SpanNotFound.innerHTML = 'Invaild Name';
      NoDataFound.style.display= "block !important";
      NoDataFound.style.cssText = "display: block !important";
    }
    loading.style.display = "none !important";
    loading.style.cssText = "display: none !important";
  }


function DashboardPage(Key, NewVal){
  debugger;

  var ExistingSearchString = localStorage.getItem('HeroSearch');
  var ProjectLoadData;
  ProjectLoadData = localStorage.getItem('ProjectLoadData');
  console.log('ProjectLoadData', JSON.stringify('ProjectLoadData'));

  if (ProjectLoadData == "[object Object]" || ProjectLoadData == "undefined" || ProjectLoadData == null) {
    this.GetData(Key);
  }
  else {
    var resultFor = JSON.parse(ProjectLoadData);
    if (resultFor['results-for'] == NewVal) {
      if (this.AssetLoadTrue == true) {
        var ProjectData = JSON.parse(ProjectLoadData);
        console.log('ProjectLoadData', ProjectData);
        AssetLoad(ProjectData);
      }
      else {
        AssetLoad(ProjectData);
      }
    }
    else {
      this.GetData(Key);
    }
  }
//}
}



function GetData(Key){

  var request = new XMLHttpRequest()
  request.open('GET', 'http://localhost:57954/api/superHero/specificSuperHero?' + Key + '', true)
  request.onload = function () {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      console.log("data.result", data.result);
      LoadData = data.results;
      if(this.AssetLoadTrue == true){
        localStorage.setItem('ProjectLoadData', JSON.stringify(data.results.results));
        AssetLoad(data.results.results);
      }
      else{
        localStorage.setItem('ProjectLoadData', JSON.stringify(data.results));
        AssetLoad(data.results);
      }
    } else {
      console.log('error');
    }
  }
  request.onerror = function() {
    var NoDataFound = document.getElementById("NoDataFound");
    var SpanNotFound = document.getElementById("SpanNotFound");
    var loading = document.getElementById('loading');

    SpanNotFound.innerHTML = 'Server Error';
    NoDataFound.style.display= "block !important";
    NoDataFound.style.cssText = "display: block !important";
    loading.style.display = "none !important";
    loading.style.cssText = "display: none !important";
  }
  request.send();

}

function SuperHero(superHeroId){
debugger;
  var loading = document.getElementById('loading');

  loading.style.display = "block !important";
  loading.style.cssText = "block: none !important";

  var request = new XMLHttpRequest()
  request.open('GET', 'http://localhost:57954/api/superHero/specificSuperHero?' + superHeroId + '', true)
  request.onload = function () {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      console.log("data.results", data.results);
      LoadData = data.results;
      localStorage.setItem('SpecificSuperHero',JSON.stringify(LoadData));
      window.location.href = './examples/profile.html';
      loading.style.display = "none !important";
      loading.style.cssText = "display: none !important";
    }
    else{

    }
  }
  request.send();
}
