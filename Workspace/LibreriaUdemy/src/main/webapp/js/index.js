/**
 * 
 */

var username = new URL(location.href).searchParams.get("username")
var user

$(document).ready(function(){
	$(function (){
		$(`[data-toggle="tooltip"]`).tooltip();
	})
	
	getUsuario().then(function() {
		$("#mi-perfil-btn").attr("href","profile.html?username="+username)
		
		$("#user-saldo").html(user.saldo.toFixed(2)+"€")
	})
	
	getLibros(false,"ASC")
	
	$("#ordenar-genero").click(ordenarLibros)
	
	$("#form-login").submit(function(event){
		event.preventDefault();
		autenticarUsuario();
	})
	
	$("#form-register").submit(function(event){
		event.preventDefault();
		registrarUsuario();
	})
})

function alquilarLibros(id,precio){
	$.ajax({
					type:"GET",
					dataType: "html",
					url: "./ServletLibroAlquilar",
					data: $.param({
						id:id,
						username:username
					}),
					success: function(result){
						let parseResult = JSON.parse(result);
						
						if (parseResult != false){
							restarDinero(precio).then(function(){
								location.reload()
							})
						 }
						else
						{
							console.log("Error en la reserva de la pelicula")
						}
					} 
				})
}

async function restarDinero(precio) {
	await $.ajax({
						type:"GET",
						dataType: "html",
						url: "./ServletUsuarioRestarDinero",
						data: $.param({
							username:username,
							saldo: parseFloat(user.saldo - precio)
						}),
						success: function(result){
							let parseResult = JSON.parse(result);
							
							if (parseResult != false){
								console.log("saldo actualizado")
							 }
							else
							{
								console.log("Error en la reserva de la pelicula")
							}
						} 
					})
}

function ordenarLibros(){
	if ($("#icono-ordenar").hasClass("fa-sort")) {
		getLibros(true,"ASC")
		$("#icono-ordenar").removeClass("fa-sort")
		$("#icono-ordenar").addClass("fa-sort-down")
	}else if ($("#icono-ordenar").hasClass("fa-sort-down")) {
		getLibros(true,"DESC")
		$("#icono-ordenar").removeClass("fa-sort-down")
		$("#icono-ordenar").addClass("fa-sort-up")
	}else if ($("#icono-ordenar").hasClass("fa-sort-up")) {
		getLibros(false,"ASC")
		$("#icono-ordenar").removeClass("fa-sort-up")
		$("#icono-ordenar").addClass("fa-sort")
}
}

async function getUsuario(){
	await $.ajax({
				type:"GET",
				dataType: "html",
				url: "./ServletUsuarioPedir",
				data: $.param({
					username: username
				}),
				success: function(result){
					let parseResult = JSON.parse(result);
					
					if (parseResult != false){
						user = parseResult
					 }
					else
					{
						console.log("Error al recuperar los datos del usuario")
					}
				} 
			})
}

function getLibros(ordenar,orden){
	$.ajax({
			type:"GET",
			dataType: "html",
			url: "./ServletLibroListar",
			data: $.param({
				ordenar: ordenar,
				orden: orden
			}),
			success: function(result){
				let parseResult = JSON.parse(result);
						
				if (parseResult != false){
					mostrarLibros(parseResult)
				 }
				else
				{
					console.log("Error al recuperar los datos de los libros")
				}
			} 
		})
}

function mostrarLibros(libros){
	let contenido = "";
	
	$.each(libros, function(index, libro) {
		
		libro = JSON.parse(libro)
		let precio = 0
		
		if (libro.copias > 0) {
			
			if (user.premium){
				
				if (libro.novedad){
					precio = (2 - (2 * 0.1))
				}
				else{
					precio = (1 -(1 * 0.1))
				}
			}
			else{
				if (libro.novedad){
					precio = 2
				}
				else{
					precio = 1
				}
			}
		}
		
		contenido += '<tr><th scope="row">' + libro.id + '</th>' + 
		'<td>' + libro.titulo + '</td>' +
		'<td>' + libro.genero + '</td>' +
		'<td>' + libro.autor + '</td>' +
		'<td>' + libro.copias + '</td>' +
		'<td><input type="checkbox" name="novedad" id="novedad>' + libro.id + '" disabled '
		
		if (libro.novedad) {
			contenido += 'checked'
		}
		contenido += '></td>' +
		'<td>' + precio + '</td>' +
		'<td><button onclick="alquilarLibros(' + libro.id + ',' + precio + ');" class="btn btn success"';
		if (user.saldo < precio){
			contenido += '"disabled"';
		}
		
		contenido += '>Reservar</button></td></tr>';
		
	})
	
	$("#libros-tbody").html(contenido);
}

function autenticarUsuario(){
	let username = $("#usuario").val();
	let contrasena = $("#contrasena").val();
	console.log(username, ' ', contrasena)
	
	$.ajax({
			type:"GET",
			dataType: "html",
			url: "./ServletUsuarioLogin",
			data: $.param({
				username: username,
				contrasena: contrasena
			}),
			success: function(result){
				let parseResult = JSON.parse(result);
					
				if (parseResult != false){
					$("#login-error").addClass("d-none");
					let username = parseResult['username'];
					document.location.href = "home.html?username=" + username;
 				}
				else
				{
					$("#login-error").removeClass("d-none");
				}
			} 
		})
}

function registrarUsuario(){
	let username = $("#input-username").val();
	let contrasena = $("#input-contrasena").val();
	let contrasenaConfirm = $("#input-contrasena-repeat").val();
	let nombre = $("#input-nombre").val();
	let apellidos = $("#input-apellidos").val();
	let email = $("#input-email").val();
	let saldo = $("#input-saldo").val();
	let premium = $("#input-premium").prop("checked");
	
	if (contrasena == contrasenaConfirm) {
		
		$.ajax({
					type:"GET",
					dataType: "html",
					url: "./ServletUsuarioRegister",
					data: $.param({
						username: username,
						contrasena: contrasena,
						nombre: nombre,
						apellidos: apellidos,
						email: email,
						saldo: saldo,
						premium: premium
					}),
					success: function(result){
						let parseResult = JSON.parse(result);
						
						if (parseResult != false){
							$("#register-error").addClass("d-none");
							let username = parseResult['username'];
							document.location.href = "home.html?username=" + username;
							}
							else
							{
								$("#register-error").removeClass("d-none");
								$("#register-error").html("Error en el registro de usuario");
							}
						
					} 
				})
		
	}else{
		$("#register-error").removeClass("d-none");
		$("#register-error").html("Las contraseñas no coinciden");
	}
}