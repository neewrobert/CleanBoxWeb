import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { BRComponent } from './br/br.component';
import { ContentComponent } from './content/content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CardRefreshDirective } from './card/card-refresh.directive';
import { CardToggleDirective } from './card/card-toggle.directive';
import { CardComponent } from './card/card.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule  
  ],
  declarations: [
      MenuComponent, 
      FooterComponent,
      BRComponent,
      ContentComponent,
      HeaderComponent,
      CardRefreshDirective,
      CardToggleDirective,
      CardComponent,
      LoadingSpinnerComponent
    ],
  providers:[],
  exports:[
      MenuComponent,
      FooterComponent,
      BRComponent,
      ContentComponent,
      HeaderComponent,
      CardRefreshDirective,
      CardToggleDirective,
      CardComponent,
      LoadingSpinnerComponent
    ]
})

export class SharedModule {}
