function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }

    //Login
    $('#login').click(enviaAjaxJSON);

    //Cargar vista Menu
    $('#load-menu').click(cargarVista);

    //Cargar Imagenes (1->Panel, 2->Detalle)
    $('#home-load').click(function(){
        load(1);
    });
    $('#detalle-load').click(function(){
        load(2);
    });

    //Guardar imagenes panel
    $('#guardar').click(guardar);

    //Volver al menu ??
    $('#return').click(vaciar);

    //Ir a la vista detalle
    $('.vista-detalle').click(detalle);
    
    //Accion cuenta atras
    $("#botonContar").click(cuentaAtras);

    //Accion nivel
    $("#menuNivel").click(nivel);

     //Esconder panel (boton add) (Nivel, Cuenta atras)
     $('#menuNivel').click(hiddenPanel);
     $('#menuCuenta').click(hiddenPanel);

     //Mostrar boton panel (boton add)
     $('#menuHome').click(showPanel);

     //Limpia datos vista detalle
     $('#backButton').click(clean);

     //Volver al index
     $('#logout').click(logout);

     //??
     //$('#menunivel').click(goNivel);
      
}


function enviaAjaxJSON() {
    var usu = $("#usu").val();
    var password = $("#password").val();
    $.ajax({
        type : "POST",
        url : "http://localhost/IKEA/www/js/login.php",
        dataType : "json",
        data: { nombre: usu, password: password},
        success : function(respJSON) {
            var usu =respJSON.nombre;
            var password =respJSON.longitud;                       
                if(usu != "error" && password != "error"){
                    jQuery.mobile.changePage("#menu");
                    alert("Datos Correctos");
                }
            else{
                alert("Datos incorrectos");           
            }
        }
    });
    return false;
}

function logout(){
    jQuery.mobile.changePage("#index");
}

function clean(){
    $('#mainHome').html("");
}

function showPanel(){
    $('#panelButton').css("display","block");
}

function hiddenPanel(){
    $('#panelButton').css("display","none");
}

function goNivel(){
    $.mobile.navigate( "#nivel" );
    console.log($.mobile.navigate( "#nivel" ));
}

var idInterv;
var idOut;
function cuentaAtras() {  
   window.clearInterval(idInterv);
   window.clearTimeout(idOut);
   contador = $("#tiempoAContar").val();
   if ($.isNumeric($("#tiempoAContar").val())){
        $("#cuentaVisible").html($("#tiempoAContar").val());
        idOut = setTimeout(avisar, $("#tiempoAContar").val() * 1000);
        idInterv = setInterval(function(){ if(contador > 0){
        contador --;
        $("#cuentaVisible").html(contador);  
        }}, 1000);
    }else{
      alert("Solo se admiten numeros");
    }
}


function avisar(){
    navigator.notification.beep(2);
    navigator.notification.vibrate(1000);
}

function nivel(){
window.addEventListener('deviceorientation',controlOrientation,false ); 
}

function controlOrientation(event) {
    if($("#flip-1").val() == "on"){
        var result = parseInt(Math.abs(Math.round(event.beta))) - parseInt($("#imagenNivel").width()/2);;
        $("#imagenNivel").css("left", result); 
    }
    if($("#flip-2").val() == "on" && event.beta !=90){
        navigator.notification.beep(1);
    }
}

function cargarVista(){
$('#mainHome').append("<li data-role='list-divider' class='ui-li-divider ui-bar-inherit ui-first-child' id='1'>Comedor</li><li data-role='list-divider' class='ui-li-divider ui-bar-inherit ui-first-child' id='2'>Cocina</li><li data-role='list-divider' class='ui-li-divider ui-bar-inherit ui-first-child' id='3'>Dormitorio</li>");
    $.ajax({        
        type: "GET",
        url: "http://localhost/IKEA/www/js/server.php", 
        dataType: "json",
        data: {}, 
        success: function (response) {
            $("#1").after(response[0]);
            $("#2").after(response[1]);
            $("#3").after(response[2]);
            cargarLocalStorage();
            $('.vista-detalle').click(detalle);
        }, error: function(response, error){
             console.log("Error "+ response.responseText);
        }
    });
}


function cargarLocalStorage(){
    for(var i = 1; i < localStorage.length; i++){
        var objeto = JSON.parse(localStorage.getItem("item"+i));
        var elemento = $('<li class="ui-li-has-thumb ui-last-child vista-detalle" id="item'+i+'"><a href="#detalle" class="ui-btn ui-btn-icon-right ui-icon-carat-r identificador"><img src="'+objeto[5][0]+'"/><h2>'+objeto[0]+'</h2></a></li>');
        $("#"+objeto[1]).after(elemento);
    }  
}

var imagen;
function changePage(){};
function onFail(){}
function load(type){
switch(type){
    case 1:
    navigator.camera.getPicture(homePictureSuccess, onFail, {
         quality: 100
    , saveToPhotoAlbum: true
        ,destinationType: navigator.camera.DestinationType.DATA_URL
        , sourceType: navigator.camera.PictureSourceType.CAMERA
    });

    break;
    case 2:
    navigator.camera.getPicture(detallePictureSuccess, onFail, {
         quality: 100
    , saveToPhotoAlbum: true
        ,destinationType: navigator.camera.DestinationType.DATA_URL
        , sourceType: navigator.camera.PictureSourceType.CAMERA
    });

    break;

   }
};

