package com.group8.ruins_of_light;

import java.io.IOException;

public class WSRoom {
	WSPlayer p0;
	WSPlayer p1;
	int nPlayers;
	int id;
	boolean playing = false;

	WSRoom(int newId) {
		nPlayers = 0;
		p0 = null;
		p1 = null;
		id = newId;
		System.out.println("Sala creada: " + id);
	}

	void Empty() throws IOException {
		p0 = null;
		p1 = null;
		nPlayers = 0;
	}

	boolean JoinRoom(WSPlayer newP) {
		boolean joined = false;
		if (p0 == null) {
			p0 = newP;
			joined = true;
		} else if (p1 == null) {
			p1 = newP;
			joined = true;
		}
		if (joined) {
			newP.roomId = id;
			nPlayers++;
			if (nPlayers > 1) {
				playing = true;
			}
		}
		return joined;
	}

	boolean RemovePlayer(WSPlayer p) throws IOException {
		if (p0.name.equals(p.name) || p1.name.equals(p.name)) {
			System.out.println(p.name + " abandonó la sala " + id);
			nPlayers--;
			return true;
		}
		return false;
	}

	boolean CheckIfCanJoin() {
		return !playing && nPlayers < 2;
	}
}
