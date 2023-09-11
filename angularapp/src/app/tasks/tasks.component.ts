import { Component,OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { HttpClient } from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { Tasks } from '../shared/tasks.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers:[TasksService,DatePipe],
})
export class TasksComponent implements OnInit,OnChanges {
  submitted:Boolean=false;
  NotFinishedlist:Tasks[]=[];
  Finishedlist:Tasks[]=[];
  constructor(public taskService:TasksService,private http:HttpClient,private datePipe:DatePipe)
  {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {
    this.getList();
  }
  resetTasks()
  {
    this.submitted=false;
    this.taskService.TaskForm.reset();
  }
  onSubmit()
  {
    this.submitted=true;
    if(this.taskService.TaskForm.valid)
    {  
      if(this.taskService.TaskForm.get('_id')?.value==='')
      {
      console.log(this.taskService.TaskForm.value);
      this.taskService.postTasks().subscribe((res)=>{
        console.log(res);
        this.getList()
      });
      }
      else
      {
        this.taskService.putTasks().subscribe((res)=>{
          console.log(res);
          this.getList();
        })
      }
      this.resetTasks()
    }
  }
  getList()
  {
    this.taskService.getTasks(false).subscribe((res)=>{
      console.log(res);
      this.NotFinishedlist=res as Tasks[];
    })
    this.taskService.getTasks(true).subscribe((res)=>{
      console.log(res);
      this.Finishedlist=res as Tasks[];
    })

  }
  ClicktoEdit(l:Tasks)
  {
    console.log(this.datePipe.transform(l.date,'dd-MM-yyyy'))
    this.taskService.TaskForm.setValue({
      _id:l._id as string,
      Taskname:l.Taskname,
      date: this.datePipe.transform(l.date,'yyyy-MM-dd'),
      done:l.done
    })
  }
  deletetask(l:Tasks)
  {
    console.log(l)
    this.taskService.deleteTask(l._id).subscribe(()=>{})
    this.getList();
  }
}
