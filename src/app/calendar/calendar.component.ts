// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { GraphService } from '../graph.service';
import { Event, DateTimeTimeZone } from '../event';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events: Event[];

  constructor(
    private graphService: GraphService,
    private alertsService: AlertsService) { }

  // <ngOnInitSnippet>
  ngOnInit() {
    this.graphService.getEvents()
      .then((events) => {
        this.events = events;
      });
  }
  // </ngOnInitSnippet>

  // <formatDateTimeTimeZoneSnippet>
  formatDateTimeTimeZone(dateTime: DateTimeTimeZone): string {
    try {
      return moment.tz(dateTime.dateTime, dateTime.timeZone).format();
    }
    catch(error) {
      this.alertsService.add('DateTimeTimeZone conversion error', JSON.stringify(error));
    }
  }
  // </formatDateTimeTimeZoneSnippet>
}
