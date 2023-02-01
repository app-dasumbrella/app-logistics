/**
 * /* OPERATIONS = REDUX THUNKS
 * This file defines the public interface of the duck -- what can be dispatched from components
 * Simple operations are just about forwarding an action creator, ex: simpleQuack
 * Complex operations involve returning a thunk that dispatches multiple actions in a certain order, ex: complexQuack
 * https://github.com/alexnm/re-ducks/blob/fbf0f3ab05c283446ffaec02974c1b7f29272bf1/example-duck/operations.js
 * @format
 */

import { toast } from "@app/Omni";
import { Languages } from "@common";
 import * as actions from "./actions";

/**
 *  @function checkCheckout check checkout completed or existed
 *
 * @param {*} { checkoutId }
 */
export const checkCheckout = ({ checkoutId }) => (dispatch) => {
  try {
    
  } catch (error) {
    dispatch(actions.checkCheckoutFailure(error));
  }
};

/**
 * add all cart
 */
export const addAllToCart = ({ list, checkoutId }) => (dispatch) => {
  try {
    const lineItems = [];
    list.map((o) => {
      const item = o.product || o;
      const defaultVariant = item.variants && item.variants[0];
      return lineItems.push({
        variantId: defaultVariant.id,
        quantity: 1,
      });
    });
    dispatch(
      addToCart({
        items: lineItems,
        checkoutId,
      })
    );
  } catch (error) {
    console.warn(error);
  }
};

/**
 * addToCart have two options for shopify and woocommerce
 * 1: shopify --> need create checkout, after that update lineItems
 * 2: woocommerce --> add to cart store redux and create when finish
 */
export const addToCart = (
  { cartItems, product, selectedVariant },
  callback
) => (dispatch) => {
  try {
    let newlist=[]
    let filtered = cartItems.filter((item) => item.product.id == product.id);
    let withoutitem = cartItems.filter((item) => item.product.id != product.id);
    console.log(filtered.length)
    if(filtered.length==0){
     newlist = [
      ...cartItems,
      { product, variant: selectedVariant, quantity: 1 },
    ];
    }
    else{
      newlist =[ ...withoutitem,{product,variant:selectedVariant,quantity:filtered[0].quantity+1}]
    }
    let totalPrice = 0;
    newlist.map((i) => {
      totalPrice = totalPrice + i.variant.sale_price * i.quantity;
    });
    let checkout = {
      lineItems: newlist,

      totalPrice,
      subtotalPrice: 0,
    };

    dispatch(actions.createCheckoutSuccess(checkout));
    callback({ error: false });
    // const lineItems = items || [
    //   { variantId: variant.id, quantity: parseInt(quantity || 1, 10) },
    // ];
    // if (checkoutId) {
    //   return dispatch(addCheckout({ checkoutId, lineItems })).then((data) => {
    //     return data;
    //   });
    // }
    // return dispatch(createCheckout({ lineItems })).then((checkout) => {
    //   if (checkout && checkout.id) {
    //     return dispatch(
    //       addCheckout({ checkoutId: checkout.id, lineItems })
    //     ).then((data) => {
    //       return data;
    //     });
    //   }
    // });
  } catch (error) {
    dispatch(actions.createCheckoutFailure(error));
  }
};

/**
 * @function addCheckout
 * @param {String} checkoutId
 * @param {Array} lineItems
 */
export const addCheckout = ({ lineItems, checkoutId }) => (dispatch) => {
  try {
    dispatch(actions.addCheckoutPending());
    return GraphqlAPI.addCheckout({ checkoutId, lineItems })
      .then((json) => {
        if (json.error) {
          dispatch(actions.addCheckoutFailure(json.error));
          toast(json.error);

          return json;
        }
        const { checkout } = json;
        dispatch(actions.addCheckoutSuccess(checkout));
        toast(Languages.AddtoCardSuccess);

        return checkout;
      })
      .catch((error) => {
        dispatch(actions.addCheckoutFailure(error));
      });
  } catch (error) {
    dispatch(actions.addCheckoutFailure(error));
  }
};

/**
 * @function createCheckout
 * @param {Array} lineItems
 * @return data checkout
 */
export const createCheckout = ({ lineItems }) => (dispatch) => {
  dispatch(actions.createCheckoutPending());
  return;
  // dispatch(actions.createCheckoutSuccess(checkout));

  toast(Languages.AddtoCardSuccess);

  //  dispatch(actions.createCheckoutFailure(error));
};

/**
 * @function removeCartItem
 *
 * @param {*} { id, checkoutId }
 */
export const removeCartItem = ({ cartItems, product, id, checkoutId }) => (
  dispatch
) => {
  try {
    dispatch(actions.removeCheckoutPending());
    let filteered = cartItems.filter((item) => item.product.id != product.id);
    let newlist = [...filteered];
    let totalPrice = 0;
    newlist.map((i) => {
      totalPrice = totalPrice + i.variant.sale_price * i.quantity;
    });
    let checkout = {
      lineItems: newlist,
      totalPrice: totalPrice,
      subtotalPrice: 0,
    };
    dispatch(actions.removeCheckoutSuccess(checkout));
  } catch (error) {
    dispatch(actions.createCheckoutFailure(error));
  }
};

/**
 * @function updateCartItem
 *
 * @param {*} { quantity, checkoutId, variant, id }
 */
