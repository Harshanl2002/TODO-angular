import { Injectable } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private fb:FormBuilder,private http:HttpClient) {};
  readonly BaseURL="http://localhost:3000/Tasks/";
  TaskForm=this.fb.group({
    _id:[''],
    Taskname:['',Validators.required],
    date:['',Validators.required],
    done:false,
  });
  trueForm=this.fb.group({
    _id:[''],
    Taskname:[''],
    date:[''],
    done:[true],
  });
  postTasks()
  {
    return this.http.post(this.BaseURL,this.TaskForm.value);
  }
  getTasks()
  {
    return this.http.get(this.BaseURL);
  }
  putTasks()
  {
    return this.http.put(this.BaseURL+this.TaskForm.get('_id')?.value,this.TaskForm.value)
  }
  editTrue()
  {
    return this.http.put(this.BaseURL+this.trueForm.get('_id')?.value,this.trueForm.value)
  }
  deleteTask(_id:string)
  {
    return this.http.delete(this.BaseURL+_id);
  }
  getdes()
  {
    return this.http.get(this.BaseURL+'Des');
  }
  getTrue()
  {
    return this.http.get(this.BaseURL+'true');
  }
  getTruedes()
  {
    return this.http.get(this.BaseURL+'truedes');
  }
  getfalse()
  {
    return this.http.get(this.BaseURL+'false');
  }
  getfalsedes()
  {
    return this.http.get(this.BaseURL+'falsedes');
  }

}
