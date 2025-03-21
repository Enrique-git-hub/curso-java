package beans;

public class Libro {
	
	private int id, copias;
	private String titulo, genero, autor;
	private boolean novedad;

	public Libro(int id, int copias, String titulo, String genero, String autor, boolean novedad) {
		super();
		this.id = id;
		this.copias = copias;
		this.titulo = titulo;
		this.genero = genero;
		this.autor = autor;
		this.novedad = novedad;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCopias() {
		return copias;
	}

	public void setCopias(int copias) {
		this.copias = copias;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public boolean isNovedad() {
		return novedad;
	}

	public void setNovedad(boolean novedad) {
		this.novedad = novedad;
	}

	@Override
	public String toString() {
		return "Libro [id=" + id + ", copias=" + copias + ", titulo=" + titulo + ", genero=" + genero + ", autor="
				+ autor + ", novedad=" + novedad + "]";
	}
}
