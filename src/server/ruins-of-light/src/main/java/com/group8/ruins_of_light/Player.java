package com.group8.ruins_of_light;

public class Player {

	private String nick;
	private boolean online;
	private java.util.Date chekedDate = new java.util.Date();

	public Player() {

	}

	public Player(String nick) {
		this.nick = nick;
		
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public java.util.Date getChekedDate() {
		return chekedDate;
	}

	public void setChekedDate(java.util.Date date) {
		this.chekedDate = date;
	}
	
	public boolean getOnline() {
		return online;
	}

	public void setOnline(boolean online) {
		this.online = online;
	}
}
