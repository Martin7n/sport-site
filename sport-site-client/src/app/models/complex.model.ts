

// export interface Complex {
//   _id: string;                    
//   type: string;
//   equipment: string;
//   exercises: string[];           
//   likes: string[];              
//   createdAt: string;             
//   updatedAt: string;             
// }


import { Exercise } from './exercise.model';
import { User } from './user.model';

export interface Complex {
  _id: string;
  type: string;
  equipment: string;
  exercises: Exercise[]; 
  notes?: string;   
  likes: User[];          
  createdAt: string;
  updatedAt: string;
}
