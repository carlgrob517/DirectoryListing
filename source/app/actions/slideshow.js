import * as actionTypes from "./actionTypes";
import * as  API  from '../config/api';


export const slideshow = (credential, callback) => dispatch => {
  //call api and dispatch action case

    console.log("slide post url");
    console.log(API.SLIDE_URL);

      const body = credential;      
      const request = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          url: `${API.SLIDE_URL}`,
          method: 'get',          
        };
        // body: JSON.stringify(body),  
          
      fetch(request.url, request)
        .then((res) => {
            
          if(res.ok) {
              res
              .json()
              .then((response)=> {              
                if (typeof callback === "function") {
                  callback({ success: true, data:response });
                }

              })
          } else {
              dispatch({ type: actionTypes.LOGIN_ERROR });
          }
        })    
};


export const basic = (credential, callback) => dispatch => {
  //call api and dispatch action case

    console.log("api post url");
    console.log(API.CAT_URL);

      const body = credential;      
      const request = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          url: `${API.BASIC_URL}`,
          method: 'get',          
        };
      // body: JSON.stringify(body),  
        
          
      fetch(request.url, request)
        .then((res) => {
            
          if(res.ok) {
              res
              .json()
              .then((response)=> {              
                if (typeof callback === "function") {
                  callback({ success: true, data:response });
                }

              })
          } else {
              dispatch({ type: actionTypes.LOGIN_ERROR });
          }
        })    
};



