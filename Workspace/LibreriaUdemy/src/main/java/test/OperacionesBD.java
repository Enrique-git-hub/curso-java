package test;

import java.sql.ResultSet;
import java.sql.Statement;

import beans.Libro;
import connection.DBConnection;

public class OperacionesBD {
	
	public static void main(String[] args) {
		
//		actualizarLibro(1, "");
		listarLibro();
	}
	
	public static void actualizarLibro(int id, String genero) {
		
		DBConnection con = new DBConnection();
		String sql = "UPDATE libros SET genero = '"+genero+"' where id = "+id;
		
		try {
			Statement st = con.getConnection().createStatement();
			st.executeQuery(sql);
		} catch(Exception e) {
			System.out.println(e.getMessage());
		} finally {
			con.desconectar();
		}
	}
	
	public static void listarLibro() {
		DBConnection con = new DBConnection();
		String sql = "SELECT * FROM Libros";
		
		try {
			Statement st = con.getConnection().createStatement();
			ResultSet rs = st.executeQuery(sql);
			
			while(rs.next()) {
				int id = rs.getInt("id");
				String titulo = rs.getString("titulo");
				String genero = rs.getString("genero");
				String autor = rs.getString("autor");
				int copias = rs.getInt("copias");
				boolean novedad = rs.getBoolean("novedad");
				
				Libro libro = new Libro(id,copias,titulo,genero,autor,novedad);
				System.out.println(libro.toString());
			}
		} catch(Exception e) {
			System.out.println(e.getMessage());
		} finally {
			con.desconectar();
		}
		
	}
}
