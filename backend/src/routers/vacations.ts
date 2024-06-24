import { Router } from "express"; 
import validate from "../middlewares/input-validation";
import { add, getActiveVacations, getAll, getAllPaginated, getFutureVacations, patch, remove, update } from "../controllers/vacations/controller";
import { addVacationValidator, patchVacationValidator, putVacationValidator } from "../controllers/vacations/validator";
import addImageToBody from "../middlewares/add-image-to-body";
import uploadImage from "../middlewares/upload-image";
import enforceAdmin from "../middlewares/enforce-admin";
import enforceAuth from "../middlewares/enforce-auth";
import { getAllFollowersPerVacation, getAllVacations, sendCSV } from "../controllers/followers/controller";

const router = Router();

router.use(enforceAuth);

router.get('/', getAll);
router.get('/:page/:limit', getAllPaginated);  
router.get('/report', getAllFollowersPerVacation);  // number of followers for every vacation. for SCV and bar chart. 
router.get('/report/csv', sendCSV);  // download CSV. 
router.get('/active/:page/:limit', getActiveVacations);
router.get('/future/:page/:limit', getFutureVacations); 

router.post('/', enforceAdmin, addImageToBody, validate(addVacationValidator), uploadImage, add);
router.put('/:id', enforceAdmin, addImageToBody, validate(putVacationValidator), uploadImage, update);
router.patch('/:id', enforceAdmin, addImageToBody, validate(patchVacationValidator), uploadImage, patch);
router.delete('/:id', enforceAdmin, remove);

export default router;