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

@SuppressWarnings("unused")
@RestController
@RequestMapping("/")
//@EnableScheduling
@CrossOrigin

public class PlayerController {
	private List<Player> players = new ArrayList<Player>();
	private int maxPlayers = 64;

	@GetMapping("players/")
	public List<Player> players() {
		CheckPlayers();
		return players;
	}

	@PostMapping("join/")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean unirsePartida(@RequestBody Player p) {
		if (players.size() < maxPlayers) {
			for (Player pl : players) {
				if (pl.getNick().equals(p.getNick())) {
					System.out.println(p.getNick() + " no se ha podido unir");
					return false;
				}
			}
			System.out.println(p.getNick() + " se ha unido correctamente");

			p.setChekedDate(new java.util.Date());// https://stackabuse.com/how-to-get-current-date-and-time-in-java/
			p.setOnline(true);
			players.add(p);

			return true;
		} else {
			System.out.println("El servidor está lleno");
			return false;
		}
	}

	@PostMapping("check/")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean comprobarJugador(@RequestBody Player p) {
		for (Player pl : players) {
			if (pl.getNick().equals(p.getNick())) {
				pl.setChekedDate(new java.util.Date());
				return pl.getOnline();
			}
		}
		return false;
	}

	// @Scheduled(fixedDelay = 500)
	public void CheckPlayers() {
		int count = 0;
		int indexToDelete = -1;
		for (Player pl : players) {
			java.util.Date currentDate = new java.util.Date();

			if ((currentDate.getTime() - pl.getChekedDate().getTime()) > 3000) {// (d2.getTime()-d1.getTime())
				pl.setOnline(false);
				//System.out.println(pl.getNick() + " ha abandonado la partida");
				indexToDelete = count;
			}
			count++;
		}
		if (indexToDelete != -1) {
			players.remove(indexToDelete);
		}
	}
}
