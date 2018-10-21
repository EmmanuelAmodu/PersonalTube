import { Routes } from '@angular/router';
import { YoutubeComponent } from '@modules/youtube/youtube.component';
import { PlayerComponent } from '@modules/youtube/player/player.component';

export const ROUTES: Routes = [
  {path: ':code', component: YoutubeComponent},
  {path: '', component: YoutubeComponent},
  {path: 'player/:videoId', component: PlayerComponent},
];
