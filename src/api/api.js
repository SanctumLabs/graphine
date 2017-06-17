/**
 * @author lusinabrian on 17/06/17.
 * @notes: Handles api calls
 */

import * as constants from '../constants/constants';
import axios from 'axios';

/**
 * Fetches data from url and returns response
 * @param {String} url for fetching the data
 * @returns {Promise.<TResult>} data array
 * */
export default function fetchData(url = constants.CYCLIST_DATA_URL){
    return axios.get(url).then((response) => {
        return response.data;
    }).catch((error) =>{
      // handle error
        console.error("Error occurred when fetching data: ", error)
    })
}