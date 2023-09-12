import { Component,OnInit,OnChanges, SimpleChanges,HostListener} from '@angular/core';
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
  mobileview!:Boolean;
  submitted:Boolean=false;
  ordersel:any=1;
  order:boolean=true;
  filtersel:any=1;
  list:Tasks[]=[];
  public getScreenWidth: any;
  public getScreenHeight: any;
  constructor(public taskService:TasksService,private http:HttpClient,private datePipe:DatePipe)
  {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filterselfun(this.filtersel,this.ordersel)
  }
  ngOnInit(): void {
    this.filterselfun(this.filtersel,this.ordersel)
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.checksize()
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.checksize()
  }
  checksize()
  {
    if(this.getScreenWidth<768)
    {
      this.mobileview=true;
    }
    if(this.getScreenWidth>768)
    {
      this.mobileview=false;
    }
  }
  resetTasks()
  {
    this.submitted=false;
    this.taskService.TaskForm.setValue(
      {
        _id:'',
        Taskname:'',
        date:'',
        done:false
      }
    );
  }
  onSubmit()
  {
    this.submitted=true;
    // console.log(this.taskService.TaskForm.value);
    if(this.taskService.TaskForm.valid)
    {  
      if(this.taskService.TaskForm.get('_id')?.value==='')
      {
      console.log(this.taskService.TaskForm.value);
      this.taskService.postTasks().subscribe((res)=>{
        console.log(res);
        this.filterselfun(this.filtersel,this.ordersel)
      });
      }
      else
      {
        this.taskService.putTasks().subscribe((res)=>{
          console.log(res);
          this.filterselfun(this.filtersel,this.ordersel)
        })
      }
      this.resetTasks()
    }
  }
  getList()
  {
    this.taskService.getTasks().subscribe((res)=>{
      console.log(res);
      this.list=res as Tasks[];
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
    this.filterselfun(this.filtersel,this.ordersel)
  }
  editTrue(l:Tasks)
  {
    this.taskService.trueForm.setValue({
      _id:l._id as string,
      Taskname:l.Taskname,
      date: this.datePipe.transform(l.date,'yyyy-MM-dd'),
      done:!l.done,
    });
    this.taskService.editTrue().subscribe((res)=>{
      console.log(res);
      this.filterselfun(this.filtersel,this.ordersel)
    })
  }
  dateModifier(l:Tasks)
  {
    return this.mobileview?this.datePipe.transform(l.date,'dd/MMM/YYYY'):this.datePipe.transform(l.date,'dd-MMM-YYYY');
  }
  ordersortfun(s:number,sel:number)
  {
    switch(s)
    {
      case 2:
        if(sel==2)
        {
          this.taskService.getTruedes().subscribe((res)=>{
            console.log(res);
            this.list=res as Tasks[];
            this.order=false;
          });
          break;
        }
        else if(sel==3)
        {
          this.taskService.getfalsedes().subscribe((res)=>{
            console.log(res);
            this.list=res as Tasks[];
            });
            this.order=false;
            break;
        }
        this.taskService.getdes().subscribe((res)=>{
          console.log(res);
          this.list=res as Tasks[];
        });
        this.order=false;
        break;
        default:
          if(sel==2)
          {
            this.taskService.getTrue().subscribe((res)=>{
              console.log(res);
              this.list=res as Tasks[];
              this.order=true;
            });
            break;
          }
          else if(sel==3)
          {
            this.taskService.getfalse().subscribe((res)=>{
              console.log(res);
              this.list=res as Tasks[];
              });
              this.order=true;
              break;
          }
          this.getList();
          this.order=true;
    }
  }
  filterselfun(sel:number,s:number)
  {
    switch(sel)
    {
      case 2:
        if(s==2)
        {
          this.taskService.getTruedes().subscribe((res)=>{
            console.log(res);
            this.list=res as Tasks[];
            this.order=false;
          });
          break;
        }
        else{
          this.taskService.getTrue().subscribe((res)=>{
            console.log(res);
            this.list=res as Tasks[];
          });
          this.order=true;
          break;}
        case 3:
          if(s==2)
          {
            this.taskService.getfalsedes().subscribe((res)=>{
              console.log(res);
              this.list=res as Tasks[];
              });
              this.order=false;
              break;
          }
          else{
            this.taskService.getfalse().subscribe((res)=>{
            console.log(res);
            this.list=res as Tasks[];
            });
          this.order=true;
            break;
          }
        default:
          if(s==2)
          {
            this.taskService.getdes().subscribe((res)=>{
              console.log(res);
              this.list=res as Tasks[];
            });
            this.order=false;
            break;
          }
          this.getList();
    }
  }
  oc(a:boolean)
  {
    if(a)
    {
      this.ordersel=2; 
    }
    else{
      this.ordersel=1; 
    }
    this.ordersortfun(this.ordersel,this.filtersel) 
  }
}
