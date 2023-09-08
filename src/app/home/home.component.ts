import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
  ],
  template: `
  <section>
    <form>
      <input #filter
      type="text" placeholder="Filter by city">
      <button (click)="filterResults(filter.value)" class="primary" type="button">Search</button>
    </form>
  </section>

  <section class="results">
    <app-housing-location
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
  export class HomeComponent {
  
  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];
  housingSerice: HousingService = inject(HousingService);

  filterResults(text: string) {
    console.log()
    if(!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => 
      housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  constructor() {
    this.housingSerice.getAllHousingLocations().then(
      (housingLocationList: HousingLocation[])=> {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    })

  }
}
