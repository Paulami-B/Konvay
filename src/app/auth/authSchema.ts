// validation/authSchemas.ts
import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function field(name: string | number){
  if(name==='email'){
      return "Email";
  }
  else if(name==='name'){
      return "Name";
  }
  else if(name==='password'){
      return "Password"
  }
  else if(name==='confirmPassword'){
      return "Confirm Password"
  }
  else{
      return 'Invalid credentials'
  }
}

export function getErrorMessage(issues: z.ZodIssue){
  let errorMessage = field(issues.path[0]);
  if(errorMessage==='Invalid credentials'){
    return errorMessage;
  }
  if(issues.message==='Required'){
      errorMessage += ' is required'
  }
  else if(issues.code.startsWith("invalid")){
      errorMessage += ' is invalid'
  }
  else if(issues.code==="too_small"){
      errorMessage += ' is too short'
  }
  else if(issues.code==="too_big"){
      errorMessage += ' is too long'
  }
  return errorMessage;
}