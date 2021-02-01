package com.group8.ruins_of_light;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@CrossOrigin
public class WebSocketPlayerHandler extends TextWebSocketHandler {

	// private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private Map<String, WSPlayer> players = new ConcurrentHashMap<>();
	private List<WSPlayer> waitList = new ArrayList<WSPlayer>();

	private List<WSRoom> rooms = new ArrayList<WSRoom>();
	private int nextRoomId = 0;

	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		WSPlayer p = new WSPlayer(session);
		players.put(session.getId(), p);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		WSPlayer p = players.get(session.getId());
		System.out.println("Sesión cerrada: " + p.name);

		// Saca al jugador de la partida
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("id", -1);
		for (WSPlayer p1 : players.values()) {
			if (p.roomId == p1.roomId && p != p1) {
				p1.roomId = -1;
				if (p1.session.isOpen()) {
					p1.session.sendMessage(new TextMessage(newNode.toString()));
				}
			}
		}
		if (waitList.contains(p)) {
			waitList.remove(p);
		}
		players.remove(session.getId());
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload());

		if (node.get("id").asInt() == 0) {
			// Ready to join room
			WSPlayer p1 = players.get(session.getId());
			p1.name = node.get("name").asText();
			if (waitList.size() > 0) {
				System.out.println("Hay suficiente gente: " + waitList.toString());
				// Find friend
				p1.roomId = nextRoomId;
				WSPlayer p0;

				ObjectNode newNode = mapper.createObjectNode();
				newNode.put("id", 0);
				newNode.put("room", nextRoomId);
				newNode.put("isOrange", true);

				for (WSPlayer p : waitList) {
					if (p != p1) {
						p0 = p;
						p0.roomId = nextRoomId;
						waitList.remove(p0);
						p0.session.sendMessage(new TextMessage(newNode.toString()));
						System.out.println(
								p1.name + " y " + p0.name + " se han unido correctamente a la sala " + nextRoomId);
						break;
					}
				}

				newNode.put("isOrange", false);
				p1.session.sendMessage(new TextMessage(newNode.toString()));

				nextRoomId++;
			} else {
				// Add to waitlist
				if (!waitList.contains(p1)) {
					waitList.add(p1);
				}
			}
		} else if (node.get("id").asInt() == -1) {
			WSPlayer p = players.get(session.getId());
			for (WSPlayer p1 : players.values()) {
				if (p.roomId == p1.roomId && p != p1) {
					p1.roomId = -1;
				}
			}
			p.roomId = -1;
		} else {
			sendOtherParticipants(session, node);
		}
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {
		String sId = session.getId();
		WSPlayer player = players.get(sId);
		boolean envia = true;

		ObjectNode newNode = mapper.createObjectNode();

		if (player.roomId == -1) {
			newNode.put("id", -1);
			player.session.sendMessage(new TextMessage(newNode.toString()));
		} else {
			newNode.put("id", node.get("id").asInt());
			switch (node.get("id").asInt()) {
			case 1:
				// Posicion jugador
				int time = node.get("date").asInt() - players.get(sId).lastTime;
				if (time > 0) {
					float x = Float.parseFloat(node.get("x").asText());
					float y = Float.parseFloat(node.get("y").asText());

//					Queda pendiente la comprobación de teletransportación o velocidad excesiva
//					if (players.get(sId).lastPosition.distance(x, y) < 2 * time) {
//						if (player.cheats > 0) {
//							player.cheats--;
//						}
//					} else { // Trampas?
//						System.out.println(player.name + " está haciendo trampas.");
//						if (player.cheats > 0) {
//							player.roomId = -1;
//						} else {
//							player.cheats++;
//						}
//					}

					player.lastTime = time;
					player.lastPosition.x = x;
					player.lastPosition.y = y;

					players.get(sId).lastTime = node.get("date").asInt();
					newNode.put("name", node.get("name").asText());
					newNode.put("x", x);
					newNode.put("y", y);
					newNode.put("health", node.get("health").asInt());
					newNode.put("anim", node.get("anim").asText());
					newNode.put("prog", node.get("prog").asText());
					newNode.put("flipX", node.get("flipX").asBoolean());
					newNode.put("scene", node.get("scene").asText());
					newNode.put("date", node.get("date").asInt());

				} else {
					envia = false;
					System.out.println(node.get("date").asInt() - players.get(sId).lastTime);
				}
				break;
			case 2:
				// Daño recibido
				newNode.put("eId", node.get("eId").asInt());
				newNode.put("damage", node.get("damage").asInt());
				newNode.put("scene", node.get("scene").asText());
				break;
			case 3:
				// Reliquia creada
				newNode.put("x", node.get("x").asInt());
				newNode.put("y", node.get("y").asInt());
				break;
			case 4:
				// Entidad creada
				newNode.put("eId", node.get("eId").asInt());
				newNode.put("type", node.get("type").asInt());
				newNode.put("x", node.get("x").asInt());
				newNode.put("y", node.get("y").asInt());
				newNode.put("scene", node.get("scene").asText());
				break;
			case 5:
				// Reliquia obtenida
			default:
				// code block
			}

			if (envia) {
				for (WSPlayer p : players.values()) {
					if (player.roomId == p.roomId && player != p) {
						p.session.sendMessage(new TextMessage(newNode.toString()));
					}
				}
			}
		}
	}
}