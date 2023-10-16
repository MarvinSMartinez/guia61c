//Marvin Sigfredo Martínez Hernández
//MH18083
//Grupo 03
var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='eliminar'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	   case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";	
	  var catcode;
	  

	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price"); 
	  Accion = document.getElementsByClassName("eliminar"); 


	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
      ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		Accion[nfila].innerHTML= "<button>Eliminar</button>"
		Accion[nfila].firstChild.setAttribute("onclick","eliminarProd('"+productos[nfila].id+"');");
		}

	}

function obtenerProductos() {
	  fetch('https://api-generator.retool.com/n3BzSM/productos')
            .then(res=>res.json())
            .then(data=>{
            	productos=data;
            	productos.forEach(
            	function(producto){
            		producto.price=parseFloat(producto.price)
            		});
            	listarProductos(data)})
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}
function guardarDatos(){
	const imagen = document.getElementById('image').value;
	const precio = document.getElementById('price').value;
	const precioNumerico = parseFloat(precio);
   //const precio=234
   const categorias = document.getElementById('category').value;
   const descripcionProd = document.getElementById('description').value;
   const titulo = document.getElementById('title').value;

   //var precioNumeric=parseFloat.precio;

	var miproducto={
	image:imagen,
	price:precio,
	title:titulo,
	description:descripcionProd,
	category:categorias,
	}

	console.log(precioNumerico)

	var addresult;
	fetch('https://api-generator.retool.com/n3BzSM/productos',
	{ method:"POST",
	  body: JSON.stringify(miproducto),
	  headers: {
	     'Accept': 'application/json',
	     'Content-type': 'application/json; charset=UTF-8',
	  }
	})
	.then(response=>response.json())
	.then(data=>addresult=data);

}

var idp
function eliminarProd(idp){
	var delresult;
	fetch('https://api-generator.retool.com/n3BzSM/productos/'+idp,
	{ method:"DELETE"})
	.then(response=>response.json())
	.then(data=>delresult=data);

	delresult;
}