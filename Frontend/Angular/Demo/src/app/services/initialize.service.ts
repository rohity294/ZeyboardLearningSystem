import { Injectable } from '@angular/core';
import { AiApp } from '../models/AiApp';
import { NodeInitializeService } from './api/node-api/initialize.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  aiAppArray: AiApp[] = [];
  aiAppIPrepArray: AiApp[] = [];
  aiAppFinbotArray: AiApp[] = [];
  aiAppIntelliSenseArray: AiApp[] = [];
  aiAppResRevArray: AiApp[] = [];
  myImagePath: string = 'assets/images/';

  modulesPageMap: Map<number, AiApp[]> = new Map<number, AiApp[]>();
  subModulesMap: Map<string, AiApp[]> = new Map<string, AiApp[]>();
  portNumbersMap: Map<string, number> = new Map<string, number>();

  nodeBackendJsonData: any[] = [];
  profileNames: string[] = [];

  // BehaviorSubject to emit array changes
  private dataArraySubject = new BehaviorSubject<any[]>(this.aiAppArray);
  // Observable stream of array changes
  dataArray$ = this.dataArraySubject.asObservable();

  constructor(private nodeInitializeService: NodeInitializeService) {
    /*let res: never[] = [];
    await this.nodeInitializeService.initializeFromMongoDB().then(response =>
      res = response
    ).catch(error=>console.log(error));
    console.log(res);*/
    /*let res: never[] = [];
    await this.nodeInitializeService
      .initializeFromLocalJsonFile()
      .then((response) => (res = response))
      .catch((error) => console.log(error));
    console.log(res);*/
  }

  async getDataFromNodeBackend(): Promise<void> {
    let responseData: any;
    responseData =
      await this.nodeInitializeService.initializeFromLocalJsonFile();
    /*(await this.nodeInitializeService.initializeFromLocalJsonFile()).subscribe(
      (response: any) => {
        //this.data = response; // Assign fetched data to a component property
        console.log('11:Fetched data:', response);//printing
        responseData = response;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );*/
    //console.log("22:"+responseData);//printing
    //console.log("33:"+JSON.stringify(responseData));//printing
    return responseData;
  }

  initializeSubModules(aiAppArray: any) {
    aiAppArray.forEach((aiApp: any) => {
      //console.log(aiApp.length);//printing
      if (aiApp.length) {
        aiApp.forEach((item: any) => {
          //console.log(item);//printing
          if (item.subModules) {
            //console.log(item.subModules);//printing
            let subModuleApps: AiApp[] = [];
            item.subModules.forEach((element: any) => {
              //console.log(element);//printing
              subModuleApps.push(element);
            });
            this.subModulesMap.set(item.name, subModuleApps);
          }
        });
      }
    });
    //console.log(this.subModulesMap);//printing
  }

  initializeProfileEndpoints(jsonData: void) {
    try {
      // Check if jsonData is an array
      if (Array.isArray(jsonData)) {
        // Map through the JSON data and print each item
        jsonData.forEach((item) => {
          const nameWithoutSpaces = item.name.replace(/\s+/g, '');
          this.profileNames.push(nameWithoutSpaces);
        });
      } else {
        console.error('Expected an array but received:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async initialize() {
    let responseData = await this.getDataFromNodeBackend();
    // this.initializeProfileEndpoints(responseData);
    // console.log(this.profileNames);
    //console.log("44:" + responseData);//printing
    //console.log("55:" + JSON.stringify(responseData));//printing
    //initial array of initially loading 3 apps/modules on the first page
    this.aiAppArray = [JSON.parse(JSON.stringify(responseData))];
    //console.log(this.aiAppArray);//printing
    this.dataArraySubject.next(this.aiAppArray); // Emit the new array to subscribers
    this.initializeSubModules(this.aiAppArray);

    return this.aiAppArray;
  }

  getSubModulesByName(moduleName: string): AiApp[] | undefined {
    //console.log("103:" + moduleName);//printing
    //console.log(this.aiAppArray);//printing
    if (this.subModulesMap.has(moduleName)) {
      if (this.subModulesMap.get(moduleName))
        return this.subModulesMap.get(moduleName);
    }
    return undefined;
  }

  getPortNumberBySubmoduleName(submoduleName: string): number {
    let portNumber = -1;
    switch (submoduleName) {
      case 'Financial Advisor':
        portNumber = 4201;
        break;
      case 'FinbotSubModule3':
        portNumber = 4203;
        break;
      case 'Interview Tips':
        portNumber = 4202;
        break;
      case 'Mock Exam':
        portNumber = 4204;
        break;
      case 'Keyword Matching':
        portNumber = 4205;
        break;
    }
    return portNumber;
  }
}
