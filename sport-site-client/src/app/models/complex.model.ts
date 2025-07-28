

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
  exercises: string[] | Exercise[];   
//   likes: User[];          // Populated with User objects
  createdAt: string;
  updatedAt: string;
}
