import { Component, Inject, OnInit } from '@angular/core';
import { Users } from './models/users';
import { inject } from '@angular/core/testing';
import { IUserService } from './business/IUserService';
import { UserClientService } from './infraestructure/userClientService';
import { ComunaDto } from './models/comunaDto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  userArray: any = []
  selectedComuna:any =[]
  
  constructor(
    private userClientService: UserClientService
  ){
     
  }
  async ngOnInit() {
    this.userClientService.getUsers().subscribe(data => {
      this.userArray = data;
    });
    this.userClientService.getComuna().subscribe(data => {
      this.selectedComuna = data;
    });
  }
  

  selectedUser: Users = new Users();
  
  getUsers(){
    this.userClientService.getUsers().subscribe(data => {
      this.userArray = data;
    });
  }
  addOrEdit(){
   
    if(this.selectedUser.id===0){
      console.log("entra a crear");
    //this.selectedUser.id=this.userArray.length+1;
    this.userClientService.saveUser(this.selectedUser).subscribe((data2: any) => {        
    });
    this.listComuna();   
    }else {
      this.userClientService.updateUser(this.selectedUser).subscribe((data2: any) => {      
      });
    }
    this.getUsers();
    this.selectedUser=new Users();
    
  }
  openForEdit(user:Users){
    this.selectedUser = user;
  }
delete(){
  if(confirm('desea eliminarlo')) {
   
    this.userClientService.deleteUser(this.selectedUser.id!).subscribe((data2: any) => {      
    });
    //this.userArray = this.userArray.filter((x: Users) => x !=this.selectedUser);  
    this.getUsers();
  }
  this.selectedUser = new Users;
}

listComuna(){
  console.log("entra a las comunas");
  this.userClientService.getComuna().subscribe((data2: any) => {  
    console.log("se obtiene comunas ",JSON.stringify(data2));   
  });
}

}
