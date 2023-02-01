/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

 import { Languages } from "@common";
import { cleanCart } from "@redux/actions";
import * as actions from "./actions";
import { checkCardExisted, formatCreditCard } from "./utils";

/**
 * @function getPaymentSettings get payment setting
 */
export const getPaymentSettings = () => (dispatch) => {
  try {
    dispatch(actions.paymentSettingPending());
     
  } catch (error) {
    dispatch(actions.paymentSettingFailure(error));
  }
};

/**
 * @function addCreditCard add credit card with webservice
 * @param {Object} params {cardVaultUrl, creditCard}
 */
export const addCreditCard = (params) => (dispatch) => {
  try {
    dispatch(actions.addCreditCardPending());
    
  } catch (error) {
    dispatch(actions.addCreditCardFailure(error));
  }
};

/**
 * @function checkoutWithCreditcard
 */
export const checkoutWithCreditcard = ({ checkoutId, payment }) => (
  dispatch
) => {
  try {
    dispatch(actions.completeCreditCardPending());
    
  } catch (error) {
    dispatch(actions.completeCreditCardFailure(error));
  }
};

/**
 * @function checkoutFree
 */
export const checkoutFree = ({ checkoutId }) => (dispatch) => {
  try {
    dispatch(actions.completeFreePending());
    
  } catch (error) {
    dispatch(actions.completeFreeFailure(error));
  }
};
