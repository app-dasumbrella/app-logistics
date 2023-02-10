import * as _ from "lodash";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { request, RESULTS, PERMISSIONS } from "react-native-permissions";
import { Platform } from "react-native";
import ImageResizer from 'react-native-image-resizer'

export const loadImage = () =>
  new Promise((resolve, reject) => {
    const options = {
      title: "Select Delivery Image",
      mediaType: "photo",
      quality: 1,
      selectionLimit: 3
    };

    {
      Platform.OS === "android" &&
        request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              // console.log( 'This feature is not available (on this device / in this context)',
              break;
            case RESULTS.DENIED:
              break;
            case RESULTS.GRANTED:
              launchCamera(options, (response) => {
                if (response.didCancel) {
                  reject(response);
                } else if (response.error) {
                  reject(response);
                } else if (response.customButton) {
                  reject(response);
                } else {
                  // ImageResizer.createResizedImage(
                  //   response.uri,
                  //   1080,
                  //   1920,
                  //   "JPEG",
                  //   80,
                  //   0,
                  //   null
                  // )
                  //   .then((responses) => {
                  const source = []
                  response?.assets?.map(it => {
                    source.push({
                      uri: it.uri,
                      type: it.type,
                      name: it.fileName,
                    })
                  })

                  resolve(source)
                  //   })
                  //   .catch((err) => {
                  //     const source = {
                  //       uri: response.uri,
                  //       type: response.type,
                  //       name: response.name,
                  //     };
                  //     resolve(source);
                  //   });
                }
              });
              break;
            case RESULTS.BLOCKED:
              break;
          }
        });
    }
    {
      Platform.OS === "ios" &&
        request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              // console.log( 'This feature is not available (on this device / in this context)',
              break;
            case RESULTS.DENIED:
              break;
            case RESULTS.GRANTED:
              launchCamera(options, (response) => {
                if (response.didCancel) {
                  reject(response);
                } else if (response.error) {
                  reject(response);
                } else if (response.customButton) {
                  reject(response);
                } else {
                  console.log(response)
                  // ImageResizer.createResizedImage(
                  //   response.uri,
                  //   1080,
                  //   1920,
                  //   "JPEG",
                  //   85,
                  //   0,
                  //   null
                  // )
                  //   .then((responses) => {
                  const source = []
                  console.log(response)
                  response?.assets?.map(it => {
                    source.push({
                      uri: it.uri,
                      type: it.type,
                      name: it.fileName,
                    })
                  })

                  resolve(source)
                  // })
                  // .catch((err) => {
                  //   const source = {
                  //     uri: response.uri,
                  //     type: response.type,
                  //     name: response.name,
                  //   };
                  //   resolve(source);
                  // });
                }
              });
              // console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              break;
          }
        });
    }
  });


export const loadImageGallery = () =>
  new Promise((resolve, reject) => {
    const options = {
      title: "Select Delivery Image",
      mediaType: "photo",
      quality: 1,
      selectionLimit: 3
    };

    {
      Platform.OS === "android" &&
        request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              // console.log( 'This feature is not available (on this device / in this context)',
              break;
            case RESULTS.DENIED:
              break;
            case RESULTS.GRANTED:
              launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                  reject(response);
                } else if (response.error) {
                  reject(response);
                } else if (response.customButton) {
                  reject(response);
                } else {
                  // ImageResizer.createResizedImage(
                  //   response.uri,
                  //   1080,
                  //   1920,
                  //   "JPEG",
                  //   80,
                  //   0,
                  //   null
                  // )
                  //   .then((responses) => {
                  const source = []
                  response?.assets?.map(it => {
                    source.push({
                      uri: it.uri,
                      type: it.type,
                      name: it.fileName,
                    })
                  })

                  resolve(source);
                  //   })
                  //   .catch((err) => {
                  //     const source = {
                  //       uri: response.uri,
                  //       type: response.type,
                  //       name: response.name,
                  //     };
                  //     resolve(source);
                  //   });
                }
              });
              break;
            case RESULTS.BLOCKED:
              break;
          }
        });
    }
    {
      Platform.OS === "ios" &&
        request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              // console.log( 'This feature is not available (on this device / in this context)',
              break;
            case RESULTS.DENIED:
              break;
            case RESULTS.GRANTED:
              launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                  reject(response);
                } else if (response.error) {
                  reject(response);
                } else if (response.customButton) {
                  reject(response);
                } else {
                  console.log(response)
                  const source = []
                  response?.assets?.map(it => {
                    source.push({
                      uri: it.uri,
                      type: it.type,
                      name: it.fileName,
                    })
                  })

                  resolve(source);
                  // ImageResizer.createResizedImage(
                  //   response.uri,
                  //   1080,
                  //   1920,
                  //   "JPEG",
                  //   85,
                  //   0,
                  //   null
                  // )
                  //   .then((responses) => {
                  //     const source = {
                  //       uri: response.uri,
                  //       type: response.type,
                  //       name: response.name,
                  //     };
                  //     resolve(source);
                  //   })
                  //   .catch((err) => {
                  //     const source = {
                  //       uri: response.uri,
                  //       type: response.type,
                  //       name: response.name,
                  //     };
                  //     resolve(source);
                  //   });
                }
              });
              // console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              break;
          }
        });
    }
  });

