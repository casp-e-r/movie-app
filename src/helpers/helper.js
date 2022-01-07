
export const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  export const getYear = (date) => {
    if (date) {
      return date.split('-')[0];
    }
  };
  export  const delay = ms => new Promise(res => setTimeout(res, ms));  
  
  export function truncate(string, n){
    return string?.length>n ?string.substr(0,n-1) +'...':string;
}