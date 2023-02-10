/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import store from "@store/configureStore";
import {
  getUserInfo,
  checkCheckout,
  getPaymentSettings,
} from "@redux/operations";
import { Config } from "@common";
import { cleanCart } from "@redux/actions";
import * as actions from "./actions";
import * as actions2 from "../user/actions";
import Api from "../../services/Api";
/**
 * initial app
 */
export const initialApp = (params) => (dispatch) => {
  // console.log(params);
  dispatch(actions.beginInitApp(params));

  const state = store.getState();
  const { carts, user } = state;
  const { accessToken, expiresAt } = user;

  if (accessToken) {
    dispatch(getUserInfo({ accessToken, expiresAt }));
  }
  if (carts.checkoutId) {
    if (carts.cartItems && carts.cartItems.length === 0) {
      dispatch(cleanCart());
    } else {
      dispatch(checkCheckout({ checkoutId: carts.checkoutId }));
    }
  }
  dispatch(getPaymentSettings());
};

export const storeNewJOb = (params, callback) => (dispatch) => {
  dispatch(actions.fetchingNewJobList(true))
  Api.post("/jobs/list-new", params).then((prodres) => {
    dispatch(
      actions.storeNewJobList(prodres && prodres.data && prodres.data.data)
    );
    dispatch(actions.fetchingNewJobList(false))
    console.log(prodres.data)
    if (prodres && prodres.data && prodres.data.status == 200)
      callback({ l: prodres.data.data, logoutUser: false });
    else {
      if (prodres?.data?.status == 500 && prodres?.data?.msg == "The access token has expired.") {
        dispatch(actions2.logoutUser())
        callback({ l: [], logoutUser: true })
      } else {
        callback({ l: [], logoutUser: false })
      }

    }
  });
  //
};


export const storeAcceptedJOb = (params, callback) => (dispatch) => {
  dispatch(actions.fetchingNewJobList(true))

  Api.post("/jobs/list-accepted", params).then((prodres) => {
    dispatch(actions.fetchingNewJobList(false))
    console.log("-----------------", prodres?.data)

    if (params?.status == "in-progress") {
      dispatch(
        actions.storeInprogJobList(prodres && prodres.data && prodres.data.data)
      );
    } else {
      dispatch(
        actions.storeAcceptedJobList(prodres && prodres.data && prodres.data.data)
      );
    }
    if (prodres && prodres.data && prodres.data.status == 200)
      callback({ l: prodres.data.data });
    else callback({ l: [] });
  });
  //
};

export const storeCommission = (params, callback) => (dispatch) => {
  dispatch(actions.fetchingCommission(true))

  Api.post("/job/commission", params).then((prodres) => {
    dispatch(actions.fetchingCommission(false))

    dispatch(
      actions.storeCommissionAction(prodres && prodres.data && prodres.data.data)
    );
    if (prodres && prodres.data && prodres.data.status == 200)
      callback({ l: prodres.data.data });
    else callback({ l: [] });
  });
  //
};


export const acceptJobs = ({ email, access_token, job_id }, callback) => (
  dispatch
) => {
  try {
    dispatch(actions.AcceptJobPending());
    Api.post("/job/accept", {
      email,
      access_token,
      job_id
    })
      .then((payload) => {
        if (payload.status == 200) {
          if (payload && payload.data && payload.data.success) {
            dispatch(
              actions.AcceptJobSuccess({

                ...payload.data,


              })
            );
            callback({
              err: false,
              ...payload.data,
              email,
            });
          } else {
            dispatch(actions.AcceptJobFailure(""));

            callback({ err: true, ...payload.data });
          }
        }
      })
      .catch((err) => {
        console.log(err)
        callback({ err: true });
        dispatch(actions.AcceptJobFailure(""));
      });

  } catch (error) {
    dispatch(actions.AcceptJobFailure(error));
  }
};
export const updateJobs = ({ email, access_token, job_id, item_id, status }, callback) => (
  dispatch
) => {
  try {
    dispatch(actions.UpdateJobPending());
    Api.post("/job/update", {
      email,
      access_token,
      job_id,
      item_id,
      status
    })
      .then((payload) => {
        if (payload.status == 200) {
          if (payload && payload.data && payload.data.success) {
            dispatch(
              actions.UpdateJobSuccess({

                ...payload.data,


              })
            );
            callback({
              err: false,
              ...payload.data,
              email,
            });
          } else {
            callback({ err: true, ...payload.data });
            dispatch(actions.UpdateJobFailure(""));
          }
        }
      })
      .catch((err) => {
        console.log(err)
        callback({ err: true });
        dispatch(actions.UpdateJobFailure(""));
      });

  } catch (error) {
    dispatch(actions.UpdateJobFailure(error));
  }
};

export const CompleteJobs = ({ email, access_token, job_id, item_id, proof, site_id }, callback) => (
  dispatch
) => {
  try {
    console.log("Complete called")
    dispatch(actions.CompeleteJobPending(true));
    let formdata = new FormData()
    formdata.append("email", email)
    formdata.append("access_token", access_token)
    formdata.append("job_id", job_id)
    formdata.append("item_id", item_id)
    console.log(formdata)
    console.log(proof)
    proof.map(i => formdata.append("proof[]", i))
    formdata.append("site_id", site_id)
    Api.post("/job/complete", formdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((payload) => {
        console.log(payload)
        if (payload.status == 200) {

          if (payload && payload.data && payload.data.success) {
            dispatch(
              actions.CompeleteJobSuccess({
                ...payload.data,
              })
            );
            callback({
              err: false,
              ...payload.data,
              email,
            });
          } else {
            callback({ err: true, ...payload.data });
            dispatch(actions.CompeleteJobPending(false));

          }
        }
      })
      .catch((err) => {
        console.log(err.response)
        callback({ err: true });
        dispatch(actions.CompeleteJobPending(false));

      });

  } catch (error) {
    console.log(error)
    dispatch(actions.CompeleteJobPending(false));
  }
};


export const handleChangeStore = (id) => (dispatch) => {
  try {

  } catch (error) {
    console.warn(error);
  }
};
