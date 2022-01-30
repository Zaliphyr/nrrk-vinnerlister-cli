import express from 'express';
import {
  handleGetAllContests,
  handleGetContestById,
  handleAddContest,
  handleDeleteContest,
  handleUpdateContest,
} from './contest-controller';

const router = express.Router();

router.get('/contests', handleGetAllContests);
router.get('/contests/:id', handleGetContestById);
router.post('/contests', handleAddContest);
router.put('/contests/:id', handleUpdateContest);
router.delete('/contests/:id', handleDeleteContest);

export = router;
