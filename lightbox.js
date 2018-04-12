
const apiKey = 'be28fab2070ac5552f52ebb195b7a44d'
const photosetID = '72157678202991065' 
const userID = '38042235@N02'

var request = new XMLHttpRequest();
const photoStore = []
var currentImage = {}
var currentIndex = 0
var thumbIndex = 0

var currentImageElement = document.getElementById('current-image')
var gridContainer = document.getElementById('grid-container')
var title = document.getElementById('title')
var thumb1 = document.getElementById('thumb1')
var thumb2 = document.getElementById('thumb2')
var thumb3 = document.getElementById('thumb3')
var thumb4 = document.getElementById('thumb4')
var thumbBack = document.getElementById('thumbBack')
var thumbForward = document.getElementById('thumbForward')
const thumbs = document.querySelectorAll('.thumbnail-img')

const setSelected = () => {
  currentImage = photoStore[currentIndex]
  currentImageElement.setAttribute("src", currentImage.href)
  title.innerText = currentImage.title
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

const setThumbnails = () => {
  thumb1.setAttribute("src", photoStore[thumbIndex].thumb)
  thumb2.setAttribute("src", photoStore[thumbIndex+1].thumb)
  thumb3.setAttribute("src", photoStore[thumbIndex+2].thumb)
  thumb4.setAttribute("src", photoStore[thumbIndex+3].thumb)
  thumb1.setAttribute("value", thumbIndex)
  thumb2.setAttribute("value", thumbIndex+1)
  thumb3.setAttribute("value", thumbIndex+2)
  thumb4.setAttribute("value", thumbIndex+3)
}

const handleThumbClick = (thumb) => {
  currentIndex = parseInt(thumb.getAttribute('value'))
  console.log(`what is currentIndex: `, currentIndex)  
  currentImageElement.setAttribute("src", photoStore[currentIndex].href)
  title.innerText = photoStore[currentIndex].title
  openModal()
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
      href: buildPhotoURL(photos[i], 'c')
    }
    var gridImage = document.createElement('img')
    gridImage.src = thumb
    gridImage.className = "grid-item"
    gridImage.id = i
    gridContainer.appendChild(gridImage)
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
  setThumbnails()
  title.innerText = currentImage.title
  console.log(`what is currentImage: `, currentImage)
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

thumbs.forEach((thumb) => thumb.addEventListener('click', (e) => {
  handleThumbClick(thumb)
}))

thumbBack.addEventListener('click', function() {
  if (thumbIndex > 0) {
    thumbIndex -= 1
    setThumbnails()
  }   
})

thumbForward.addEventListener('click', function() {
  if (thumbIndex < photoStore.length-4) {
    thumbIndex += 1
    setThumbnails()
  }
})

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
      // grid.innerText = request.responseText;
    } else {
      gridContainer.innerText = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
    } 
  }
}
