import { Component, OnInit } from '@angular/core';
import { MaterialTestService } from './material-test.service';

@Component({
  selector: 'app-material-test',
  templateUrl: './material-test.component.html',
  styleUrls: ['./material-test.component.scss']
})

export class MaterialTestComponent implements OnInit {


  hello: any;

  constructor(private readonly testService: MaterialTestService) { }

  ngOnInit(): void {
    (this.testService.getHelloTest()).subscribe((data) => {
      this.hello = data;
    })
  }


  async test() {
    console.log(this.hello)
  }
}
