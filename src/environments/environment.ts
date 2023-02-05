// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = { 
  urlApi:'https://api.adamix.net/apec/cedula/',
  production: false, 
  serverUrl: 'https://omsagorestapi.azurewebsites.net/api', 
  firebaseConfig : {
    apiKey: "AIzaSyCh5wEe3Jvm6USE17ZfM9YUIQ4ySQKFxUg",
    authDomain: "anonymous-app-68b2a.firebaseapp.com",
    projectId: "anonymous-app-68b2a",
    storageBucket: "anonymous-app-68b2a.appspot.com",
    messagingSenderId: "563137018123",
    appId: "1:563137018123:web:33313f6e081fa94e43ca0e",
    measurementId: "G-4XEMDNT9S6"
  }
  }; 

  export const snapshortToArray = (snapshot : any) => { 
    let returnArray: any[] = []; 
    snapshot.forEach((element:any) => { 
      let item = element.val(); 
      if (item) { 
        item.key = element.key; 
        returnArray.push(item); 
      } }); 
      return returnArray; 
  }

  export const snapshortToArrayList = (snapshot : any) => { 
    let returnArray: any[] = []; 
    snapshot.forEach((element:any) => { 
      let item = element.val(); 
      if (item?.key) { 
        item.key = element.key; 
        returnArray.push(item); 
      } }); 
      return returnArray; 
  }