import { useForm } from "react-hook-form";
import "./Add.css";
import Vacation from "../../../models/Vacation";
import vacationsService from "../../../services/Vacations";
import { NavLink, useNavigate } from "react-router-dom";
import notify from "../../../services/Notify";

function Add(): JSX.Element {

    const { register, handleSubmit, formState, getValues } = useForm<Vacation>();
    // 'useForm' declare that the form going to submit data as model of Vacation.

    const navigate = useNavigate();

    async function addVacation(vacation: Vacation) {
        try {
            // How to extract the image from file list:
            // to overcome the fact that the image is type FileList (an array of multiple images):
            // we can define it first as unknown/any & after that we define it as FileList in index [0]:
            vacation.image = (vacation.image as unknown as FileList)[0];

            const addedVacation = await vacationsService.add(vacation);
            notify.success(`added a new vacation with id ${addedVacation.id}`);

            navigate('/vacations');
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Add">
            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(addVacation)}>

                <label>Destination:</label>
                <input type="text" {...register('destination', {
                    required: {
                        value: true,
                        message: 'Destination is a required field'
                    }
                })} />
                <span className="error">{formState.errors.destination?.message}</span>
                <br/>

                <label>Description:</label>
                <input type="text" {...register('description', {
                    required: {
                        value: true,
                        message: 'Description is a required field'
                    }
                })} />
                <span className="error">{formState.errors.description?.message}</span>
                <br/>

                <label>Price:</label>
                <input type="number" step="0.01" {...register('price', {
                    required: {
                        value: true,
                        message: 'Price is a required field'
                    }, 
                    min: {
                        value: 0,
                        message: 'Please enter a positive price'
                    },
                    max: {
                        value: 10000,
                        message: 'Max price should be up to $10,000'
                    }
                })} />
                <span className="error">{formState.errors.price?.message}</span>
                <br/>

                <label>From:</label>
                <input type="date" {...register('startDate', {
                    required: {
                        value: true,
                        message: 'Start date is a required field'
                    }
                })} />
                <span className="error">{formState.errors.startDate?.message}</span>
                <br/>

                <label>To:</label>
                <input type="date" {...register('endDate', {
                    required: {
                        value: true,
                        message: 'End date is a required field'
                    },
                    validate: value => {
                        const startDateValue = getValues('startDate');
                        if (!startDateValue) return 'Start date is a required field' ;
                        if (!value) return 'End date is a required field';
                        const startDate = new Date(startDateValue);
                        const endDate = new Date(value);
                        return startDate < endDate || 'Start date should be later than End date'
                    }
                })} />
                <span className="error">{formState.errors.endDate?.message}</span>
                <br/>

                <label>Image:</label>
                <input type="file" accept="image/*" {...register('image', {
                    required: {
                        value: true,
                        message: 'Image file is a required field'
                    }
                })} />
                <span className="error">{formState.errors.image?.message}</span>
                <br/>

                <button>add</button>
            </form>

            <NavLink to={'/vacations'}><button>Cancel</button></NavLink>

        </div>
    );
}

export default Add;
