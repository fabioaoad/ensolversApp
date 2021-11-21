import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EnsolversService } from "../ensolvers.service";
import { ItemsResponse } from "../interfaces/interface";



@Component({
  selector: 'app-to-list',
  templateUrl: './to-list.component.html',
  styleUrls: ['./to-list.component.css']
})
export class ToListComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
  checked = false;


  listadoItems: ItemsResponse[] = [];

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)] ],

  });

  constructor( private fb: FormBuilder,
               private  router: Router,
               private ensolverService: EnsolversService) {  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: ''
    });

    this.mostrarItems();

  }

  ngOnDestroy(): void {
   // console.log('Disparo el ngOnDestroy');
    this.mostrarItems();
  }
  ngOnChanges(changes: SimpleChanges): void {
   // console.log('Disparo el: ngOnChanges');
    this.mostrarItems();
  }



  ngDoCheck(): void {
    //console.log('Disparo el: ngDoCheck');
    //this.mostrarItems();
  }


  crearItem(){
    const { nombre } = this.miFormulario.value;

    this.ensolverService.registro(nombre)
      .subscribe( res => {
       // console.log(res);
      });
    this.router.navigateByUrl('/items', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/items']));
    this.mostrarItems();
    this.miFormulario.reset();


  }

  mostrarItems(){
    this.ensolverService.getItems().subscribe(resp => {

      this.listadoItems = resp;
      //console.log(resp);

    });
  }



  editar(id: any){
   // console.log(id);
    this.ensolverService.getItem(id).subscribe(res => {
     // console.log(res)
    });
   this.router.navigate(['/editar',id]);


  }

  borrar(id: any){
    // console.log(id);
    this.ensolverService.deleteItem(id).subscribe(res => {
      // console.log(res)
    });
   // this.router.navigate(['/editar',id]);


  }







}
