# Flickr Lightbox

A Lightbox implementation utilizing Flickr's API written in Vanilla Javascript, HTML, and CSS.

## Demo
`git clone https://github.com/alberthuynh91/flickr-lightbox.git`
`cd flickr-lightbox`
`open index.html`

## Technologies Used

Javascript
HTML
CSS
[Lozad.js](https://github.com/ApoorvSaxena/lozad.js#usage) (For lazy loading images) 

## Optimizations
- Reduced load time by 200+ ms with lazy loading (now 15-20ms page load time)
- Reduced download size of total images per page load with lazy loading
- Reduced asset sizes with minification of js and css files
- Did image compression on placeholder images drastically reducing file size
- Thumbnails being loaded are actually thumbnail size (75x75) taken from Flickr API