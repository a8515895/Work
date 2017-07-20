export class Activity{
    public id : string;
    public name : string;
    public create_by : string;
    public date : string;
    public type : string;
    constructor(id : string,name : string,create_by : string,date : string,type : string){
        this.id = id;
        this.name = name;
        this.create_by = create_by;
        this.date = date;
        this.type = type;
    }
}