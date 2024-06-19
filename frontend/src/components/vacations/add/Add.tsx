import { useForm } from "react-hook-form";
import "./Add.css";
import Vacation from "../../../models/Vacation";
import vacationsService from "../../../services/Vacations";
import { NavLink, useNavigate } from "react-router-dom";
import notify from "../../../services/Notify";

function Add(): JSX.Element {

    const { register, handleSubmit, formState, getValues } = useForm<Vacation>();

    const navigate = useNavigate();

    async function addVacation(vacation: Vacation) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];

            const addedVacation = await vacationsService.add(vacation);
            notify.success(`added a new vacation`);

            navigate('/vacations');
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Add">
            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(addVacation)}>

                <label className="form-label">Destination:</label>
                <input type="text" className="form-control" {...register('destination', {
                    required: {
                        value: true,
                        message: 'Destination is a required field'
                    }
                })} />
                <span className="error">{formState.errors.destination?.message}</span>

                <label className="form-label">Description:</label> <br/>
                <textarea className="form-control" {...register('description', {
                    required: {
                        value: true,
                        message: 'Description is a required field'
                    }
                })} />
                <span className="error">{formState.errors.description?.message}</span>

                <label className="form-label">Price:</label>
                <input className="form-control" type="number" step="0.01" {...register('price', {
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

                <label className="form-label">From:</label>
                <input className="form-control" type="date" {...register('startDate', {
                    required: {
                        value: true,
                        message: 'Start date is a required field'
                    },
                    validate: value => {
                        if (!value) return 'Start date is a required field';
                        const startDate = new Date(value);
                        const today = new Date();
                        return startDate >= today || 'Please select a date from today onwards';
                    }
                })} />
                <span className="error">{formState.errors.startDate?.message}</span>

                <label className="form-label">To:</label>
                <input className="form-control" type="date" {...register('endDate', {
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

                <label className="form-label">Image:</label>
                <input className="form-control" type="file" accept="image/*" {...register('image', {
                    required: {
                        value: true,
                        message: 'Image file is a required field'
                    }
                })} />
                <span className="error">{formState.errors.image?.message}</span>
                <br/>

                <button className="btn btn-primary">add</button>
            </form>

            <NavLink to={'/vacations'}><button className="btn btn-outline-primary">Cancel</button></NavLink>

        </div>
    );
}

export default Add;