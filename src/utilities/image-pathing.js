// Dynamically get images from our ./assets/imgs folder to 
// import into our react application for any component that
// needs images without having to statically code each page
// and image location
function getImageURL(name) {
    return new URL(`../assets/imgs/${name}`, import.meta.url).href;
}

export default {getImageURL};