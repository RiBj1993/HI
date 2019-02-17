import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  providers: [ Vibration ]
})
export class DetailPage implements OnInit {
  classroom: any = {};
  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public navcontroller: NavController,
    private vibration: Vibration,
    public router: Router,
    public location: Location) { }
  async getClassroom() {
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
            this.classroom = std;
          }
        })


        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  ngOnInit() {
    this.getClassroom();
  }
  async delete(id) {
    const loading = await this.loadingController.create({
      message: 'Deleting'
    });
    await loading.present();

    await this.api.deleteClassroom(id)
      .subscribe(res => {
        loading.dismiss();
        // this.location.back();
        this.navcontroller.navigateRoot('home');

      }, err => {
        console.log(err);
        loading.dismiss();
      });

      this.vibration.vibrate(1000);

  }
 

  ionViewWillEnter() {

    this.getClassroom();
  };
}
