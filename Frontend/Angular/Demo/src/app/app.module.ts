import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { CardComponent } from './components/card/card.component';
import { SplitFirstPartPipe } from './utilities/split-first-part.pipe';
import { FinwiseComponent } from './components/ai-components/finwise/finwise.component';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { HttpClientModule } from '@angular/common/http';
import { IPrepComponent } from './components/ai-components/iprep/iprep.component';
import { SpeechToTextCapturerComponent } from './components/ai-components/speech-to-text-capturer/speech-to-text-capturer.component';
import { SubmoduleContainerComponent } from './components/submodule-container/submodule-container.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { IntellisenseComponent } from './components/ai-components/intellisense/intellisense.component';
import { DisplayContainerComponent } from './components/display-container/display-container.component';
import { ResrevComponent } from './components/ai-components/resrev/resrev.component';
import { MenuComponent } from './components/menu/menu.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './pages/profile/profile.component';
import { AimoduleComponent } from './components/aimodule/aimodule.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    CardComponent,
    SplitFirstPartPipe,
    FinwiseComponent,
    QuestionComponent,
    AnswerComponent,
    IPrepComponent,
    SpeechToTextCapturerComponent,
    SubmoduleContainerComponent,
    PaginationComponent,
    IntellisenseComponent,
    DisplayContainerComponent,
    ResrevComponent,
    MenuComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AimoduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [SplitFirstPartPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
