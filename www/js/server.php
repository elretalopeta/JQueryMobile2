<?php 

//$elementos[] = $_POST['bbdd'];

$elemento1 = "<li class='ui-li-has-thumb ui-last-child vista-detalle' id='default1'>
<a href='#detalle' class='ui-btn ui-btn-icon-right ui-icon-carat-r identificador'>
<img src='img/besta.jpg'/ id='img-default'><h2 id='nombre-default'>Sofa</h2></a>
<div id='oculto-altura' style='display:none'> 10 </div>
<div id='oculto-anchura' style='display:none'> 20 </div>
<div id='oculto-profundida' style='display:none'> 30 </div>
</li>";

$elemento2 = "<li class='ui-li-has-thumb ui-last-child vista-detalle' id='default2'>
<a href='#detalle' class='ui-btn ui-btn-icon-right ui-icon-carat-r identificador'>
<img src='img/cocina.jpg' id='img-default'/><h2 id='nombre-default'>Cocina</h2></a>
<div id='oculto-altura' style='display:none'> 50 </div>
<div id='oculto-anchura' style='display:none'> 70 </div>
<div id='oculto-profundida' style='display:none'> 20 </div>
</li>";

$elemento3 = "<li class='ui-li-has-thumb ui-last-child vista-detalle' id='default3'>
<a href='#detalle' class='ui-btn ui-btn-icon-right ui-icon-carat-r identificador'>
<img src='img/cama.jpg' id='img-default'/><h2 id='nombre-default'>Dormitorio</h2></a>
<div id='oculto-altura' style='display:none'> 80 </div>
<div id='oculto-anchura' style='display:none'> 50 </div>
<div id='oculto-profundida' style='display:none'> 5 </div>
</li>";

$elementos = array($elemento1, $elemento2, $elemento3);

$response = json_encode($elementos);

echo $response;

?>