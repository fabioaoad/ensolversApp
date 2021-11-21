import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  exports:[
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class MaterialModule { }
