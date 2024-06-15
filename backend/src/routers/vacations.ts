import { Router } from "express"; 
import validate from "../middlewares/input-validation";
// import { add, getAbsoluteImageSrc, getActiveVacations, getAll, getFutureVacations, patch, remove, update } from "../controllers/vacations/controller";
import { add, getActiveVacations, getAll, getFutureVacations, patch, remove, update } from "../controllers/vacations/controller";
import { addVacationValidator, patchVacationValidator, putVacationValidator } from "../controllers/vacations/validator";
import addImageToBody from "../middlewares/add-image-to-body";
import uploadImage from "../middlewares/upload-image";
import enforceAdmin from "../middlewares/enforce-admin";
import enforceAuth from "../middlewares/enforce-auth";
import { sendCSV } from "../controllers/followers/controller";
// import getAbsoluteImageSrc from "../middlewares/getAbsoluteImageSrc";

const router = Router();

router.use(enforceAuth);

router.get('/', getAll);
router.get('/csv', sendCSV);  // download CSV. 
// router.get('/images/:image', getAbsoluteImageSrc);  // CONSIDER TO DELETE, you have already one in app.ts
router.get('/active', getActiveVacations);
router.get('/future', getFutureVacations);

// AFTER ADDING AUTH --> תחזירי את כל אלו עם האנפורס אדמין
// 'enforceAdmin' middleware before edit/delete vacations: 
// router.post('/', enforceAdmin, addImageToBody, validate(addVacationValidator), uploadImage, add);
router.post('/', addImageToBody, validate(addVacationValidator), uploadImage, add);
// router.put('/:id', enforceAdmin, addImageToBody, validate(putVacationValidator), uploadImage, update);
router.put('/:id', addImageToBody, validate(putVacationValidator), uploadImage, update);
// router.patch('/:id', enforceAdmin, addImageToBody, validate(patchVacationValidator), uploadImage, patch);
router.patch('/:id', addImageToBody, validate(patchVacationValidator), uploadImage, patch);
// router.delete('/:id', enforceAdmin, remove);
router.delete('/:id', remove);

export default router;