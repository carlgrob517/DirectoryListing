import * as actionTypes from "./actionTypes";
import * as  API  from '../config/api';


export const restaurants = (credential, callback) => dispatch => {
  //call api and dispatch action case

    console.log("api res url");
    console.log(API.RES_URL);

      const body = credential;      
      const request = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          url: `${API.RES_URL}`,
          method: 'post',
          body: JSON.stringify(body),  
        };        
        
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

