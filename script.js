const imageContainer = document.getElementById('image-container')
const loaderSpinner = document.getElementById('loader')

// Array of Photos -- GLOBAL VARIABLE
let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash API
const imgInitialCount = 5
const query = 'dark minimalist'
const accessKey = 'Vj0tmRfwzLoHN0qY0SA9BZ9FbAKyWdAMeVhWNysC1Tw'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${imgInitialCount}&query=${query}`

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    imgInitialCount = 30
  }
}

// Helper Function to setAtributes:
function setAtributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length

  photosArray.forEach((photo) => {
    let aHref = photo.links.html
    let imgSrc = photo.urls.regular
    let imgAlt = photo.alt_description
    let imgTitle = photo.alt_description

    // create <a> to link to Unsplash
    const item = document.createElement('a')

    setAtributes(item, {
      href: aHref,
      target: '_blank',
    })
    // create <img> for photo
    const img = document.createElement('img')
    setAtributes(img, {
      src: imgSrc,
      alt: imgAlt,
      title: imgTitle,
    })
    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded())
    // put <img> inside <a>, then put both inside imageContainer
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// Fetch Request using Asynchronous function - To Get Photos from Unspash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    // catch error here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
  }
})

// On Load
getPhotos()
