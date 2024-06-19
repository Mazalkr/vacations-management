import axios from "axios";
import ReportModel from "../models/Report";
import appConfig from "../utils/AppConfig";
import { FollowersAction, FollowersActionType, followersStore } from "../redux/FollowersState";

class Csv {

    // Number of followers for every vacation 
    public async getAllFollowersPerVacation(): Promise<ReportModel[]> {

        // GET the followers from REDUX:
        let followersPerVacation = followersStore.getState().followersPerVacation;

        if (followersPerVacation.length === 0) {
            // GET the followers from remote server if the array followers[] in followersStore is empty:
            const response = await axios.get<ReportModel[]>(appConfig.followersPerVacationUrl);
        
            // EXTRACT the data from the response:
            followersPerVacation = response.data;

            // INFORM the redux to load new data:
            const action: FollowersAction = {
                type: FollowersActionType.SetFollowers,
                payload: followersPerVacation
            }

            // send the parameter 'action' to 'productsStore' in REDUX:
            followersStore.dispatch(action); 
        }
        
        return followersPerVacation;
    }  

    // CSV- download report file of number of followers per vacation:
    public async sendCSV(): Promise<void> {

        const response = await axios.get(appConfig.csvUrl, {
            responseType: 'blob'
        });

        // Create a URL for the blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
              
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        
        // Set the download attribute with a specific file name
        link.setAttribute('download', 'vacations.csv');
        
        // Append the link to the body and trigger the download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup - remove the <a> element from the <body>
        document.body.removeChild(link);
    }

}

const csv = new Csv();
export default csv;