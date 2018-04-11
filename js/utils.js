function buildPhotoURL(photo, sizeChar) {
  return 'https://c1.staticflickr.com/' + photo.getAttribute('farm') + '/' + photo.getAttribute('server') + '/' + photo.id + '_' + photo.getAttribute('secret') + '_' + sizeChar + '.jpg'
}

export {buildPhotoURL};