export const updateCartItem = ({
  cartItems,
  quantity,
  product,
  variant,
  id,
}) => (dispatch) => {
  console.log(variant);
  try {
    dispatch(actions.updateCheckoutPending());
    let filteered = cartItems.filter((item) => item.product.id != product.id);
    let newlist = [...filteered, { product, variant, quantity }];
    let totalPrice = 0;
    newlist.map((i) => {
      totalPrice = totalPrice + i.variant.sale_price * i.quantity;
    });
    let checkout = {
      lineItems: [...filteered, { product, variant, quantity }],
      totalPrice: totalPrice,
      subtotalPrice: 0,
    };

    dispatch(actions.updateCheckoutSuccess(checkout));
  } catch (error) {
    dispatch(actions.updateCheckoutFailure(error));
  }
};

/**
 * @function applyCoupon
 *
 * @param {*} { discountCode, checkoutId }
 */
export const applyCoupon = ({ discountCode, checkoutId }) => (dispatch) => {
  try {
    dispatch(actions.applyCouponCheckoutPending());
    return GraphqlAPI.applyCoupon({ checkoutId, discountCode })
      .then((json) => {
        if (json.error) {
          dispatch(actions.applyCouponCheckoutFailure(json.error));
          toast(data.error);

          return json;
        }

        const { data } = json;
        dispatch(actions.applyCouponCheckoutSuccess(data, discountCode));

        toast(Languages.applyCouponSuccess);

        return data;
      })
      .catch((error) => {
        dispatch(actions.applyCouponCheckoutFailure(error));
      });
  } catch (error) {
    dispatch(actions.applyCouponCheckoutFailure(error));
  }
};

/**
 * @function removeCoupon
 *
 * @param {*} { checkoutId }
 */
export const removeCoupon = ({ checkoutId }) => (dispatch) => {
  try {
    dispatch(actions.removeCouponCheckoutPending());
    GraphqlAPI.removeCoupon({ checkoutId })
      .then((json) => {
        if (json.error) {
          dispatch(actions.removeCouponCheckoutFailure(json.error));
          toast(data.error);

          return json;
        }

        const { data } = json;
        dispatch(actions.removeCouponCheckoutSuccess(data));
        toast(Languages.removeCouponSuccess);

        return data;
      })
      .catch((error) => {
        dispatch(actions.removeCouponCheckoutFailure(error));
      });
  } catch (error) {
    dispatch(actions.removeCouponCheckoutFailure(error));
  }
};

/**
 * @function updateShippingAddress
 *
 * @param {*} { checkoutId, shippingAddress }
 */
export const updateCheckoutShippingAddress = ({
  checkoutId,
  shippingAddress,
}) => (dispatch) => {
  try {
    dispatch(actions.updateShippingAddressCheckoutPending());
    GraphqlAPI.updateCheckoutShippingAddress({ checkoutId, shippingAddress })
      .then((json) => {
        if (json.error) {
          dispatch(actions.updateShippingAddressCheckoutFailure(json.error));
        } else {
          const { availableShippingRates, shippingAddress } = json;
          dispatch(
            actions.updateShippingAddressCheckoutSuccess({
              availableShippingRates,
              shippingAddress,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(actions.updateShippingAddressCheckoutFailure(error));
      });
  } catch (error) {
    dispatch(actions.updateShippingAddressCheckoutFailure(error));
  }
};

/**
 * @function updateShippingLine
 *
 * @param {String, } { checkoutId, ShippingLine }
 */
export const updateCheckoutShippingLine = ({ checkoutId, handle }) => (
  dispatch
) => {
  try {
    dispatch(actions.updateShippingLineCheckoutPending());
    GraphqlAPI.updateCheckoutShippingLine({
      checkoutId,
      handle,
    })
      .then((json) => {
        if (json.error) {
          dispatch(actions.updateShippingLineCheckoutFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.updateShippingLineCheckoutSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(actions.updateShippingLineCheckoutFailure(error));
      });
  } catch (error) {
    dispatch(actions.updateShippingLineCheckoutFailure(error));
  }
};

/**
 * @function checkoutLinkUser
 */
export const checkoutLinkUser = ({ checkoutId, accessToken }) => (dispatch) => {
  try {
    dispatch(actions.checkoutLinkUserPending());
    return GraphqlAPI.checkoutLinkUser({
      checkoutId,
      customerAccessToken: accessToken,
    })
      .then((json) => {
        if (json.error) {
          dispatch(actions.checkoutLinkUserFailure(json.error));
          toast(json.error);
          return json.error;
        }

        dispatch(actions.checkoutLinkUserSuccess());
        return true;
      })
      .catch((error) => {
        dispatch(actions.checkoutLinkUserFailure(error));
      });
  } catch (error) {
    dispatch(actions.checkoutLinkUserFailure(error));
  }
};

/**
 * @function getOrders get all order of customer
 */
export const getOrders = ({ cursor, accessToken }) => (dispatch) => {
  try {
    dispatch(actions.orderPending());
    GraphqlAPI.getOrders({
      cursor,
      customerAccessToken: accessToken,
    })
      .then((json) => {
        if (json.error) {
          dispatch(actions.orderFailure(json.error));
        } else {
          const { data } = json;
          dispatch(actions.orderSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(actions.orderFailure(error));
      });
  } catch (error) {
    dispatch(actions.orderFailure(error));
  }
};
