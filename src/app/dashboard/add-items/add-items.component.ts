import { Component, OnInit } from '@angular/core';
import {  MatTableDataSource } from '@angular/material/table';
import {Fabric,Mill} from './Items.Model';
import { NgForm } from '@angular/forms';
import {ItemPouch} from './pouchdb/itemsPouch';
import {DialogFabricFoundElementsDialog,DialogMillFoundElementsDialog}
from '../../dialog/DialogElementsDialog';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {

  fabricDisplayedColumns: string[] = ['sno','fabric','edit','delete'];
  fabricDataSource : MatTableDataSource<Fabric>;
  fabriclistData: Fabric[] = [];
  fabricAddRow : Fabric ;

  millDisplayedColumns: string[] = ['sno','mill','edit','delete'];
  millDataSource : MatTableDataSource<Mill>;
  milllistData: Mill[] = [];
  millAddRow : Mill ;
  constructor(private items : ItemPouch,public dialog: MatDialog) { }

  ngOnInit(): void {

      this.items.getAllFabrics().then(result => {
        console.log(result);
        result.forEach((data)=>{
          this.fabricAddRow =
          {
          sno: this.fabriclistData.length + 1,
          fabric:data.doc.fabricName
          };

          this.fabriclistData.push( this.fabricAddRow );
        });
        this.fabricDataSource = new MatTableDataSource<Fabric>(this.fabriclistData);
      });

      this.items.getAllMills().then(result => {
        console.log(result);
        result.forEach((data)=>{
          this.millAddRow =
          {
          sno: this.milllistData.length + 1,
          mill:data.doc.millName
          };

          this.milllistData.push( this.millAddRow );
        });
        this.millDataSource = new MatTableDataSource<Mill>(this.milllistData);
      });

  }
  addFabric(fabricTableRow:NgForm){

    if(!fabricTableRow.invalid)
    {
          this.fabricAddRow =
          {
          sno: this.fabriclistData.length + 1,
          fabric:String(fabricTableRow.value.fabric).trim(),
          };
          this.items.getFabrics(this.fabricAddRow.fabric).then(result => {
            if (result.length == 0)
            {
               this.items.addFabricToDoc(this.fabricAddRow).then(result => {
                    if(result.ok){
                      this.fabriclistData.push(this.fabricAddRow);
                      this.fabricDataSource = new MatTableDataSource<Fabric>(this.fabriclistData);
                      fabricTableRow.resetForm();
                    }
              });
            }
            else{
              this.dialog.open(DialogFabricFoundElementsDialog);
              //alert("Fabric already exist, Please add new one or edit existing one");
            }
          });

    }
  }

  deleteFabric(fabric:string){
    this.items.getFabrics(fabric).then(result => {
      this.items.deleteFabrics(result[0].doc).then(result => {
        console.log(result);
        if(result.ok){
          const deletedData : Fabric[] =
          this.fabriclistData.filter((element, index, array) => {
          return (element.fabric != fabric);
          });
          var count : number = 0;
          var modifiedSno : Fabric[] =  deletedData.map((element)=>{
          element.sno = count+1;
          count++;
          return element;
     });
          this.fabriclistData = modifiedSno;
          this.fabricDataSource = new MatTableDataSource<Fabric>(this.fabriclistData);
        }
      });
    });
  }

  editFabric(fabric:string,tableRow:NgForm){

    this.items.getFabrics(fabric).then(result => {
      this.items.deleteFabrics(result[0].doc).then(result => {
        console.log(result);
        if(result.ok){
          const deletedData : Fabric[] =
          this.fabriclistData.filter((element, index, array) => {
          return (element.fabric != fabric);
          });
          var count : number = 0;
          var modifiedSno : Fabric[] =  deletedData.map((element)=>{
          element.sno = count+1;
          count++;
          return element;
     });
          this.fabriclistData = modifiedSno;
          this.fabricDataSource = new MatTableDataSource<Fabric>(this.fabriclistData);
          tableRow.controls.fabric.setValue(fabric);
        }
      });
    });

  }

  addMill(millTableRow:NgForm){

    if(!millTableRow.invalid)
    {
          this.millAddRow =
          {
          sno: this.milllistData.length + 1,
          mill:String(millTableRow.value.mill).trim(),
          };
          this.items.getMills(this.millAddRow.mill).then(result => {
            if (result.length == 0)
            {
               this.items.addMillToDoc(this.millAddRow).then(result => {
                    if(result.ok){
                      this.milllistData.push(this.millAddRow);
                      this.millDataSource = new MatTableDataSource<Mill>(this.milllistData);
                      millTableRow.resetForm();
                    }
              });
            }
            else{
              this.dialog.open(DialogMillFoundElementsDialog);
              //alert("Mill already exist, Please add new one or edit existing one");
            }
          });

    }
  }

  deleteMill(mill:string){
    this.items.getMills(mill).then(result => {
      this.items.deleteMills(result[0].doc).then(result => {
        console.log(result);
        if(result.ok){
          const deletedData : Mill[] =
          this.milllistData.filter((element, index, array) => {
          return (element.mill != mill);
          });
          var count : number = 0;
          var modifiedSno : Mill[] =  deletedData.map((element)=>{
          element.sno = count+1;
          count++;
          return element;
     });
          this.milllistData = modifiedSno;
          this.millDataSource = new MatTableDataSource<Mill>(this.milllistData);
        }
      });
    });
  }

  editMill(mill:string,tableRow:NgForm){

    this.items.getMills(mill).then(result => {
      this.items.deleteMills(result[0].doc).then(result => {
        console.log(result);
        if(result.ok){
          const deletedData : Mill[] =
          this.milllistData.filter((element, index, array) => {
          return (element.mill != mill);
          });
          var count : number = 0;
          var modifiedSno : Mill[] =  deletedData.map((element)=>{
          element.sno = count+1;
          count++;
          return element;
     });
          this.milllistData = modifiedSno;
          this.millDataSource = new MatTableDataSource<Mill>(this.milllistData);
          tableRow.controls.mill.setValue(mill);
        }
      });
    });

  }
}
