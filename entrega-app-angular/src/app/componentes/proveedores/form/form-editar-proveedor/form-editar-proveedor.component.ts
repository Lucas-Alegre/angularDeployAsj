import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CondicionIvaService } from 'src/app/services/condicionDeIva/condicion-iva.service';
import { ContactosService } from 'src/app/services/contactos/contactos.service';
import { CountryService } from 'src/app/services/country/country.service';
import { DireccionService } from 'src/app/services/direccion/direccion.service';
import { PaisService } from 'src/app/services/pais/pais.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { ProvinciasService } from 'src/app/services/provincias/provincias.service';
import { RubroService } from 'src/app/services/rubro/rubro.service';

@Component({
  selector: 'app-form-editar-proveedor',
  templateUrl: './form-editar-proveedor.component.html',
  styleUrls: ['./form-editar-proveedor.component.css']
})
export class FormEditarProveedorComponent {
  listaRubros: any = [];
  listaCondicionIva: any = []
  listaPaises: any = []
  paisEncontrado: any = []
  listaProvincias: any = []
  listProvinciasTodas: any = []
  listCondiciondeIva: any = []
  listaDireccion: any = [];
  listaRubrosEncontrado: any = [];
  private modalService = inject(NgbModal);

  listaCategorias: any = ["Tecnológico"]
  listaRoles: any = ["usuario", "admin"]
  editarInvalido: boolean = false;
  nombreProducto = "";
  nombre: string = '';
  proveedor = "";
  categoria = "";
  imagen = "";
  descripcion = "";
  precio = "";
  idNuevo = 0;
  proveedorId: any;
  cuitAux: string = "";
  proveedorObjet: any = {};
  country: any = []
  countryName = []
  countryNameAux = []
  stateToCountry = []
  stateToCountryName: any = []
  citieToState: any = []
  citieToStateByName: any = []

