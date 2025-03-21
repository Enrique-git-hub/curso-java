/**
 * 
 */
package controllers;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import beans.Alquiler;
import beans.Usuario;
import connection.DBConnection;

/**
 * 
 */
public class AlquilerController implements IAlquilerController {

	@Override
	public String listarAlquileres(String username) {
		Gson gson = new Gson();
		
		DBConnection con = new DBConnection();
		
		String sql = "SELECT l.id, l.titulo, l.genero, l.novedad, a.fechaAlquiler FROM libros l INNER JOIN alquiler a ON l.id = a.id INNER JOIN usuarios u ON a.username = u.username WHERE a.username = '"+username+"'";
		
		List<String> alquileres = new ArrayList<String>();
		
		try {
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while (rs.next()) {
				int id = rs.getInt("id");				
				String titulo = rs.getString("titulo");
				String genero = rs.getString("genero");
				boolean novedad = rs.getBoolean("novedad");
				Date fechaAlquiler = rs.getDate("fechaAlquiler");
				
				Alquiler alquiler = new Alquiler(id,titulo,fechaAlquiler,genero,novedad);
				alquileres.add(gson.toJson(alquiler));
			}
		} catch(Exception e) {
			System.out.println(e.getMessage());
		} finally {
			con.desconectar();
		}
		
		return gson.toJson(alquileres);
	}

}
