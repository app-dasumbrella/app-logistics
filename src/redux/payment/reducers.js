/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { Config } from "@common";
import * as types from "./types";
import settingData from './../../data/json/site_1.0.json'

const initialState = {
  paymentMethods:settingData.settings.payment,
  bnpl:settingData.settings.bnpl,
  paymentSettings: {},
  isFetching: false,
  error: null,
  payments: [],
};

export default (state = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case types.PAYMENT_COMPLETE_FREE_FETCHING:
    case types.PAYMENT_COMPLETE_CREDIT_CARD_FETCHING:
    case types.PAYMENT_ADD_CREDIT_CARD_FETCHING:
    case types.PAYMENT_SETTING_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.PAYMENT_COMPLETE_FREE_FAILURE:
    case types.PAYMENT_COMPLETE_CREDIT_CARD_FAILURE:
    case types.PAYMENT_ADD_CREDIT_CARD_FAILURE:
    case types.PAYMENT_SETTING_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: payload.error,
      };
    }

    case types.PAYMENT_SETTING_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        paymentSettings: payload.data,
      };
    }

    case types.PAYMENT_ADD_CREDIT_CARD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        payments: [...state.payments, payload.data],
      };
    }

    case types.PAYMENT_COMPLETE_FREE_SUCCESS: {
      return {
        ...initialState,
      };
    }

    case types.PAYMENT_COMPLETE_CREDIT_CARD_SUCCESS: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};
