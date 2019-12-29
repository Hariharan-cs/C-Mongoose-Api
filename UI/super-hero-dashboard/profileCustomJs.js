var SpecificSuperHero = JSON.parse(localStorage.getItem('SpecificSuperHero'));
this.individualProfile(SpecificSuperHero);
var HeroSearch = localStorage.getItem('HeroSearch')
localStorage.setItem('HeroSearch', HeroSearch);


function individualProfile(LoadData){
    if(LoadData.response != 'error'){ 
      var profileHeader = document.getElementById('profileHeader');
      var ProfileIcon = document.getElementById('ProfileIcon');

      var profileIconMain = `
      <div class="media align-items-center">
        <span class="avatar avatar-sm rounded-circle">
          <img alt="Image placeholder" src="${LoadData.image.url}">
        </span>
        <div class="media-body ml-2 d-none d-lg-block">
          <span class="mb-0 text-sm  font-weight-bold">${LoadData.name}</span>
        </div>
      </div>`;

      ProfileIcon.innerHTML += profileIconMain;
  
    var Header = `
    <!-- Header -->
      <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 500px; background-image: url(${LoadData.image.url}); background-size: cover; background-position: center;">
        <!-- Mask -->
        <span class="mask bg-gradient-default opacity-8"></span>
        <!-- Header container -->
        <div class="container-fluid d-flex align-items-center">
          <div class="row">
            <div class="col-lg-7 col-md-12" style="margin-right:300px;">
              <h1 class="display-2 text-white">Hello ${LoadData.name}</h1>
              <p class="text-white mt-0 mb-5">${LoadData.biography.publisher}</p>
            </div>
          </div>
        </div>
      </div>`;
      profileHeader.innerHTML += Header;
      this.SpecificProfileDetails(LoadData);
    }
    else{
  
    }
  
  }

  function SpecificProfileDetails(LoadData){
    var SpecificProfileDetails = document.getElementById('SpecificProfileDetails');

    var profileDetails = `
    <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
      <div class="card card-profile shadow">
        <div class="row justify-content-center">

        <div class="card-body pt-0 pt-md-4">
        <div class="row">
          <div class="col">
            <div class="card-profile-stats d-flex justify-content-center mt-md-5" style="margin-top: 0rem !important;">
              <div>
                <span class="heading">${LoadData.powerstats.speed}</span>
                <span class="description">Speed</span>
              </div>
              <div>
                <span class="heading">${LoadData.powerstats.durability}</span>
                <span class="description">Durability</span>
              </div>
              <div>
                <span class="heading">${LoadData.powerstats.power}</span>
                <span class="description">Power</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <h3>
          Alter Egos <span class="font-weight-light"> - ${LoadData.biography['alter-egos']}</span>
          </h3>
          <h3>
          Alignment <span class="font-weight-light"> - ${LoadData.biography['alignment']}</span>
          </h3>
          <div class="h5 font-weight-300">
            <i class="ni location_pin mr-2"></i>Height - ${LoadData.appearance.height[0]} 
          </div>
          <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i>Weight - ${LoadData.appearance.weight [0]} 
          </div>
          <div class="h5 mt-4">
            <i class="ni business_briefcase-24 mr-2"></i> Eye Color -${LoadData.appearance['eye-color'] != '-' ? LoadData.appearance['eye-color'] : ' Not Available' }
          </div>
          <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i> Hair Color -${LoadData.appearance['hair-color'] != '-' ? LoadData.appearance['hair-color'] : ' Not Available' }
        </div>
          
        </div>
      </div>
        </div>
      </div>
    </div>

    <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
      <div class="card card-profile shadow">
        <div class="row justify-content-center">
          <div class="col-lg-3 order-lg-2">
            <div class="card-profile-image">
              <a href="#">
                <img src="${LoadData.image.url}" class="rounded-circle" width="150" height="150">
              </a>
            </div>
          </div>
        </div>
        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div class="d-flex justify-content-between">
            <a href="javascript:void(0)" class="btn btn-sm btn-info mr-4">${LoadData.appearance.gender}</a>
            <a href="javascript:void(0)" class="btn btn-sm btn-default float-right">${LoadData.appearance.race}</a>
          </div>
        </div>
        <div class="card-body pt-0 pt-md-4">
          <div class="row">
            <div class="col">
              <div class="card-profile-stats d-flex justify-content-center mt-md-5" style="margin-top: 0rem !important;">
                <div>
                  <span class="heading">${LoadData.powerstats.intelligence}</span>
                  <span class="description">Intelligence</span>
                </div>
                <div>
                  <span class="heading">${LoadData.powerstats.strength}</span>
                  <span class="description">Strength</span>
                </div>
                <div>
                  <span class="heading">${LoadData.powerstats.combat}</span>
                  <span class="description">Combat</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <h3>
            ${LoadData.name}<span class="font-weight-light"> / ${LoadData.biography['full-name']}</span>
            </h3>
            <div class="h5 font-weight-300">
              <i class="ni location_pin mr-2"></i>Place of Birth - ${LoadData.biography['place-of-birth'] != '-' ? LoadData.biography['place-of-birth'] : 'Not Available' } 
            </div>
            <div class="h5 mt-4">
              <i class="ni business_briefcase-24 mr-2"></i>${LoadData.work.occupation != '-' ? LoadData.work.occupation + ' -' : '' }  ${LoadData.work.base}
            </div>
            <div>
              <i class="ni education_hat mr-2"></i>${LoadData.biography['first-appearance'] != '-' ? LoadData.biography['first-appearance'] : '' }
            </div>
            <hr class="my-4" />Group Affiliation: 
            <p>${LoadData.connections['group-affiliation']}</p>
          </div>
        </div>
      </div>
    </div>



    <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
      <div class="card card-profile shadow">
        <div class="row justify-content-center">
        <div class="card-body pt-0 pt-md-4">
        <div class="text-center">
        <h3>
        Relatives
        </h3>
          <hr class="my-4" />
          <p>${LoadData.connections['relatives'] != '-' ? LoadData.connections['relatives'] : 'Not Available' }</p>
        </div>
        </div>
        </div>
      </div>
    </div>

    
    `;
    SpecificProfileDetails.innerHTML +=profileDetails;

  }