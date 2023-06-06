export class Helper {
  static formatTime(time:number) {
    const minutes:number | 0 = time%60;
    const hours:number | 0 = (time-minutes)/60;
    if(hours>0){      
        return `${hours}h ${minutes}min`;
    }else {
        return `${minutes}min`;
    }
  }
    static formatDate(date:string) {
        const dateType:Date = new Date(date);
        return new Intl.DateTimeFormat('en-US').format(dateType);
  }
}