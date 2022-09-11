import { API } from "../../config";

export const isAuth = () => {
  console.log(localStorage.getItem('usertoken'))
  if (localStorage.getItem('usertoken') && localStorage.getItem('usertoken') != 'null'){
    return true
  } else {
    return false
  }
}

// export const SignUp = async (values) => {
//   console.log(values);
//   return await fetch(`${API}/admin/signup`, {
//     method: "POST",
//     headers: {
//       accepted: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(values)
//   })
//   .then(response => {
//     return response.json()
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }
