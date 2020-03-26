import { api } from "@config";
import * as ACTION_TYPES from './actionTypes';
import { AsyncStorage } from 'react-native';

export function refreshUsers(flag) {
  return {
    type: ACTION_TYPES.REFRESH_USERS,
    refreshUsers: flag
  }
}


export function login(credential, callback) {
  return (dispatch, getState) => {
    
      dispatch({ type: ACTION_TYPES.LOGIN });
      const body = credential;
      const request = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          url: `${api.baseURL}/api/user/login`,
          method: 'post',
          body: JSON.stringify(body),
        };
      console.log("login- request", request);
      fetch(request.url, request)
        .then((res) => {
          console.log(res);
          if(res.ok) {
              res
              .json()
              .then((response)=> {
                  _persistAuth(response.data)
                  .then(() => dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS, auth: response.data, credential: credential }))
                  .then(()=>{

                    if (typeof callback === "function") {
                      callback({ success: true });
                    }

                  })
                  .catch(console.error);
              })
          } else {
              dispatch({ type: ACTION_TYPES.LOGIN_FAILURE });
          }
        })   
  }
}

export function signup(credential) {
return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.SIGNUP });
    const body = credential;
    const request = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        url: `${api.baseURL}/api/user/signup`,
        method: 'post',
        body: JSON.stringify(body),
      };
    console.log("signup- request", request);
    fetch(request.url, request)
      .then((res) => {
        console.log(res);
        if(res.ok) {
            res
            .json()
            .then((response)=> {
                _persistAuth(response.data)
                .then(() => dispatch({ type: ACTION_TYPES.SIGNUP_SUCCESS, auth: response.data, credential: credential }))
                .then(()=>{

                })
                .catch(console.error);
            })
        } else {
            res
            .json()
            .then((result => {
              if(result && result.message)
              showToast(result.message, 'short');
            }))
            .catch(console.error);
            dispatch({ type: ACTION_TYPES.SIGNUP_FAILURE });
        }
      })   
}
}



// export function search(data) {

//   let params = {
//     id : data.id,
//     limit : data.limit,
//     query: data.query,
//     offset : data.offset
//   }
  
//   return {
//     type: ACTION_TYPES.SEARCH_USERS,
//     request: {
//       url: `${api.baseURL}/api/user/${params.id}/search?username=${params.query}&limit=${params.limit}&offset=${params.offset}`,
//     }
    
//   }
// } 


// export function  getNearByUsers(data) {

//     let params = {
//         id : data.id,
//         limit : data.limit,
//         offset : data.offset,
//         online: data.online
//     }
//     return {
//       type: ACTION_TYPES.GET_NEARBY_USERS,
//       request: {
//         url: `${api.baseURL}/api/user/${params.id}/nearbyUsers/limit/${params.limit}/offset/${params.offset}/online/${params.online}`,
//       },
//     }
// }


// export function getTopUsers(data) {
//   console.log("Action-getTopUsers");
//   let params = {
//       id : data.id,
//       limit : data.limit,
//       offset : data.offset
//   }
//   return {
//       type: ACTION_TYPES.GET_TOP_USERS,
//       request: {
//         url: `${api.baseURL}/api/user/${params.id}/top/limit/${params.limit}/offset/${params.offset}`,
//       },
//     }
// } 

// export function getNewUsers(data) {
//     console.log("Action-getNewUsers");
//     let params = {
//         id : data.id,
//         limit : data.limit,
//         offset : data.offset
//     }
//     return {
//         type: ACTION_TYPES.GET_NEW_USERS,
//         request: {
//           url: `${api.baseURL}/api/user/${params.id}/newUsers/limit/${params.limit}/offset/${params.offset}`,
//         },
//       }
// } 
  

// export function getWatchList(data) {
//     console.log("Action-getWatchList");
//     let params = {
//         id : data.id,
//         limit : data.limit, 
//         offset : data.offset,
//         online: data.online
//     }
//     return {
//         type: ACTION_TYPES.GET_WATCHLIST_USERS,
//         request: {
//           url: `${api.baseURL}/api/user/${params.id}/watchlist/limit/${params.limit}/offset/${params.offset}/online/${params.online}`,
//         },
//       }
// }


// export function getFilterUsers(data, filterSettings) {
//     console.log("Action-getFilterUsers");
//     let params = {
//         id : data.id,
//         limit : data.limit, 
//         offset : data.offset,
//         online: data.online
//     }
//     return {
//         type: ACTION_TYPES.GET_FILTER_USERS,
//         request: {
//           url: `${api.baseURL}/api/user/${params.id}/filter/limit/${params.limit}/offset/${params.offset}/online/${params.online}`,
//           method: 'post',
//           body: JSON.stringify(filterSettings)
//         },
//       }
// }

// export function changeLocation(data) {
//   let params = {
//       id : data.id,
//       locationX : data.longitude, 
//       locationY : data.latitude,
//   }
//   console.log("change Location", params);
//   return {
//       type: ACTION_TYPES.CHANGE_LOCATION,
//       request: {
//         url: `${api.baseURL}/api/user/${params.id}/location`,
//         method: 'post',
//         body: JSON.stringify(params)
//       },
//     }
// }



