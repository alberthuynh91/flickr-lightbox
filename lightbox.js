
const apiKey = 'be28fab2070ac5552f52ebb195b7a44d'
const photosetID = '72157654805764758'
const userID = '38042235@N02'
const photoStore = []
var currentImage = {}
var currentIndex = 0
var request = new XMLHttpRequest()
const observer = lozad()
var currentImageElement = document.getElementById('current-image')
var gridContainer = document.getElementById('grid-container')
var title = document.getElementById('title')
const thumbs = document.querySelectorAll('.thumbnail-img')

const setSelected = () => {
  const { href, title } = currentImage
  currentImage = photoStore[currentIndex]
  currentImageElement.setAttribute("src", href)
  title.innerText = title
}

const buildPhotoURL = (photo, size) => {
  return 'https://c1.staticflickr.com/' + photo.getAttribute('farm') + '/' + photo.getAttribute('server') + '/' + photo.id + '_' + photo.getAttribute('secret') + '_' + size + '.jpg'
}

const openModal = () => {
  document.getElementById('myModal').style.display = "block";
}

const closeModal = () => {
  document.getElementById('myModal').style.display = "none";
}

function reqListener() {
  const xml = this.responseXML
  const photos = xml.getElementsByTagName("photo")
  for (var i = 0; i < photos.length; i++) {
    const thumb = buildPhotoURL(photos[i], 's')
    photoStore[i] = {
      index: i,
      title: photos[i].getAttribute('title'),
      thumb,
      href: buildPhotoURL(photos[i], 'b')
    }
    var gridImage = document.createElement('img')
    gridImage.src = 'placeholder.jpg'
    gridImage.className = "grid-item lozad"
    gridImage.id = i
    gridImage.setAttribute('data-src', thumb)
    gridContainer.appendChild(gridImage)
    observer.observe()
  }
  const gridItems = document.querySelectorAll('.grid-item')
  const handleGridClick = (item) => {
    currentIndex = parseInt(item.id)
    console.log(`what is currentIndex: `, currentIndex)  
    currentImageElement.setAttribute("src", photoStore[currentIndex].href)
    openModal()
  }
  gridItems.forEach((item) => item.addEventListener('click', (e) => {
    handleGridClick(item)
  }))
  currentImage = photoStore[0]
  currentImageElement.setAttribute("src", currentImage.href)
  title.innerText = currentImage.title
}

request.addEventListener('load', reqListener);

back.addEventListener('click', function() {
  if (currentIndex > 0) {
    currentIndex -= 1
    setSelected()  
  }
});

forward.addEventListener('click', function() {
  if (currentIndex < photoStore.length-1) {
    currentIndex += 1
    setSelected()
  }
});

document.onkeydown = function (event) { 
  if (event.keyCode == '37'){
    event.preventDefault();
    if (currentIndex > 0) {
      currentIndex -= 1 
      setSelected()
    }
  } else if (event.keyCode == '39') {
    event.preventDefault(); 
    if (currentIndex < photoStore.length-1) {
      currentIndex += 1
      setSelected()
    }
  }
}

request.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + photosetID + '&user_id=' + userID)
request.send()

request.onreadystatechange = function() {
  if(request.readyState === 4) {
    if(request.status === 200) { 
    } else {
      gridContainer.innerText = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
    } 
  }
}
