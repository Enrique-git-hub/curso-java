/**
 * 
 */
$(document).ready(function(){
	comunicacion().then(function()	{
			console.log("La aplicación esta en ejecución")
		})
})

async function comunicacion(){
	await 	
		$.ajax({
			type:"GET",
			dataType: "html",
			url: "./ServletTest",
			data: $.param({
				usuario: "miguel",
				tecnologia: "java"
			}),
			success: function(data){
				let parseData = JSON.parse(data)
				console.log("peticion correcta")
				console.log(parseData)
				console.log("Primer libro: "+parseData[0]["titulo"])
			} 
		})
}