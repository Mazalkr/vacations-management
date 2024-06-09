import { Router } from "express"; 
import { countAllByVacation, follow, getAll, getAllByUserFollowing, getAllVacations, unFollow } from "../controllers/followers/controller";

const router = Router();

router.get('/', getAll);  // number of followers for every vacation. for SCV. 
router.get('/vacations/:vacationId', countAllByVacation);  // number of followers by vacation id. 
router.get('/vacations/users/isFollowing/:userId', getAllByUserFollowing); // vacations that the user is following.
router.get('/vacations/extended/users/:userId', getAllVacations); // vacations include isFollowing (0/1) and count of followers per vacation.
router.post('/', follow);
router.delete('/', unFollow);  // CONSIDER to change to '/:vacationId/:userId'

export default router;