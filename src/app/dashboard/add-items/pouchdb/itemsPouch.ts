import { compare, hash, hashSync } from 'bcryptjs';
import { Fabric,Mill } from '../Items.Model';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

declare function require(name:string);
const PouchDB = require('pouchdb').default;




interface IPouchDBAllDocsResult {
	offset: number;
	total_rows: number;
	rows: IPouchDBRow[];
}
interface IPouchDBRow {
	id: string;
	key: string;
	value: { rev: string };
	doc?: any;
}
interface IPouchDBRemoveResult {
	ok: boolean;
	id: string;
	rev: string;
}


@Injectable({providedIn : 'root'})
export class ItemPouch{

    private db : any;
    constructor(private router : Router) {
        this.db = new PouchDB(
                "gmkknits-pouchdb",
                {
                    auto_compaction: true
                }
            );
      }

    public addFabricToDoc(fabric : Fabric){
      var getPromise =  this.db
                  .put({
                    _id: ( "fabric:" + ( new Date() ).getTime() ),
                    sno : fabric.sno,
                    fabricName: fabric.fabric
                  })
                  .then(
                    ( result: any ) : string => {
                     return result;
                    }
                  );
          return getPromise;
    }

    public getFabrics (fabric){
      var promise = this.db
      .allDocs({
        include_docs: true,
        startkey: 'fabric:',
        endkey: 'fabric:\uffff'
      })
      .then(
        ( result: IPouchDBAllDocsResult ) : any[] => {
          if (result.rows.length > 0){
            return result.rows.filter(row  =>
              row.doc.fabricName.toLowerCase() === fabric.toLowerCase()
            );
          }else{
            return result.rows;
          }
        }
      );
     return  promise;
    }

    public getAllFabrics (){
      var promise = this.db
      .allDocs({
        include_docs: true,
        startkey: 'fabric:',
        endkey: 'fabric:\uffff'
      })
      .then(
        ( result: IPouchDBAllDocsResult ) : any[] => {
            return result.rows;
        }
      );
     return  promise;
    }
    public deleteFabrics (fabric : any){
      return this.db.remove( fabric);
    }

    public addMillToDoc(mill : Mill){
      var getPromise =  this.db
                  .put({
                    _id: ( "mill:" + ( new Date() ).getTime() ),
                    sno : mill.sno,
                    millName: mill.mill
                  })
                  .then(
                    ( result: any ) : string => {
                     return result;
                    }
                  );
          return getPromise;
    }

    public getMills (mill){
      var promise = this.db
      .allDocs({
        include_docs: true,
        startkey: 'mill:',
        endkey: 'mill:\uffff'
      })
      .then(
        ( result: IPouchDBAllDocsResult ) : any[] => {
          if (result.rows.length > 0){
            return result.rows.filter(row  =>
              row.doc.millName.toLowerCase() === mill.toLowerCase()
            );
          }else{
            return result.rows;
          }
        }
      );
     return  promise;
    }

    public getAllMills (){
      var promise = this.db
      .allDocs({
        include_docs: true,
        startkey: 'mill:',
        endkey: 'mill:\uffff'
      })
      .then(
        ( result: IPouchDBAllDocsResult ) : any[] => {
            return result.rows;
        }
      );
     return  promise;
    }
    public deleteMills (mill : any){
      return this.db.remove( mill);
    }


}
