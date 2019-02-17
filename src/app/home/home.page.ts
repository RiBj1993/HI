import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor( 
    public api: RestApiService, public loadingController: LoadingController) { }
  classrooms: any;
  ngOnInit() {
    this.classrooms={}
    this.getClassrooms();
  }

  
  ionViewDidLoad() {
   this.classrooms={}
    this.getClassrooms();
  };

  ionViewWillEnter() {
    this.classrooms={}
    this.getClassrooms();
  };
  async getClassrooms() {
    const loading = await this.loadingController.create({
     message: 'Loading'
    });
    await loading.present();
    await this.api.getClassroom()
      .subscribe(res => {
        console.log(res);
        this.classrooms = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}