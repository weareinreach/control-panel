export default function getCookie(name){
  var cookieArray = document.cookie.split(';');
  for(var i=0; i < cookieArray.length; i++){
    var cookieKeyValuePair = cookieArray[i].split('=');
    if(name === cookieKeyValuePair[0].trim()) {
      return(cookieKeyValuePair[1]);
    };
  };
  return null;
};
