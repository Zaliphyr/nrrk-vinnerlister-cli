import { Request, Response, NextFunction } from 'express';
import { Dog } from '../models/dog-model';

export async function handleGetAllDogs(req: Request, res: Response, next: NextFunction) {
  const dogs: Dog[] = [];

  return res.status(200).json(dogs);
}

export async function handleGetDogById(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  const dog: Dog = new Dog();

  return res.status(200).json(dog);
}

export async function handleUpdateDog(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  const newName: string = req.body.newName;

  return res.status(200).end();
}

export async function handleDeleteDog(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  const dog: Dog = new Dog();

  return res.status(200).end();
}

export async function handleAddDog(req: Request, res: Response, next: NextFunction) {
  return res.status(204).end();
}
