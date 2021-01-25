package com.group8.ruins_of_light;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@SuppressWarnings("unused")
@RestController
@RequestMapping("/")
//@EnableScheduling

public class ChatController {

	private List<Chat> chats = new ArrayList<Chat>();

	@GetMapping("chats/")
	public List<Chat> chats() {
		return chats;
	}

	@PostMapping("chats/")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean nuevoChat(@RequestBody Chat chat) {
		int count = 0;
		int indexToDelete = -1;
		for (Chat c : chats) {
			if (c.getPlayerNick().equals(chat.getPlayerNick())) {
				indexToDelete = count;
				break;
			}
			count++;
		}
		if (indexToDelete != -1) {
			chats.remove(indexToDelete);
		}
		chats.add(chat);
		return true;
	}

	/*@Scheduled(fixedDelay = 1000)
	public void CheckChats() {
		int count = 0;
		int indexToDelete = -1;

		for (Chat c : chats) {
			java.util.Date currentDate = new java.util.Date();

			if ((currentDate.getTime() - c.getDate().getTime()) > 10000) {
				indexToDelete = count;
			}
			count++;
		}

		if (indexToDelete != -1)
			chats.remove(indexToDelete);
	}*/
}