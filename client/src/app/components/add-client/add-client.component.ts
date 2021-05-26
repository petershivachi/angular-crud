import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnAdd;
  @ViewChild('clientForm')form: any;

  constructor( 
    private flashMessage: FlashMessagesService,
    private clientservice: ClientService,
    private router: Router,
    private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
    this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if(!valid){
      //show an error
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout:4000 })
    }else {
      //create user
      this.clientservice.newClient(value);

      //show success message
      this.flashMessage.show('New user created', { cssClass: 'alert-success', timeout:4000 })
    }
    //redirect to dashboard
    this.router.navigate(['/']);
  }

}
