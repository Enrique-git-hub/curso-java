package beans;

import java.sql.Date;

public class Alquiler {
	
	private int id;
	private String titulo, genero;
	private Date fechaAlquiler;
	private boolean novedad;
	
	public Alquiler(int id, String titulo, Date fechaAlquiler, String genero, boolean novedad) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.fechaAlquiler = fechaAlquiler;
		this.genero = genero;
		this.novedad = novedad;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Date getfechaAlquilerAlquiler() {
		return fechaAlquiler;
	}

	public void setfechaAlquiler(Date fechaAlquiler) {
		this.fechaAlquiler = fechaAlquiler;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public boolean isNovedad() {
		return novedad;
	}

	public void setNovedad(boolean novedad) {
		this.novedad = novedad;
	}

	@Override
	public String toString() {
		return "Alquiler [id=" + id + ", titulo=" + titulo + ", genero=" + genero + ", fechaAlquiler="
				+ fechaAlquiler + ", novedad=" + novedad + "]";
	}
	
	
}
