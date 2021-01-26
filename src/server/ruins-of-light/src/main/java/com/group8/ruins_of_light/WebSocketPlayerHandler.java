package com.group8.ruins_of_light;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		// System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());

		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		// System.out.println("Message sent: " + node.toString());

		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("id", node.get("id").asInt());

		switch (node.get("id").asText()) {
		case "1":
			// Posicion jugador
			newNode.put("name", node.get("name").asText());
			newNode.put("x", node.get("x").asText());
			newNode.put("y", node.get("y").asText());
			newNode.put("health", node.get("health").asInt());
			newNode.put("anim", node.get("anim").asText());
			newNode.put("prog", node.get("prog").asText());
			newNode.put("flipX", node.get("flipX").asBoolean());
			newNode.put("scene", node.get("scene").asText());
			break;
		case "2":
			// Daño recibido
			newNode.put("idx", node.get("idx").asInt());
			newNode.put("damage", node.get("damage").asInt());
			newNode.put("scene", node.get("scene").asText());
			break;
		case "3":
			// Reliquia creada
			newNode.put("x", node.get("x").asInt());
			newNode.put("y", node.get("y").asInt());
			break;
		default:
			// code block
		}

		for (WebSocketSession participant : sessions.values()) {
			if (!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
}