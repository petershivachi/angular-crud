import { Component, OnInit } from '@angular/core';
import { Settings } from "../../models/Settings";
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings Saved', { cssClass: 'alert alert-success', timeout: 4000})
  }

}
