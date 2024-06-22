import { Router } from "express"; 
import { countAllByVacation, follow, getAllByUserFollowing, getAllVacations, isFollowing, unFollow } from "../controllers/followers/controller";

const router = Router();

router.get('/vacations/:vacationId', countAllByVacation);  
router.get('/vacations/users/isFollowing/:userId', getAllByUserFollowing); 
// router.get('/vacations/users/isFollowing/:userId', getAllByUserFollowing, isFollowing); 
router.get('/vacations/extended/users/:userId', getAllVacations); 
router.get('/vacations/users/isFollowing/:userId/:vacationId', isFollowing); 
router.post('/', follow);
router.delete('/:userId/:vacationId', unFollow);  

export default router;