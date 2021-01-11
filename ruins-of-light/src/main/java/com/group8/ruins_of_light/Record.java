package com.group8.ruins_of_light;

public class Record {

	private String nombre1;
	
	public String getNombre1() {
		return nombre1;
	}
	

	public void setNombre1(String nombre1) {
		this.nombre1 = nombre1;
	}

	public String getNombre2() {
		return nombre2;
	}

	public void setNombre2(String nombre2) {
		this.nombre2 = nombre2;
	}

	public int getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}



	private String nombre2;
	private int puntuacion;

	public Record() {
	}

	public Record(String nombre1, String nombre2, int puntuacion) {
		super();
		this.nombre1 = nombre1;
		this.nombre2 = nombre2;
		this.puntuacion = puntuacion;
	}



	@Override
	public String toString() {
		return nombre1 + " " + " " + nombre2 + " " + String.valueOf(puntuacion);
	}
}
