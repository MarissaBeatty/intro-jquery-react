(function() { //IIFE - immediately invoked function expression
  
  var FLICKR_API_KEY = '8284bf026642da8da2022909704338cb';
  var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api+key='
  
  function getPhotosForSearch(searchTerms) {
    //ES6 template string - to collect our variables together into the url we'll use to ask the API for data
    var url = `${FLICKR_API_URL}${FLICKR_API_KEY}&text=${searchTerms}&safe_search=1`;
    return (
        $.getJSON(url)
        .then(data => data.photos.photo)
        );
  }

  function createFlickrThumb(photoData) {
    var thumbnail = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_q.jpg`;
    var large = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;
    var title = `${photoData.title}`
    
    var link = $("<a></a>"); //create a new link
    link.attr('href', large); //set the link's destination 
    link.attr('target', '_blank');  // set the links target. this will open link in a new tab
    
    var image = $("<img></img>"); //now we have the link, we are going to draw the img 
    image.attr('src', thumbnail); //set the img's source attribute
    image.attr('alt', title); //set the img alt attribute (for screen readers or if the img cant load for some reason)
    link.append(image); //add the image to the link
    // the function createFlickrThumb actually returns an anchor with a image inside that would look like this:
    // <a href="URL OF THE LARGE IMAGE" target="_blank">
    //   <img src="URL OF THE THUMBNAIL" alt="TITLE OF THE IMAGE">
    // </a>
  
    return link; //now we can disply the link, which "contains" an image - when I click on the image, I'l go to a new tab with the larger image
  }
  
  //set variables from our HTML for the event listener to understand
  //just like with the weather app
  var app = $('#app');
  var searchForm = app.find('.search-form');
  var searchInput = searchForm.find('.search-input');
  var flickrPhotos = app.find('.flickr-photos');
  
  //event listener - this is where everything comes together
  searchForm.on('submit', function(event) { 
    event.preventDefault(); 
    getPhotosForSearch(searchInput.val()) //takes our search terms, using them to call the first function we create
      .then(photos => { //takes the array that we get back
        photos.forEach(photo => //for each photo in the array
        // console.log(photo)
        flickrPhotos.append(createFlickrThumb(photo)) //create a new thumbnail and add it to the gallery by calling the create function
        )
      })
      searchInput.val('');
  })
  getPhotosForSearch();
  
  
  
  
  //page loader
  
  var overlay = $("#overlay");
  
  $(window).on('load', function () {
  overlay.hide();
  });
} ()) //end of IIFE