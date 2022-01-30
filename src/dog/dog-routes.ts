import express from 'express';
import { handleGetAllDogs, handleGetDogById, handleAddDog, handleDeleteDog, handleUpdateDog } from './dog-controller';

const router = express.Router();

router.get('/dogs', handleGetAllDogs);
router.get('/dogs/:id', handleGetDogById);
router.post('/dogs', handleAddDog);
router.put('/dogs/:id', handleUpdateDog);
router.delete('/dogs/:id', handleDeleteDog);

export = router;
