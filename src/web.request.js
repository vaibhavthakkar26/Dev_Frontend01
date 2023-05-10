import axios from "axios";

export const post = async (url, data) => {
  try {
    let header;
    var token=localStorage.getItem('token');
    if(token) {
        header = {
            'authorization': token
        }
    }
    const response = await axios.post(url,data,{ headers: header});
    if (response) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return console.error(error);
  }
};

export const get = async (url) => {
  try {
    let header;
    var token=localStorage.getItem('token');
    if(token) {
        header = {
            'authorization': token
        }
    }
    const response = await axios.get(url,{headers: header});
    console.log("res_",response.data.data);
    return {
      sucess: true,
      data : response.data.data,
      message: ''
    }
  } catch (error) {
    console.log("errrr",error);
    return {
      sucess: false,
      data : [],
      message: error.response.data.message
    }
    // return console.error(error);
  }
};




