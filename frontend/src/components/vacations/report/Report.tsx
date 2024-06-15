import "./Report.css";
import notify from "../../../services/Notify";
import csvService from "../../../services/Csv";

function Report(): JSX.Element {

    async function downloadCsv() {
        try {
            const csv = await csvService.sendCSV();
        } catch (err) {
            notify.error(err);
        }
    }
    
    return (
        <div className="Report">
            <button onClick={downloadCsv}>Download report</button>
			
        </div>
    );
}

export default Report;
