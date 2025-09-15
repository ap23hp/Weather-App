export async function getWeatherGiph(searchQuery) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=l1wEzY4jfVaD1bjrRNuQFtWwYuDFf2iH&s=${searchQuery}`
    );
        const data = await response.json();

      return {
  src : data.data.images.original.url
      }  

  }  catch(error) {
            console.error("Fetch failed:", error);
            return{
src :"https://media.giphy.com/media/3oEduQAsYf0d8g6H0Y/giphy.gif" // error fallback GIF
            }
            
          }
}
