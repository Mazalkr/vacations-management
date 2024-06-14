import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import { Control, useForm, useWatch } from "react-hook-form";
import Vacation from "../../../models/Vacation";
import vacationsService from "../../../services/Vacations";
import { useEffect, useState } from "react";
import { idText } from "typescript";
// import getAbsoluteImageSrc from "../../../utils/getAbsoluteImageSrc";
import notify from "../../../services/Notify";

function Edit(): JSX.Element {

    const params = useParams();
    const vacationId = params.vacationId || '';  // CONVERT TO NUMBER??? OR ADD 'as string'???

    const navigate = useNavigate();

    const { register, handleSubmit, setValue, control, formState, getValues } = useForm<Vacation>();

    // add the image in the update form:
    const [src, setSrc] = useState<string>('');

    // 'DisplayImage' is mini component here
    function DisplayImage({ control }: { control: Control<Vacation>}) {
        // by useWatch 'imageSrc' will change every time the input name 'image' will change.
        const imageSrc = useWatch({
            control,
            name: 'image',
        })
        
        // if there has been changes in 'imageSrc' so change the src image in the form.
        if (imageSrc) {
            const file = ((imageSrc as unknown as FileList)[0]);
            if(file) {
                const newSrc = window.URL.createObjectURL(file);
                console.log(newSrc);
                // we ask from the browser to create src by using 'URL.createObjectURL(file)' because a security problem.
                // the browser as default isn't allow the programmer an access to the whole path of the file.
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
    
    // setValue is a react func that similar to the JS command 'document.getElementById...'.
    // it set a value in the input of the form.
    // it doesn't know to do that with images....
    useEffect(() => {
        vacationsService.getOne(vacationId)
            .then(vacationsFromServer => {
                setValue('destination', vacationsFromServer?.destination);  // we add '?' because it could be undefined (after we updated getOne() to redux).
                setValue('description', vacationsFromServer?.description);
                setValue('price', vacationsFromServer?.price);
                console.log(vacationsFromServer?.startDate);
                setValue('startDate', displayDate(vacationsFromServer?.startDate));
                setValue('endDate', displayDate(vacationsFromServer?.endDate));
                // setSrc(getAbsoluteImageSrc(vacationsFromServer?.imageUrl) || '');
                setSrc(vacationsFromServer?.imageUrl || '');
            })
            .catch(err => notify.error(err));
    }, []);

    // to get the id of the vacation I want to update:
    async function submitVacationData(vacation: Vacation) {
        console.log(vacation);
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];

            // in that way we can use the vacation.id in the func 'editVacation' in 'services' folder.  
            vacation.id = vacationId;
            
            const updatedVacation = await vacationsService.edit(vacation);
            notify.success(`The vacation to ${updatedVacation.destination} updated successfully`);
            // navigate(`/products/details/${updatedProduct.id}`);
            navigate(`/vacations`);
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Edit">
            <h2>Edit Vacation</h2>
            <form onSubmit={handleSubmit(submitVacationData)}>

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
                <br/>
                <textarea {...register('description', {
                    required: {
                        value: true,
                        message: 'Description is a required field'
                    }
                })} /><br/>
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
                <input type="file" accept="image/*" {...register('image')} />

                {/* the component 'ImageWatched' for replace the image if the user upload other image */}
                <DisplayImage control={control} />

                <button>Update</button>
            </form>

            <NavLink to={'/vacations'}><button>Cancel</button></NavLink>

        </div>
    );
}

export default Edit;
