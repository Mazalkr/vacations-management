import axios from "axios";
import ReportModel from "../models/Report";
import appConfig from "../utils/AppConfig";
import { FollowersAction, FollowersActionType, followersStore } from "../redux/FollowersState";

class Csv {

    // table with number of followers for every vacation 
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

            // send this action to 'redux':
            followersStore.dispatch(action);  // dispatch --> send the parameter 'action' to 'productsStore' in REDUX.
        }
        
        return followersPerVacation;
    }  

    // CSV- download report file of number of followers per vacation:
    public async sendCSV(): Promise<void> {

        // Summary:
        // The code fetches a CSV file from a specified URL using Axios.
        // It creates a temporary URL (url) for the Blob data received.
        // It dynamically creates an anchor (<a>) element, sets it up for downloading with the specified filename (vacations.csv),
        // and triggers the download.
        // After the download is initiated, it removes the dynamically created anchor element from the document.

        // Setting the response type to 'blob' (appropriate for binary data like files)
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