import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingBlockService {
  isLoading = false;

  isLoadingMethod() {
    return this.isLoading;
  }
}
