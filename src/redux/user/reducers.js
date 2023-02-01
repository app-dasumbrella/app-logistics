/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from "./types";
import { addAndUpdateUserAddress, deleteUserAddress } from "./utils";

const initialState = {
  userInfo: null,
  accessToken: null,
  expiresAt: null,
  isFetching: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case types.USER_CREATE_ADDRESS_FETCHING:
    case types.USER_DELETE_ADDRESS_FETCHING:
    case types.USER_UPDATE_ADDRESS_FETCHING:
    case types.USER_UPDATE_DEFAULT_ADDRESS_FETCHING:
    case types.LOGIN_FETCHING:
    case types.REGISTER_FETCHING:
    case types.USER_INFO_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.USER_CREATE_ADDRESS_FAILURE:
    case types.USER_DELETE_ADDRESS_FAILURE:
    case types.USER_UPDATE_ADDRESS_FAILURE:
    case types.USER_UPDATE_DEFAULT_ADDRESS_FAILURE:
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
    case types.USER_INFO_FAILURE: {
      console.warn(payload);
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        userInfo: {...payload.userInfo,addresses:[],defaultAddress:{}},
        logintype: payload.logintype,
        isFetching: false,
        error: null,
      };
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }

    case types.USER_UPDATE_DEFAULT_ADDRESS_SUCCESS:{
      return {
        ...state,
        userInfo:{...state.userInfo,
          defaultAddress:{
            ...payload 
          }

        },
        isFetching: false,
        error: null,
      };
    }
    case types.USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: payload.user,
        isFetching: false,
        error: null,
      };
    }

    case types.USER_CREATE_ADDRESS_SUCCESS:
    case types.USER_UPDATE_ADDRESS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        userInfo: addAndUpdateUserAddress({
          userInfo: state.userInfo,
          address: payload.address,
          id: payload.id,
        }),
      };
    }

    case types.USER_DELETE_ADDRESS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        userInfo: deleteUserAddress({
          id: payload.id,
          userInfo: state.userInfo,
        }),
      };
    }

    case types.LOGOUT: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
