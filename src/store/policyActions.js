import { policyActions } from "./policies-slice";
import axios from "axios";
import {API_URL} from "../Links"
export const getAllPolicies = () => {
    return async (dispatch) => {
        try {

            let link = `${API_URL}/policies`;

        
            const { data } = await axios.get(link);
            dispatch(policyActions.getAllPolicies({
                policies:data.policies||[]
            }));
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const getAllUserPolicies = () => {
    return async (dispatch) => {
        try {

            let link = `${API_URL}/user/policies`;


            const { data } = await axios.get(link);
            dispatch(policyActions.getAllUserPolicies({
                policies: data.policies || []
            }));
        }
        catch (error) {
            console.log(error);
        }
    }
}


