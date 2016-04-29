<?php

$nombre = $_POST['nombre'];
$password= $_POST['password'];

//Tipo de archivo a retornar:
if($nombre == "dam2" && $password=="12345"){
	$resposta = '{"nombre":"'.$nombre.'","password":"'.$password.'"}'; 
}else{
	$resposta = '{"nombre":"error","password":"error"}';  
}

echo($resposta);

?>