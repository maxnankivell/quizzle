export interface Quiz {
  _id: string;
  title: string;
  createdAt: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  _id: string;
  position: number;
  prompt: string;
  image: string;
  answer: string;
  options: { option: string }[];
}
