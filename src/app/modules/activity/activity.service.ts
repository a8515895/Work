import { Injectable } from '@angular/core';
import {Activity} from './activity';
@Injectable()
export class ActivityService {
    activities : Activity [] =[];
    constructor() { 
        this.addActivity(new Activity('ev1','Sinh Nhật','Anh Khoa','20/08/2017','event'));
        this.addActivity(new Activity('ev2','Liên Hoan','Anh Trí','11/07/2017','event'));
        this.addActivity(new Activity('ca1','Cuộc Gọi 1','Anh Toàn','20/08/2017','call'));
        this.addActivity(new Activity('ca3','Cuộc Gọi 2','Anh Minh','20/08/2017','call'));
        this.addActivity(new Activity('ca2','Cuộc Gọi 3','Anh Minh','20/08/2017','call'));
    }
    public addActivity(activity : Activity){
        this.activities.push(activity);
    }
    public listActivity(){
        return this.activities;
    }
    public getActivityById(id : string){
        let data : Activity;
        this.activities.forEach(e=>{
            if(e.id==id){
                data = e
            }
        })
        return data;
    }
}