package com.group8.ruins_of_light;

import org.springframework.web.socket.WebSocketSession;

public class WSPlayer {
	public WebSocketSession session;
	public String name;
	
	public int lastTime;
	public Vector2 lastPosition;
	public int roomId;
	
	public int cheats = 0;

	WSPlayer(WebSocketSession wbs) {
		name = "";
		lastTime = 0;
		lastPosition = new Vector2();
		roomId = -1;
		session = wbs;
	}
}
