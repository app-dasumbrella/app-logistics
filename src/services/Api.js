import axios from "axios";

// export const geturl = () => {
//   let url = VersionCheck.getPackageName()
//   let splited = url.split('.')
//   let finalurl = ''
//   splited?.map((item, index) => {
//     finalurl = finalurl + splited[splited.length - index - 1]
//     if (index != splited.length - 1)
//       finalurl = finalurl + '.'
//   })
//   return finalurl
// }
const link = 'https://logistic-api.dev.dasumbrella.com'
export const paymentlink = link
export default axios.create({
    baseURL: `${link}`,
});

export const api2 = axios.create({
    baseURL: `https://oauth.${link}`,
});
export const ssr = axios.create({
    baseURL: `http://`,
});

export const scontent = `https://${link}/content`


export const loadtoken = (data) =>
    new Promise((resolve, reject) => {
        axios
            .post(`https://oauth${link}`, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => reject(err));
    });

