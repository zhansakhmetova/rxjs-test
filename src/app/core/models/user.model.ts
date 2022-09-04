export interface User {
    email: string;
    id: number;
    status: 'active' | 'inactive'
}


export interface Response<T> {
  data: T;
  success: boolean;
}
