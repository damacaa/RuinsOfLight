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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/")
@EnableScheduling
@CrossOrigin
public class RecordController {

	private List<Record> records = new ArrayList<Record>();
	
	private boolean doneReading = false;

	public RecordController() {
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
			System.out.println("Creando records.txt");
			File myObj = new File("records.txt");
			try {
				myObj.createNewFile();
			} catch (IOException e1) {
				e1.printStackTrace();
			}			
		}
	}

	private void CrearRecord(String s) {
		String[] parts = s.split("-");
		String n1 = parts[0];
		String n2 = parts[1];

		int p = Integer.parseInt(parts[2]);

		nuevoRecord(new Record(n1, n2, p));
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
}