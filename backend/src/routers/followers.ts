import { Router } from "express"; 
import { countAllByVacation, follow, getAllByUserFollowing, getAllVacations, unFollow } from "../controllers/followers/controller";

const router = Router();

router.get('/vacations/:vacationId', countAllByVacation);  
router.get('/vacations/users/isFollowing/:userId', getAllByUserFollowing); 
router.get('/vacations/extended/users/:userId', getAllVacations); 
router.post('/', follow);
router.delete('/', unFollow);  

export default router;