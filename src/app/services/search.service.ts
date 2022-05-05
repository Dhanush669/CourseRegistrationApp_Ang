import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpService:HttpRequestService) { }

  getAllCourses() {
    return this.httpService.get('getAllCourses');
  }
}
