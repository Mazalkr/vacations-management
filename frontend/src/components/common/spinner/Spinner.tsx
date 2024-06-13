import "./Spinner.css";
import loadingImageSource from '../../../assets/images/loading.gif'

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={loadingImageSource}/>
        </div>
    );
}

export default Spinner;
