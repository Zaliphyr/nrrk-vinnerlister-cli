import { Request, Response, NextFunction } from 'express';
import { Contest } from '../models/contest-model';

export async function handleGetAllContests(req: Request, res: Response, next: NextFunction) {
  const contests: Contest[] = [];

  return res.status(200).json(contests);
}

export async function handleGetContestById(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  const contest: Contest = new Contest();

  return res.status(200).json(contest);
}

export async function handleUpdateContest(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  const newName: string = req.body.newName;

  return res.status(200).end();
}

export async function handleDeleteContest(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  const contest: Contest = new Contest();

  return res.status(200).end();
}

export async function handleAddContest(req: Request, res: Response, next: NextFunction) {
  return res.status(204).end();
}
