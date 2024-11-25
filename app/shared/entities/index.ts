export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PhotoParams {
  params: {
    id: string;
  };
}