var id = 0; //key para saber imagen slider (0-2)
var auxiliar = [];
var defaultArray = [];
function detallePictureSuccess(imageData) {
    //console.log(id);
    if(id>2)id = 0;
    var imagenDetalle = $('#img-detalle-'+id);
    imagenDetalle.attr('src', "data:image/jpeg;base64," + imageData);

    try{
        var objetoRemplazar = JSON.parse(localStorage.getItem(idItem));
        objetoRemplazar[5][id] = imagenDetalle.attr('src');
        localStorage.setItem("item"+key, JSON.stringify(objetoRemplazar));
    }catch(err){
        auxiliar[tipo] = imagenDetalle.attr('src');      
        defaultArray[tipo] = array[tipo];
    }

   id++;
    

}

var imagen;
function homePictureSuccess(imageData) {   
    imagen = $('#img');
    imagen.attr('src', "data:image/jpeg;base64," + imageData);
}

var key = 1;
function guardar(){

    if(localStorage.getItem("key") == null){
        localStorage.setItem("key", 1);
    }else{  
      key++;
        localStorage.setItem("key", key);
    }

    var nombre = $('#nombre').val();
    var genero = $('#ubicacion').val();
    var anchura = $('#anchura').val();
    var altura = $('#altura').val();
    var profundida = $('#profundidad').val();
    var imagenes = [imagen.attr('src')];
    var objeto = [nombre, genero, anchura, altura, profundida, imagenes];
   

    var elemento = $('<li class="ui-li-has-thumb ui-last-child vista-detalle" id="item'+key+'"><a href="#detalle" class="ui-btn ui-btn-icon-right ui-icon-carat-r identificador"><img src="'+imagen.attr('src')+'"/><h2>'+nombre+'</h2></a></li>');
    localStorage.setItem("item"+key, JSON.stringify(objeto));
    var id = $('#ubicacion').val(); //seleccionar el campo tipo comedor/cocina/dormitorio
    $("#"+id).after(elemento); //añado el elemento a la lista
    $('.vista-detalle').click(detalle); //remarco para que me haga esta funcion en los elementos creados
    
    $('#nombre').val("");
    $('#anchura').val("0");
    $('#anchura').val("0");
    $('#altura').val("0");
    $('#profundidad').val("0");
    $('#img').attr("src", "img/default.png");

};
function vaciar(){
    $("#img-detalle-2").attr("src", "img/default.png");
    $("#img-detalle-3").attr("src", "img/default.png");
}

var idItem = 0;
var tipo;
function detalle(){

    idItem = $(this).attr('id');

    if(idItem == "default1" || idItem == "default2" || idItem == "default3"){
        tipo = idItem.substr(7,8);
        var imagen = $(this).find("#img-default").attr('src');
        var nombre = $(this).find("#nombre-default").html();
        var anchura = $(this).find("#oculto-anchura").html();
        var altura = $(this).find("#oculto-altura").html();
        var profundidad = $(this).find("#oculto-profundida").html();
        $("#img-detalle-0").attr("src", imagen);
        $("#nombre-detalle").html("Nombre:"+ nombre);
        $("#anchura-detalle").html("Anchura: "+anchura);
        $("#altura-detalle").html("Altura: "+altura);
        $("#profundidad-detalle").html("Profundidad: "+profundidad);

        auxiliar[tipo] = imagen.attr('src');      
        defaultArray[tipo] = array[tipo];
        id = 1;

    }else{
        var objeto = JSON.parse(localStorage.getItem(idItem));
        $("#nombre-detalle").html("Nombre: "+objeto[0]);
        $("#anchura-detalle").html("Anchura: "+objeto[2]);
        $("#altura-detalle").html("Altura: "+objeto[3]);
        $("#profundidad-detalle").html("Profundidad: "+objeto[4]);
        if(objeto[5].length != 3){
            id = objeto[5].length;
        }
        cargarImagenes(objeto);
    }



}

function cargarImagenes(objeto){
  
    switch(objeto[5].length){
        case 1:
          $("#img-detalle-0").attr("src", objeto[5][0]);
        break;

        case 2:
            $("#img-detalle-0").attr("src", objeto[5][0]);
            $("#img-detalle-1").attr("src", objeto[5][1]);
        break;
        case 3:
            $("#img-detalle-0").attr("src", objeto[5][0]);
            $("#img-detalle-1").attr("src", objeto[5][1]);
            $("#img-detalle-2").attr("src", objeto[5][2]);

        break;
    }

}

function home(){

    //window.location.href='../vistas/home.html'";
    /*
    $( ".selector" ).pagecontainer( "change" );
    $( ":mobile-pagecontainer" ).pagecontainer("change", "../vistas/home.html");

//pagecontainer("vistas/home.html");
    //console.log($.mobile.changePage( "#p2"));
    //$( ":mobile-pagecontainer" ).pagecontainer( "change", "#p2", { role: "dialog" } );
    //$.mobile.loadPage( "../vistas/home.html");
    //$.mobile.changePage( "#p2", { transition: "slideup", changeHash: false });
    //jQuery.mobile.changePage()
    */
}
document.addEventListener("app.Ready", onAppReady, false) ;
