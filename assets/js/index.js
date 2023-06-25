const main = document.getElementById("main");
const body=document.querySelector("body");
const habitaciones=document.getElementById("floatingPassword1");
const min_metros=document.getElementById("floatingPassword2");
const max_metros=document.getElementById("floatingPassword3");
const buscar=document.getElementById("buscar");
const total=document.getElementById("total_propiedades");
const limpiar=document.getElementById("limpiar");
let llenado=true;
let total_habitaciones=null;
let total_min=null;
let total_max=null;
let html="";
let html_filtro="";
let contador=0;
const propiedadesJSON = [
    {
        name: "Casa de campo",
        description: "Un lugar ideal para descansar de la ciudad",
        src:
        "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
        rooms: 2,
        m: 170
    },
    {
        name: "Casa de playa",
        description: "Despierta tus días oyendo el oceano",
        src:
        "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
        rooms: 2,
        m: 130
    },
    {
        name: "Casa en el centro",
        description: "Ten cerca de ti todo lo que necesitas",
        src:
        "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
        rooms: 1,
        m: 80
    },
    {
        name: "Casa rodante",
        description: "Conviertete en un nómada del mundo sin salir de tu casa",
        src:
        "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
        rooms: 1,
        m: 6
    },
    {
        name: "Departamento",
        description: "Desde las alturas todo se ve mejor",
        src:
        "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
        rooms: 3,
        m: 200
    },
    {
        name: "Mansión",
        description: "Vive una vida lujosa en la mansión de tus sueños ",
        src:
        "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
        rooms: 5,
        m: 500
    }
];

function llenado_principal() {
    if(llenado){
        for(let casa of propiedadesJSON){
            html+=`
            <div class="card" style="width: 18rem;">
                <img src=${casa.src} class="card-img-top" style="height: 10rem" alt="imagen casa ${casa+1}">
                <div class="card-body">
                    <h5 class="card-title">${casa.name}</h5>
                    <h6 class="card-text">Metros cuadrados: ${casa.m} mts.</h6>
                    <h6 class="card-text">Habitaciones: ${casa.rooms}</h6>
                    <p class="card-text">${casa.description}</p>
                    <a href="#" class="btn btn-primary">Ver mas</a>
                </div>
            </div>
            `
            };
            main.innerHTML=html;
            total.innerHTML="Total: "+ propiedadesJSON.length;
            llenado=false;
    }else{
        main.innerHTML=html;
        total.innerHTML="Total: "+ propiedadesJSON.length;
    }

}
llenado_principal();

function recorrer_arreglo(){
    for(let casa of propiedadesJSON){
        if((total_min<=(casa.m)<= total_max) && (total_habitaciones===(casa.rooms))){
            html_filtro+=`
            <div class="card" style="width: 18rem;">
                <img src=${casa.src} class="card-img-top" style="height: 10rem" alt="imagen casa ${casa+1}">
                <div class="card-body">
                    <h5 class="card-title">${casa.name}</h5>
                    <h6 class="card-text">Metros cuadrados: ${casa.m} mts.</h6>
                    <h6 class="card-text">Habitaciones: ${casa.rooms}</h6>
                    <p class="card-text">${casa.description}</p>
                    <a href="#" class="btn btn-primary">Ver mas</a>
                </div>
            </div>
            `
            contador++;
            console.log(typeof casa.m);
        }
    }
};
habitaciones.addEventListener("change", (event)=>{
    total_habitaciones=Number(event.target.value);
});
min_metros.addEventListener("change", (event)=>{
    total_min=Number(event.target.value);
});
max_metros.addEventListener("change", (event)=>{
    total_max=Number(event.target.value);
});

function mayor_y_menor(mayor, menor){
    if(mayor<menor){
        let nuevo_mayor=menor;
        let numero_menor=mayor;
        return nuevo_mayor, numero_menor;
    }
};

buscar.addEventListener("click", ()=>{
    if(total_habitaciones==null || total_max==null || total_min==null){
        alert("faltan campos requeridos.")
        return 0;
    }else{
        mayor_y_menor(total_max,total_min);
        recorrer_arreglo();
        main.innerHTML=html_filtro;
        total.innerHTML="Total: "+ contador;
        }
    if(contador==0){
            main.innerHTML="<h5>No hay propiedades que coincidan con la busqueda.</h5>"
    }
    html_filtro="";
    contador=0;
});
limpiar.addEventListener("click", (event)=>{
    llenado_principal();
});