import "./Report.css";
import { useEffect, useState } from "react";
import csvService from "../../../services/Csv";
import Csv from "../../../models/Csv";
import notify from "../../../services/Notify";
import { Bar } from 'react-chartjs-2';
// I installed npm i react-chartjs-2 and chart.js:
// import { Chart as ChartJS } from 'chart.js'
// import Chart from 'chart.js/auto';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

// activate the chart.js:
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Report(): JSX.Element { 

    const [followersPerVacation, setFollowersPerVacation] = useState<Csv[]>([]);

    useEffect(() => {
        csvService.getAllFollowersPerVacation()
            .then(dataFromServer => setFollowersPerVacation([...dataFromServer]))
            .catch(error => notify.error(error))
    }, []);

    // download CSV file:
    async function downloadCsv() {
        try {
            await csvService.sendCSV();
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Report">
            <button onClick={downloadCsv}>Download report</button>

            <Bar 
                data = {{
                    labels: followersPerVacation.map(data => data.destination),
                    datasets: [
                        {
                            label: 'Followers',
                            data: followersPerVacation.map(data => data.numberOfFollowers),
                            backgroundColor: '#219C90',
                            borderColor: 'white',
                            borderWidth: 1,
                        }
                    ]
                }}
                options={{
                    scales: {
                        x: {
                            type: 'category'
                        }
                    }
                }}
            
            />

        </div>
    );

}

export default Report;
