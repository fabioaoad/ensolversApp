import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EnsolversService} from "../ensolvers.service";
import {ItemsResponse} from "../interfaces/interface";
import {Observable} from "rxjs";


@Component({
  selector: 'app-editing-task',
  templateUrl: './editing-task.component.html',
  styleUrls: ['./editing-task.component.css']
})
export class EditingTaskComponent implements OnInit {

  @Input() listadoItems!: ItemsResponse[];

  item!: Observable<ItemsResponse>;
  checked = false;
  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)] ],
  });


  constructor( private fb: FormBuilder,
               private  router: Router,
               private ensolverService: EnsolversService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }


  getItems(){
    this.ensolverService.getItems().subscribe(resp => {
    //  console.log(resp)
    });
  }

  cargarFormulario(){
    let miId =  this.route.snapshot.paramMap.get('id');
   // console.log('mi idddd', miId);
    var aux: string = '';
     this.ensolverService.getItem(miId).subscribe(res => {
      aux = res.name;
     // console.log('ss',aux);
   //  console.log('fomu',this.miFormulario);
       this.miFormulario.reset({
         nombre: aux
       });
    });



  }



  actualizarItem(){
    const { nombre } = this.miFormulario.value;
  //  console.log('nombrefo',nombre);
    let miId =  this.route.snapshot.paramMap.get('id');
    var aux: string = '';
   const body = { name: nombre, estado: true};
     this.ensolverService.updateItem(miId,body).subscribe(res => {
      // console.log(res);
     });
    //this.router.navigate(['/items']);
    this.router.navigateByUrl('/items', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/items']));

  }

  cancelar(){
    this.router.navigate(['/items']);
  }


}
