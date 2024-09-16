import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIDataService {

  private openAIApiUrl = 'http://localhost:8080/api/v1/openai-data'; // Replace with your API endpoint
  ///api/openai-v1-data
  // Define your request headers
  private requestHeaders = new HttpHeaders({
    //'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  async getData() {
    return await this.http.get<any>(this.openAIApiUrl, {
      headers: this.requestHeaders
    }).toPromise();
  }

  postData(prompt: String) {
    return this.http.post<any>(this.openAIApiUrl, prompt).toPromise();
  }
}


