import * as actionTypes from "./actionTypes";
import * as  API  from '../config/api';

const onLogin = data => {
  return {
    type: actionTypes.LOGIN,
    data
  };
};

export const authentication = (type, credential, callback) => dispatch => {
  //call api and dispatch action case

      const body = credential;      
      let url = "";
      if(type == 'login'){
        url = API.LOGIN_URL;
      }else if(type == 'register'){
        url = API.REGISTER_URL; 
      }
      
      console.log("url:" + url);
      console.log("body:" + body);
      const request = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          url:url,
          method: 'post',
          body: JSON.stringify(body),
        };
      
          
      fetch(request.url, request)
        .then((res) => {
            
          if(res.ok) {
              res
              .json()
              .then((response)=> {

                console.log("--------------------------");
                console.log(response);

                if (typeof callback === "function" ) {
                  if(response.results == 200){
                    callback({ success: true, response:response });
                  }else{
                    callback({ success: false, response:response });
                  }                  
                }

              })
          } else {
              dispatch({ type: actionTypes.LOGIN_ERROR });
          }
        })    
};



