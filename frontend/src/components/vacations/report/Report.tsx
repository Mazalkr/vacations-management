import "./Report.css";
import { useEffect, useState } from "react";
import reportService from "../../../services/Report";
import ReportModel from "../../../models/Report";
import notify from "../../../services/Notify";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { followersStore } from "../../../redux/FollowersState";

// Activate the chart.js:
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Report(): JSX.Element { 

    const [followersPerVacation, setFollowersPerVacation] = useState<ReportModel[]>([]);

    useEffect(() => {
        reportService.getAllFollowersPerVacation()
            .then(dataFromServer => setFollowersPerVacation([...dataFromServer]))
            .catch(error => notify.error(error))
        
        // REDUX:
        const unsubscribe = followersStore.subscribe(() => {
            setFollowersPerVacation([...followersStore.getState().followersPerVacation]);  
        })

        return unsubscribe;  
    }, []);

    // Download CSV file:
    async function downloadCsv() {
        try {
            await reportService.sendCSV();
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Report">
            
            <h2>Vacations Report</h2>

            <Bar 
                data = {{
                    labels: followersPerVacation.map(data => data.destination),
                    datasets: [
                        {
                            label: 'Followers',
                            data: followersPerVacation.map(data => data.numberOfFollowers),
                            backgroundColor: '#00FFD1',
                            borderColor: 'white',
                            borderWidth: 1,
                            borderRadius: 8
                        }
                    ]
                }}
                options={{
                    scales: {
                        x: {
                            type: 'category',
                        }
                    }
                }}
            />
            <br/>

            <button className="btn btn-outline-primary" onClick={downloadCsv}>Download report</button>

        </div>
    );

}

export default Report;