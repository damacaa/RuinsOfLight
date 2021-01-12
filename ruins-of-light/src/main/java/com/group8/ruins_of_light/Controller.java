package com.group8.ruins_of_light;

import java.util.Collection;
import java.util.Map;
import java.util.Timer;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
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

import com.group8.ruins_of_light.Record;

@RestController
@RequestMapping("/")
@EnableScheduling
public class Controller {

	private List<Record> records = new ArrayList<Record>();
	private List<Player> players = new ArrayList<Player>();

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
		System.out.println( "Nuevo record: "+ record.toString());
		
		records.add(record);
		
		return record;
	}
	
	@PostMapping("join/")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean unirsePartida(@RequestBody Player p) {
		
		System.out.println(p.getNick() + " está uniendose");
		
		for (Player pl : players) {
			if(pl.getNick().equals(p.getNick())) {
				System.out.println(p.getNick() + " no se ha podido unir");
				return false;
			}
        }
		
		System.out.println(p.getNick() + " se ha unido correctamente");
		
		p.setDate(new java.util.Date());//https://stackabuse.com/how-to-get-current-date-and-time-in-java/
		p.setOnline(true);
		players.add(p);
		
		return true;
	}
	
	@PostMapping("check/")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean comprobarJugador(@RequestBody Player p) {
		
		for (Player pl : players) {
			if(pl.getNick().equals(p.getNick())) {
				pl.setDate(new java.util.Date());
				return pl.getOnline();
			}
        }
		
		return false;
	}
	
	@Scheduled(fixedDelay=500)
    public void CheckPayers() {
		int count = 0;
		int indexToDelete = -1;
		for (Player pl : players) {
			java.util.Date currentDate = new java.util.Date();

			if((currentDate.getTime() - pl.getDate().getTime())>1000) {//(d2.getTime()-d1.getTime())
				pl.setOnline(false);
				System.out.println(pl.getNick() + " ha abandonado la partida");
				indexToDelete = count;
			}
			count++;
        }
		
		if(indexToDelete != -1)
		players.remove(indexToDelete);
		
    }

	/*@PutMapping("/{id}")
	public ResponseEntity<Record> actulizaRecord(@PathVariable long id, @RequestBody Record recordActualizado) {

		Record record;

		if (record != null) {

			recordActualizado.SetId(id);
			// records.put(id, recordActualizado);

			return new ResponseEntity<>(recordActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}*/

	/*@GetMapping("/{id}")
	public ResponseEntity<Record> getRecord(@PathVariable long id) {

		Record record; // = records.get(id);

		if (record != null) {
			return new ResponseEntity<>(record, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}*/

//	  @DeleteMapping("/{id}") public ResponseEntity<Record>
//	  borraRecord(@PathVariable long id) {
//	  
//	  Record record = records.remove(id);
//	  
//	  if (record != null) { return new ResponseEntity<>(record, HttpStatus.OK); }
//	  else { return new ResponseEntity<>(HttpStatus.NOT_FOUND); } }
//	 
}
