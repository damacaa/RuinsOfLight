package com.group8.ruins_of_light;

import java.io.IOException;
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

//@EnableScheduling
@CrossOrigin
public class WebSocketPlayerHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private Map<String, Integer> lastTimes = new ConcurrentHashMap<>();
	private int lastTime = 0;
	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		lastTimes.put(session.getId(), 0);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
		lastTimes.remove(session.getId());
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		// System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());

		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		boolean envia = true;

		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("id", node.get("id").asInt());

		switch (node.get("id").asInt()) {
		case 1:
			// Posicion jugador
			/*
			 * if (node.get("date").asInt() - lastTimes.get(session.getId()) > -500) {
			 * lastTimes.put(session.getId(), node.get("date").asInt());
			 * 
			 * } else { envia = false; //System.out.println(node.get("date").asInt()-
			 * lastTimes.get(session.getId())); }
			 */

			newNode.put("name", node.get("name").asText());
			newNode.put("x", node.get("x").asText());
			newNode.put("y", node.get("y").asText());
			newNode.put("health", node.get("health").asInt());
			newNode.put("anim", node.get("anim").asText());
			newNode.put("prog", node.get("prog").asText());
			newNode.put("flipX", node.get("flipX").asBoolean());
			newNode.put("scene", node.get("scene").asText());
			newNode.put("date", node.get("date").asInt());
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

		default:
			// code block
		}

		if (envia) {
			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
		}
	}
}