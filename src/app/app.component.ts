import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApexChart } from 'ng-apexcharts';




export class employesData{
  constructor(
  public Id:number,
  public EmployeeName:string,
  public EntryNotes:string,
  public StarTimeUtc:Date,
  public EndTimeUtc: Date,
  public OVerallTime:number
  ){}}
  export class infoData{
    constructor(
    public name:string,
    public value:number
    ){}
  }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 charDetails:ApexChart={
  type:'pie',
  toolbar:{
    show: true
  }
 }
  colors:any=[ "#8e44ad", "#2c3e50", "#e67e22", "#e74c3c",  "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]
  pieData:any=[];
  pieLabelData:any=[];
  pieDatainfo:any=[];
  pieDataLabelinfo:any=[];
 
  employes: employesData[] = [];
  constructor( private httpClient:HttpClient){}

ngOnInit(): void {
  
  this.getEmployes();
 

}

getEmployes(){
    this.httpClient.get<any>('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==').subscribe(
      (    response : employesData[])=>{
        response.forEach(element => {
          if(element.EmployeeName!=undefined)
          {if(this.employes.every(x=>x.EmployeeName!=element.EmployeeName)){
            element.OVerallTime=0;
            this.employes.push(element)
          }
          else{
            let date1:Date= new Date(element.EndTimeUtc);
            let date2:Date= new Date(element.StarTimeUtc);
            let number:number=Math.ceil((date1.getTime()-date2.getTime())/(1000*60*60*24))
            let x:any=this.employes.find(x=>x.EmployeeName==element.EmployeeName)
            x.OVerallTime+=number;
            
          }}
          });

         
          this.employes.forEach(employe=>{
            let data={name:employe.EmployeeName,value:employe.OVerallTime}
            this.pieLabelData.push(data.name);
            this.pieData.push(data.value);
            
            
          })
          this.pieDataLabelinfo=this.pieLabelData;
          this.pieDatainfo=this.pieData;
          console.warn(this.pieData);
        }
        
      );
      

    } 
    
}

