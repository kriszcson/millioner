import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PointReplacerPipe } from '../question/formatter/point-replacer.pipe';

@Component({
  selector: 'app-finished-game',
  templateUrl: './finished-game.component.html',
  styleUrls: ['./finished-game.component.scss']
})
export class FinishedGameComponent implements OnInit {

  points: number;

  constructor(
    private router: Router
  ) {
    this.points = history.state.points;
    console.log(this.points)
  }

  ngOnInit(): void {
  }

  newGame() {
    this.router.navigate(['']);
  }

}
