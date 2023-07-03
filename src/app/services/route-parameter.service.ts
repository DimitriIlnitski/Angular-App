import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteParameterService {
  private data : string | null = null;

  setData(data: string | null) {
    this.data = data;
    console.log(this.data);
  }

  getData() {
    return this.data;
  }
}
