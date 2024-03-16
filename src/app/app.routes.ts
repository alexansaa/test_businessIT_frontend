import { Routes } from '@angular/router';
import { LayoutComponent } from './Components/layout/layout.component';

export const routes: Routes = [
  {path:'',component:LayoutComponent, pathMatch:"full"},
  {path:'pages',loadChildren:() => import("./Components/layout/layout.module").then(m => m.LayoutModule)},
  {path:'**',redirectTo:"pages",pathMatch:"full"}
];
