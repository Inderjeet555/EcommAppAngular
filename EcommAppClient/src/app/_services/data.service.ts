import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  UserId: number;

private itemCount = new BehaviorSubject<number>(0);
  currentCount = this.itemCount.asObservable();

constructor() { }

changeItemCount(itemCount: number) {
  this.itemCount.next(itemCount);
}

}
