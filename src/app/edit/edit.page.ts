import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  classroomForm: FormGroup;
  data
    : any;
  students: FormArray;
  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {

  }




  async updateClassroom() {
    await this.api.updateClassroom(this.route.snapshot.paramMap.get('id'), this.data)
      .subscribe(res => {
        let id = res['id'];
        this.router.navigate(['/detail', JSON.stringify(id)]);
      }, (err) => {
        console.log(err);
      });
  }

  deleteStudent(control, index) {
    control.removeAt(index)
  }




  async getClassrooms() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getClassroom()
      .subscribe(res => {
        console.log(res);
        res.forEach(std => {

          if ("" + std.id == "" + this.route.snapshot.paramMap.get('id')) {
            console.log("hhhhh");
            this.data = std;

          }
        })


        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  /*  async getClassroom(id) {
      const loading = await this.loadingController.create({
       message: 'Loading'
      });
      await loading.present();
      await this.api.getClassroomById(id).subscribe(res => {
        this.classroomForm.controls['class_name'].setValue(res.class_name);
        let controlArray = <FormArray>this.classroomForm.controls['students'];
        res.students.forEach(std => {
          controlArray.push(this.formBuilder.group({
             student_name: ''
          }));
        });
        for(let i=0;i<res.students.length;i++) {
          controlArray.controls[i].get('student_name').setValue(res.students[i].student_name);
        }
        console.log(this.classroomForm);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
    }*/
  ngOnInit() {
    this.data = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      isbn: new FormControl(),
      price: new FormControl(),
      availability: new FormControl(true, Validators.pattern('true'))
    });
    this.getClassrooms();
  }




  ionViewWillEnter() {
    this.data = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      isbn: new FormControl(),
      price: new FormControl(),
      availability: new FormControl(true, Validators.pattern('true'))
    });
    this.getClassrooms();
  };

}
