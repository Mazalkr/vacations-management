import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import { Control, useForm, useWatch } from "react-hook-form";
import Vacation from "../../../models/Vacation";
import vacationsService from "../../../services/Vacations";
import { useEffect, useState } from "react";
import notify from "../../../services/Notify";

function Edit(): JSX.Element {

    const params = useParams();
    const vacationId = params.vacationId || ''; 

    const navigate = useNavigate();

    const { register, handleSubmit, setValue, control, formState, getValues } = useForm<Vacation>();

    // Add the image in the update form:
    const [src, setSrc] = useState<string>('');

    // 'DisplayImage' is mini component:
    function DisplayImage({ control }: { control: Control<Vacation>}) {
        const imageSrc = useWatch({
            control,
            name: 'image',
        })
        
        if (imageSrc) {
            const file = ((imageSrc as unknown as FileList)[0]);
            if(file) {
                const newSrc = window.URL.createObjectURL(file);
                return <img src={newSrc}/>
            }
        }
        return <img src={src}/>  // the 'src' is from 'useState' above.
    }

    function displayDate(date: Date | undefined | string): string | undefined {
        if (!date) return undefined;
        if(typeof date === 'string') {
            const newDate = new Date(date);
            return newDate.toISOString().split('T')[0];
        } else  {
            return date.toISOString().split('T')[0];
        }
    }
    
    useEffect(() => {
        vacationsService.getOne(vacationId)
            .then(vacationsFromServer => {
                setValue('destination', vacationsFromServer?.destination);  
                setValue('description', vacationsFromServer?.description);
                setValue('price', vacationsFromServer?.price);
                setValue('startDate', displayDate(vacationsFromServer?.startDate));
                setValue('endDate', displayDate(vacationsFromServer?.endDate));
                setSrc(vacationsFromServer?.imageUrl || '');
            })
            .catch(err => notify.error(err));
    }, []);

    async function submitVacationData(vacation: Vacation) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];

            vacation.id = vacationId;
            
            const updatedVacation = await vacationsService.edit(vacation);
            notify.success(`The vacation to ${updatedVacation.destination} updated successfully`);
            navigate(`/vacations`);
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Edit">
            <h2>Edit Vacation</h2>
            <form onSubmit={handleSubmit(submitVacationData)}>

                <label className="form-label">Destination:</label>
                <input className="form-control" type="text" {...register('destination', {
                    required: {
                        value: true,
                        message: 'Destination is a required field'
                    }
                })} />
                <span className="error">{formState.errors.destination?.message}</span>

                <label className="form-label">Description:</label>
                <br/>
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
                <input className="form-control" type="file" accept="image/*" {...register('image')} />

                {/* the component 'ImageWatched' for replace the image if the user upload other image */}
                <DisplayImage control={control} />

                <button className="btn btn-primary">Update</button>
            </form>

            <NavLink to={'/vacations'}><button className="btn btn-outline-primary">Cancel</button></NavLink>

        </div>
    );
}

export default Edit;