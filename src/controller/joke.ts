import { NextFunction, Request, Response } from 'express';
import { addDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { Jokes } from '../config';

interface Joke {
  id: string;
  content: string;
  total_like: number;
  total_dislike: number;
}

export const GetJokes = async (req: Request, res: Response) => {
  try {
    const querySnapshot = await getDocs(Jokes);
    let jokesData: Partial<Joke>[] = [];
    querySnapshot.forEach((doc) =>
      jokesData.push({ id: doc.id, ...doc.data() })
    );
    return res.status(200).json(jokesData);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const LikeJoke = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jokeId = req.body.jokeId;
    const isLike = req.body.isLike;
    console.log(isLike);
    const jokeData = await getDoc(doc(Jokes, jokeId));

    if (!jokeData.exists()) {
      return res.status(404).json({ error: 'Jokes not found' });
    }

    if (isLike) {
      await updateDoc(doc(Jokes, jokeId), {
        total_like: jokeData.data().total_like + 1,
      });
    } else {
      await updateDoc(doc(Jokes, jokeId), {
        total_dislike: jokeData.data().total_dislike + 1,
      });
    }

    return res.status(200).json({ message: 'Action Success' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const AddJoke = async (req: Request, res: Response) => {
  try {
    const content = await req.body.content;
    await addDoc(Jokes, {
      content: content,
      total_like: 0,
      total_dislike: 0,
    }).then(() => {
      return res.status(200).json({ message: 'Add joke success' });
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
