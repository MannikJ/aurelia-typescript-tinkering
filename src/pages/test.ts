import {Aurelia, autoinject, bindable, singleton} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {TableData} from 'util/table-data';

@singleton()
@autoinject
export class Test {
    intervalId: number;
    heading: String = 'Elasticsearch Indexes'
    count: number = 1;
    @bindable page = '';
    @bindable test;
    headers: string[] = [];
    /*
    {
            keyOne: 'myValue1',
            keyTwo: 'myValue2',
            keyThree: 'myValue3',
            keyFour: 'myValue4',
        };
        */

    url = 'http://localhost:9200/_cat/indices?v';

    constructor(private http: HttpClient) {
        console.log("Test constructor");
        this.http = http;
        this.getTableData();        
    }

    async updateElasticsearch() {
        console.log("update Elasticsearch...");
        let async = await this.http.get(this.url).then(response => {
            this.page = this.count + '\n' + response.content;
            console.log(this.page);
            this.test = "success";
            
        });
    }

    async activate() {
        console.log("before view activation");
        this.updateElasticsearch();
        this.intervalId = setInterval(() => {
            this.updateElasticsearch();
            this.headers.push("value"+this.count);
            this.count++;
        }, 1000);
        console.log("after view activation");
    }

    canDeactivate() {
        console.log("deactivate");
        clearInterval(this.intervalId);
    }
    


    getTableData() {
        console.log("Create and get sample table data...");
        //this.tableData.headers={val1: 'HEADER 1',val2: 'HEADER 2',val3: 'HEADER 3'};
        //this.tableData.data=['DATA 1','DATA 2','DATA 3'], ['DATA 1','DATA 2','DATA 3'];
    }


}