  public form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private serviceProveedor: ProveedoresService,
    private rubroService: RubroService,
    private condicionIvaService: CondicionIvaService,
    private paisServices: PaisService,
    private provinciaServices: ProvinciasService,
    private direccionService: DireccionService,
    private contactosService: ContactosService,
    private route: Router,
    private _activateRoute: ActivatedRoute,
    private servicesCountry: CountryService) { }


  ngOnInit(): void {
    this.proveedorId = this._activateRoute.snapshot.paramMap.get('id');
    this.serviceProveedor.getById(this.proveedorId).subscribe(data => {
      this.proveedorObjet = data;
      /*console.log("Soy el objeto precargado de la api by id")
      console.log(this.proveedorObjet)

      console.log(this.proveedorObjet)*/
      this.form = this.formBuilder.group({
        codigoForm: [{ value: `${this.proveedorObjet.codigo}`, disabled: true }, [Validators.required, Validators.minLength(4)]],
        razonSocialForm: [`${this.proveedorObjet.razonSocial}`, [Validators.required, Validators.minLength(2)]],
        rubroForm: [`${this.proveedorObjet.rubro.nombre}`, [Validators.required]],
        sitioWebForm: [`${this.proveedorObjet.sitioWeb}`, [Validators.required, Validators.minLength(12)]],
        condicionIvaForm: [`${this.proveedorObjet.condIva.condNombre}`, [Validators.required]],
        imagenForm: [`${this.proveedorObjet.imagen}`, [Validators.required, Validators.minLength(5)]],

        localidadForm: [`${this.proveedorObjet.direc.localidad}`, [Validators.required, Validators.minLength(3)]],
        provinciaForm: [`${this.proveedorObjet.direc.provincia.nombre}`, [Validators.required]],
        paisForm: [`${this.proveedorObjet.direc.provincia.pais.nombre}`, [Validators.required, Validators.minLength(3)]],
        calleForm: [`${this.proveedorObjet.direc.calle}`, [Validators.required, Validators.minLength(3)]],
        numeroCalleForm: [`${this.proveedorObjet.direc.numCalle}`, [Validators.required, Validators.minLength(1)]],
        codigoPostalForm: [`${this.proveedorObjet.direc.codigoPostal}`, [Validators.required, Validators.minLength(2)]],

        cuitForm: [{ value: `${this.proveedorObjet.cuit}`, disabled: true }, [Validators.required, Validators.minLength(10)]],
        telefonoForm: [`${this.proveedorObjet.telefono}`, [Validators.required, Validators.minLength(6)]],
        emailForm: [`${this.proveedorObjet.contactos.email}`, [Validators.required, Validators.minLength(3)]],
        nombreForm: [`${this.proveedorObjet.nombreProveedor}`, [Validators.required, Validators.minLength(2)]],
        rolForm: [`${this.proveedorObjet.contactos.rol}`, [Validators.required]]
      })

      //console.log(this.form.value)
      this.getCountry()
      this.form.controls['paisForm'].valueChanges.subscribe(value => {
        this.stateToCountry = this.country.filter((item: any) => item.country == value)
        this.stateToCountryName = this.stateToCountry.map((item: any) => item.subcountry);
        const stateToCountryConstName = new Set(this.stateToCountryName);
        this.stateToCountryName = [...stateToCountryConstName]
        this.encontrarIdPorNombre(value)
      })

      this.form.controls['provinciaForm'].valueChanges.subscribe(value => {
        this.citieToState = this.stateToCountry.filter((item: any) => item.subcountry == value)
        this.citieToStateByName = this.citieToState.map((item: any) => item.name);
        const citieToStateConstName = new Set(this.citieToStateByName);
        this.citieToStateByName = [...citieToStateConstName]
      })

    });

    this.getRubros();
    this.getCondicionDeIva();
    this.getPais()

  }


  getCountry() {
    this.servicesCountry.get().subscribe((data) => {
      this.country = data
      this.countryName = this.country.map((item: any) => item.country)
      const countryNameConstAux = new Set(this.countryName);
      this.countryNameAux = [...countryNameConstAux]

      this.stateToCountry = this.country.filter((item: any) => item.country == this.proveedorObjet.pais)
      this.stateToCountryName = this.stateToCountry.map((item: any) => item.subcountry);
      const stateToCountryConstName = new Set(this.stateToCountryName);
      this.stateToCountryName = [...stateToCountryConstName]

      this.citieToState = this.stateToCountry.filter((item: any) => item.subcountry == this.proveedorObjet.provincia)
      this.citieToStateByName = this.citieToState.map((item: any) => item.name);
      const citieToStateConstName = new Set(this.citieToStateByName);
      this.citieToStateByName = [...citieToStateConstName]
    });

  }

  getRubros() {
    this.rubroService.get().subscribe((data) => {
      this.listaRubros = data;
    });
  }

  getCondicionDeIva() {
    this.condicionIvaService.get().subscribe((data) => {
      this.listaCondicionIva = data;
    })
  }

  getPais() {
    this.paisServices.get().subscribe((data) => {
      this.listaPaises = data;
      this.encontrarIdPorNombre(this.proveedorObjet.direc.provincia.pais.nombre)
    })
  }

  encontrarIdPorNombre(nombre: String) {
    this.paisEncontrado = this.listaPaises.filter((p: any) => p.nombre == nombre)
    this.getProvincias(this.paisEncontrado[0])
  }


  getProvincias(pais: any) {
    this.provinciaServices.get().subscribe((data) => {
      this.listaProvincias = data.filter((e: any) => e.pais.id == pais.id)
    })
  }

  openScrollableContent(longContent: TemplateRef<any>) {
    this.modalService.open(longContent, { scrollable: true });
  }


  //primer from
  get codigoProveedorValido() {
    return this.form.get('codigoForm')?.invalid && this.form.get('codigoForm')?.touched;
  }

  get razonSocialValida() {
    return this.form.get('razonSocialForm')?.invalid && this.form.get('razonSocialForm')?.touched;
  }

  get rubroValido() {
    return this.form.get('rubroForm')?.invalid && this.form.get('rubroForm')?.touched;
  }

  get sitioWebValido() {
    return this.form.get('sitioWebForm')?.invalid && this.form.get('sitioWebForm')?.touched;
  }
  get sitioWebValido2() {
    let sitioweb = this.form.get('sitioWebForm')?.value;
    return sitioweb.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s].*(.com|.ar|.net|.br|web|=)$/g, "")
  }


  get condicionIvaValido() {
    return this.form.get('condicionIvaForm')?.invalid && this.form.get('condicionIvaForm')?.touched;
  }

  get imagenValida() {
    return this.form.get('imagenForm')?.invalid && this.form.get('imagenForm')?.touched;
  }
  get imagenValidaFormato() {
    let nombreProveedor = this.form.get('imagenForm')?.value;
    if (nombreProveedor.replace(/(http|https|ftp|ftps).*(png|jpg|jpeg|gif|webp|=)$/g, "")) {
      return true
    }
    return false
  }


  //Segundo from
  get localidadValida() {
    return this.form.get('localidadForm')?.invalid && this.form.get('localidadForm')?.touched;
  }
  get localidadValida2() {
    let nombreLocalidad = this.form.get('localidadForm')?.value;
    return nombreLocalidad.replace(/[^0-9]/g, "").length
  }

  get provinciaValida() {
    return this.form.get('provinciaForm')?.invalid && this.form.get('provinciaForm')?.touched;
  }
  get provinciaValida2() {
    let nombreProvincia = this.form.get('provinciaForm')?.value;
    return nombreProvincia.replace(/[^0-9]/g, "").length
  }

  get paisValido() {
    return this.form.get('paisForm')?.invalid && this.form.get('paisForm')?.touched;
  }
  get paisValido2() {
    let nombrePais = this.form.get('paisForm')?.value;
    return nombrePais.replace(/[^0-9]/g, "").length
  }

  get calleValida() {
    return this.form.get('calleForm')?.invalid && this.form.get('calleForm')?.touched;
  }

  get numeroCalleValido() {
    return this.form.get('numeroCalleForm')?.invalid && this.form.get('numeroCalleForm')?.touched;
  }
  get numeroCalleValido2() {
    let numeroCalle = this.form.get('numeroCalleForm')?.value;
    return numeroCalle <= 0
  }

  get codigoPostalValido() {
    return this.form.get('codigoPostalForm')?.invalid && this.form.get('codigoPostalForm')?.touched;
  }
  get codigoPostalValido2() {
    let codigoPostal = this.form.get('codigoPostalForm')?.value;
    return codigoPostal <= 0
  }


  //Tercero from
  get cuitValido() {
    return this.form.get('cuitForm')?.invalid && this.form.get('cuitForm')?.touched;
  }

  get telefonoValido() {
    return this.form.get('telefonoForm')?.invalid && this.form.get('telefonoForm')?.touched;
  }

  get emailValido() {
    return this.form.get('emailForm')?.invalid && this.form.get('emailForm')?.touched;
  }
  get emailValido2() {
    let email = this.form.get('emailForm')?.value;
    return email.replace(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g, "").length
  }

  get nombreValido() {
    return this.form.get('nombreForm')?.invalid && this.form.get('nombreForm')?.touched;
  }
  get nombreValido2() {
    let nombrePais = this.form.get('nombreForm')?.value;
    return nombrePais.replace(/[^0-9]/g, "").length
  }

  get apellidoValido() {
    return this.form.get('apellidoForm')?.invalid && this.form.get('apellidoForm')?.touched;
  }
  get apellidoValido2() {
    let nombrePais = this.form.get('apellidoForm')?.value;
    return nombrePais.replace(/[^0-9]/g, "").length
  }

  get rolValido() {
    return this.form.get('rolForm')?.invalid && this.form.get('rolForm')?.touched;
  }

  get formInvalido() {
    let formularioToValidar = this.form.invalid;
    if (formularioToValidar) {
      return true
    }
    return false
  }


  guardar(longContent: TemplateRef<any>) {
    //console.log(this.form.value)
    if (this.form.invalid) {
      //console.log("salio invalido-------")
      return Object.values(this.form.controls).forEach(controls => {
        controls.markAllAsTouched()
      })
    } else {
      //console.log("salio valido yesssssssssss")

      this.provinciaServices.get().subscribe((da) => {
        this.listProvinciasTodas = da;
        this.listProvinciasTodas = this.listProvinciasTodas.filter((a: any) => a.nombre == (this.form.get('provinciaForm')?.value))


        let direccion = {
          calle: this.form.get('calleForm')?.value,
          numCalle: this.form.get('numeroCalleForm')?.value,
          codigoPostal: this.form.get('codigoPostalForm')?.value.toString(),
          localidad: this.form.get('localidadForm')?.value,
          provincia: this.listProvinciasTodas[0]
        }

        //Se crea una nueva direccion
        this.direccionService.put(direccion, this.proveedorObjet.direc.id).subscribe((dir) => {

          let contactos = {
            email: this.form.get('emailForm')?.value,
            telefono: this.form.get('telefonoForm')?.value.toString(),
            rol: this.form.get('rolForm')?.value
          }

          //Se crea un nuevo contacto
          this.contactosService.put(contactos, this.proveedorObjet.contactos.id).subscribe((con) => {

            //encontrar condicionde iba por nombre
            this.condicionIvaService.get().subscribe((condicion) => {
              this.listCondiciondeIva = condicion;
              this.listCondiciondeIva = this.listCondiciondeIva.filter((cd: any) => cd.condNombre == this.form.get('condicionIvaForm')?.value)
              // console.log("condicion encontrada");
              //console.log(this.listCondiciondeIva[0])

              //buscar por rubro
              this.rubroService.get().subscribe((rubro) => {
                this.listaRubrosEncontrado = rubro
                this.listaRubrosEncontrado = this.listaRubrosEncontrado.filter((rub: any) => rub.nombre == this.form.get('rubroForm')?.value);
                //console.log("Rubro encontrado");
                //console.log(this.listaRubrosEncontrado[0])
              })

              let proveedorAdd = {
                codigo: this.form.get('codigoForm')?.value,
                razonSocial: this.form.get('razonSocialForm')?.value,
                sitioWeb: this.form.get('sitioWebForm')?.value,
                imagen: this.form.get('imagenForm')?.value,
                cuit: this.form.get('cuitForm')?.value,
                nombreProveedor: this.form.get('nombreForm')?.value,
                deleteAt: false,
                telefono: this.form.get('telefonoForm')?.value,
                direc: {
                  id: dir.id,
                  calle: dir.calle,
                  numCalle: dir.numCalle,
                  codigoPostal: dir.codigoPostal,
                  localidad: dir.localidad
                },
                condIva: this.listCondiciondeIva[0],
                contactos: { id: con.id, email: con.email, telefono: con.telefono, rol: con.rol }
              }

              let proveedorCompare = {
                codigo: this.proveedorObjet.codigo,
                razonSocial: this.proveedorObjet.razonSocial,
                sitioWeb: this.proveedorObjet.sitioWeb,
                imagen: this.proveedorObjet.imagen,
                cuit: this.proveedorObjet.cuit,
                nombreProveedor: this.proveedorObjet.nombreProveedor,
                deleteAt: this.proveedorObjet.deleteAt,
                telefono: this.proveedorObjet.telefono,
                direc: {
                  id: this.proveedorObjet.direc.id,
                  calle: this.proveedorObjet.direc.calle,
                  numCalle: this.proveedorObjet.direc.numCalle,
                  codigoPostal: this.proveedorObjet.direc.codigoPostal,
                  localidad: this.proveedorObjet.direc.localidad,
                },
                condIva: this.proveedorObjet.condIva,
                contactos: {
                  id: this.proveedorObjet.contactos.id,
                  email: this.proveedorObjet.contactos.email,
                  telefono: this.proveedorObjet.contactos.telefono,
                  rol: this.proveedorObjet.contactos.rol

                }
              }

              if (JSON.stringify(proveedorAdd) == JSON.stringify(proveedorCompare)) {
                this.editarInvalido = true;
              } else {
                this.editarInvalido = false;
                this.openScrollableContent(longContent)
                this.serviceProveedor.put(proveedorAdd, this.proveedorId).subscribe((prove) => {
                  console.log(prove)
                  this.openScrollableContent(longContent)
                  this.route.navigate(['/', 'proveedores'])
                })
                //this.openScrollableContent(longContent)
                this.route.navigate(['/', 'proveedores'])
              }

            })
          })

        })
      })
    }

  }

  limpiar() {
    this.form.setValue({
      codigoForm: "", razonSocialForm: "", rubroForm: "", sitioWebForm: "", condicionIvaForm: "", imagenForm: "",
      localidadForm: "", provinciaForm: "", paisForm: "", calleForm: "", numeroCalleForm: "1", codigoPostalForm: "1",
      cuitForm: "", telefonoForm: "", emailForm: "", nombreForm: "", apellidoForm: "", rolForm: ""
    })

  }
}
