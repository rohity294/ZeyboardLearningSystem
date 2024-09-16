import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeInitializeService {

  constructor(private http: HttpClient) { }


  async initializeFromMongoDB() {
    const backendUrl = 'http://localhost:3000/api/v1/initializeModulesAndSubmodules';
    return await this.http.get<any>(backendUrl).toPromise();
  }

  async initializeFromLocalJsonFile(){
    let backendUrl;
    backendUrl = 'http://localhost:3000/api/data/zls';
    //backendUrl = 'https://zeyboard-dot-tech-node-backend.vercel.app/api/data';
    return await this.http.get<any>(backendUrl).toPromise();
  }

  async increaseCountInJsonFile(item: { question: string, link: string, count: number }){
    let backendUrl;
    backendUrl = 'http://localhost:3000/api/data/zls/increaseCount';
    //backendUrl = 'https://zeyboard-dot-tech-node-backend.vercel.app/api/data';
    try {
      const response = await this.http.post<any>(backendUrl, item).toPromise();
      return response.updatedCount; // Assuming the backend returns the updated count in response.data.count
    } catch (error) {
      console.error('Error posting data', error);
      throw error;
    }
  }
}


