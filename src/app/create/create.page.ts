import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  providers: [ Vibration ]
})
export class CreatePage implements OnInit {
  
    
   
    classroomForm: FormGroup;
  data
    : any;
  students: FormArray;
  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private vibration: Vibration,
    private formBuilder: FormBuilder) {

  }




  async saveClassroom() {
    await this.api.postClassroom(this.data)
    .subscribe(res => {
        let id = res['id'];
        this.router.navigate(['/detail', JSON.stringify(id)]);
      }, (err) => {
        console.log(err);
      });
      this.vibration.vibrate(1000);

  }

 



 
 
  ngOnInit() {
    this.data = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      isbn: new FormControl(),
      price: new FormControl(),
      availability: new FormControl(true, Validators.pattern('true'))
    });
   }




  ionViewWillEnter() {
    this.data = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      isbn: new FormControl(),
      price: new FormControl(),
      availability: new FormControl(true, Validators.pattern('true'))
    });
   };

}
