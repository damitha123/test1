import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './pages/authors/authors.component';
import { DefaultComponent } from './pages/default/default.component';
import { LongPageComponent } from './pages/long-page/long-page.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShortPageComponent } from './pages/short-page/short-page.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  { path:'', pathMatch:'full' , component:DefaultComponent  },
  { path:'default', component:DefaultComponent  },
  { path:'long-page', component:LongPageComponent  },
  { path:'short-page', component:ShortPageComponent  },
  { path:'authors', component:AuthorsComponent  },
  { path:'products', component:ProductsComponent  },
  { path:'users', component:UsersComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
