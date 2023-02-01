/**
 * created by Inspire UI (dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * checkout check
 */
export const paymentSettingPending = () => ({
  type: types.PAYMENT_SETTING_FETCHING,
});

export const paymentSettingSuccess = (data) => ({
  type: types.PAYMENT_SETTING_SUCCESS,
  payload: {
    data,
  },
});

export const paymentSettingFailure = (error) => ({
  type: types.PAYMENT_SETTING_FAILURE,
  payload: error,
  error: true,
});

/**
 * add credit card
 */
export const addCreditCardPending = () => ({
  type: types.PAYMENT_ADD_CREDIT_CARD_FETCHING,
});

export const addCreditCardSuccess = (card) => ({
  type: types.PAYMENT_ADD_CREDIT_CARD_SUCCESS,
  payload: {
    data: card,
  },
});

export const addCreditCardFailure = (error) => ({
  type: types.PAYMENT_ADD_CREDIT_CARD_FAILURE,
  payload: error,
  error: true,
});

/**
 * checkout with credit card
 */
export const completeCreditCardPending = () => ({
  type: types.PAYMENT_COMPLETE_CREDIT_CARD_FETCHING,
});

export const completeCreditCardSuccess = (data) => ({
  type: types.PAYMENT_COMPLETE_CREDIT_CARD_SUCCESS,
  payload: data,
});

export const completeCreditCardFailure = (error) => ({
  type: types.PAYMENT_COMPLETE_CREDIT_CARD_FAILURE,
  payload: error,
  error: true,
});

/**
 * checkout free
 */
export const completeFreePending = () => ({
  type: types.PAYMENT_COMPLETE_FREE_FETCHING,
});

export const completeFreeSuccess = (data) => ({
  type: types.PAYMENT_COMPLETE_FREE_SUCCESS,
  payload: data,
});

export const completeFreeFailure = (error) => ({
  type: types.PAYMENT_COMPLETE_FREE_FAILURE,
  payload: error,
  error: true,
});
