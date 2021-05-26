import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    //Get id from the URL
    this.id = this.route.snapshot.params['id'];

    this.settingsService.getSettings().disableBalanceOnEdit;

    //Get Client
    this.clientService
      .getClient(this.id)
      .subscribe((client) => (this.client = client));
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Please fill out the form correctly', { cssClass: 'alert alert-danger', timeout:4000 })
    }else {
      value.id = this.id;

      this.clientService.updateClient(value);

      this.flashMessages.show('Client updated', { cssClass: 'alert alert-success', timeout:4000 });

      this.router.navigate(['/client/'+ this.id]);

    }
  }
}
