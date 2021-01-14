package com.group8.ruins_of_light;

import java.util.Collection;
import java.util.Comparator;
import java.util.Map;
import java.util.Timer;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

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
import java.util.Arrays;
import java.util.List;
import java.util.Comparator;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

import com.group8.ruins_of_light.Record;

@RestController
@RequestMapping("/")
@EnableScheduling
@CrossOrigin
public class Controller {

	private List<Record> records = new ArrayList<Record>();
	private List<Player> players = new ArrayList<Player>();
	private boolean doneReading = false;

	public Controller() {
		// https://www.journaldev.com/709/java-read-file-line-by-line
		BufferedReader reader;
		try {
			reader = new BufferedReader(new FileReader("records.txt"));

			String line = reader.readLine();

			while (line != null) {
				CrearRecord(line);
				line = reader.readLine();
			}

			doneReading = true;

			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void CrearRecord(String s) {
		String[] parts = s.split("-");
		String n1 = parts[0];
		String n2 = parts[1];

		int p = Integer.parseInt( parts[2]);
		
		nuevoRecord(new Record(n1,n2,p));
	}
		
	


	private void EscribirRecord(Record r) {
		try {
			Files.write(Paths.get("records.txt"), (r.toString() + "\n").getBytes(), StandardOpenOption.APPEND);
		} catch (IOException e) {
			// exception handling left as an exercise for the reader
		}
	}

	@GetMapping("records/")
	public List<Record> records() {

		return records;
	}

	@GetMapping("players/")
	public List<Player> players() {
		return players;
	}

	@PostMapping("records/")
	@ResponseStatus(HttpStatus.CREATED)
	public Record nuevoRecord(@RequestBody Record record) {

		System.out.println("Nuevo record: " + record.toString());
		int contador = 0;
		boolean encontrado = false;

		for (int i = 0; i < records.size(); i++) {
			if (record.isBetter(records.get(i))) {
				contador = i;
				encontrado = true;
				break;
			}
		}

		if (encontrado) {
			records.add(contador, record);
		} else {
			records.add(record);
		}

		if (doneReading) {
			EscribirRecord(record);
		}


		return record;
	}

	@PostMapping("join/")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean unirsePartida(@RequestBody Player p) {

		System.out.println(p.getNick() + " está uniendose");

		for (Player pl : players) {
			if (pl.getNick().equals(p.getNick())) {
				System.out.println(p.getNick() + " no se ha podido unir");
				return false;
			}
		}

		System.out.println(p.getNick() + " se ha unido correctamente");

		p.setDate(new java.util.Date());// https://stackabuse.com/how-to-get-current-date-and-time-in-java/
		p.setOnline(true);
		players.add(p);

		return true;
	}

	@PostMapping("check/")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean comprobarJugador(@RequestBody Player p) {

		for (Player pl : players) {
			if (pl.getNick().equals(p.getNick())) {
				pl.setDate(new java.util.Date());
				return pl.getOnline();
			}
		}

		return false;
	}

	@Scheduled(fixedDelay = 500)
	public void CheckPayers() {
		int count = 0;
		int indexToDelete = -1;
		for (Player pl : players) {
			java.util.Date currentDate = new java.util.Date();

			if ((currentDate.getTime() - pl.getDate().getTime()) > 3000) {// (d2.getTime()-d1.getTime())
				pl.setOnline(false);
				System.out.println(pl.getNick() + " ha abandonado la partida");
				indexToDelete = count;
			}
			count++;
		}

		if (indexToDelete != -1)
			players.remove(indexToDelete);

	}
}