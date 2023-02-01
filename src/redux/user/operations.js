/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { cleanCart } from "@redux/actions";
import * as actions from "./actions";
import { isExpired } from "./utils";
import moment from "moment";

import Api, { api2, loadtoken } from "@services/Api";


/**
 * login to get accessToken --> get user info
 */
export const login = ({ email, password, logintype }, callback) => (
  dispatch
) => {
  try {
    console.log(email, password)
    dispatch(actions.loginPending());
    Api.post("/user/login", {
      email,
      password,
      // access_token: response.data.access_token,
    })
      .then((payload) => {
        console.log(payload)
        if (payload.status == 200) {
          if (payload && payload.data && payload.data.success) {
            dispatch(
              actions.loginSuccess({
                userInfo: {
                  name: "Customer ",
                  email,
                  ...payload.data,
                  access_token: payload.data.data.access_token,
                },
              })
            );
            callback({
              err: false,
              ...payload.data,
              email,
            });
          } else {
            callback({ err: true, ...payload.data });
            dispatch(actions.loginFailure(""));
          }
        }
      })
      .catch((err) => {
        console.log(err)
        callback({ err: true });
        dispatch(actions.loginFailure(""));
      });
    // if (logintype == "google") {
    //   dispatch(
    //     actions.loginSuccess({ email, userInfo: password.user, logintype })
    //   );
    //   callback(email);
    // } else if (logintype == "facebook") {
    //   dispatch(actions.loginSuccess({ email, userInfo: password, logintype }));
    //   callback(email);
    // } else {
    //   dispatch(
    //     actions.loginSuccess({
    //       email,
    //       userInfo: { email, name: "User Name" },
    //       logintype,
    //     })
    //   );
    //   callback(email);
    // }
  } catch (error) {
    dispatch(actions.loginFailure(error));
  }
};

export const register =
  ({ fullName, email, LoggedUser, password, auth_token, type, lang }, callback) =>
    (dispatch) => {
      try {
        console.log(fullName, email, LoggedUser, password, 'fullName, email, LoggedUser, password')
        dispatch(actions.registerPending());
        Api.post("/user/signup", {

          email,
          name: fullName,
          password: password,
          // auth_token: auth_token,
          // type: type,
          // lang: store.getState()?.app?.language?.code,

          //access_token: response.data.access_token,
        }).then((payload) => {
          if (payload.data.status == 200) {
            dispatch(
              actions.registerSuccess({
                userInfo: {
                  name: fullName,
                  email,
                  ...payload.data,
                  access_token: payload.data.data.access_token,
                  LoggedUser,
                },
              })
            );
            callback({
              err: false,
              name: fullName,
              email,
              ...payload.data,
              access_token: payload.data.data.access_token,
            });
          } else {
            dispatch(actions.registerFailure(payload?.data?.msg));
            callback({
              err: true,
              msg: payload?.data?.msg
            });
          }
        }).catch(err => {
          console.log(err)
        })

      } catch (error) {
        dispatch(actions.registerFailure(error));
      }
    };

/**
 * @function renewAccessToken renew accessToken when expired
 * @param {*} { accessToken }
 */
export const renewAccessToken = ({ accessToken }) => (dispatch, callback) => {
  try {

  } catch (error) {
    dispatch(actions.userInfoFailure(error));
  }
};

/**
 * get user info
 * @param {{}} { accessToken, expiresAt }
 */
export const getUserInfo = ({ accessToken, expiresAt }) => (dispatch) => {
  try {

  } catch (error) {
    dispatch(actions.userInfoFailure(error));
  }
};
/**
 * @function createUserAddress
 *
 * @param {*} { accessToken, address }
 */
export const createUserAddress = ({ address }, callback) => (dispatch) => {
  try {
    console.log("address", address);
    dispatch(actions.createUserAddressPending());
    let data = { ...address, id: moment().unix() };
    dispatch(actions.createUserAddressSuccess(data));
    callback({ customerAddress: data });
  } catch (error) {
    dispatch(actions.createUserAddressFailure(error));
  }
};

/**
 * @function updateUserDefaultAddress
 *
 * @param {} { accessToken, addressId }
 */
export const updateUserDefaultAddress = ({ address, id }) => (dispatch) => {
  try {
    dispatch(actions.updateUserDefaultAddressPending());

    dispatch(actions.updateUserDefaultAddressSuccess(address));
  } catch (error) {
    dispatch(actions.updateUserDefaultAddressFailure(error));
  }
};

/**
 * @function updateUserAddress
 *
 * @param {} { accessToken, addressId, address}
 */
export const updateUserAddress = ({ id, address }) => (
  dispatch
) => {
  try {
    dispatch(actions.updateUserAddressPending());

    dispatch(actions.updateUserAddressSuccess(address, id));
  } catch (error) {
    dispatch(actions.updateUserAddressFailure(error));
  }
};

/**
 * @function deleteUserAddress
 *
 * @param {} { accessToken, addressId, address}
 */
export const deleteUserAddress = ({ id }) => (dispatch) => {
  try {
    dispatch(actions.deleteUserAddressSuccess(id));
  } catch (error) {
    dispatch(actions.deleteUserAddressFailure(error));
  }
};

/**
 * @function logoutUser logout flow
 */
export const logoutUserAndCleanCart = () => (dispatch) => {
  dispatch(actions.logoutUser());
  dispatch(cleanCart());
};
