package com.group8.ruins_of_light;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.awt.*; 
import javax.swing.*;

@SpringBootApplication
@EnableWebSocket
@CrossOrigin
public class App implements WebSocketConfigurer
{
    public static void main( String[] args )
    {
    	//createWindow();//Crear una ventana permite cerrar el servidor al cerrar dicha ventana
        SpringApplication.run(App.class, args);    
    }
    
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createPlayerHandler(), "/player")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public WebSocketPlayerHandler createPlayerHandler() {
		return new WebSocketPlayerHandler();
	}
    
    //https://www.thoughtco.com/create-a-simple-window-using-jframe-2034069
    @SuppressWarnings("unused")
	private static void createWindow() {
    	//Create and set up the window.
    	JFrame frame = new JFrame("Ruins Of Light Server");
    	
    	frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    	
    	JLabel textLabel = new JLabel("Server is on",SwingConstants.CENTER); textLabel.setPreferredSize(new Dimension(300, 100));
    	
    	frame.getContentPane().add(textLabel, BorderLayout.CENTER);
    	//Display the window
    	frame.setLocationRelativeTo(null);
    	frame.pack();
    	frame.setVisible(true);
    }
}

//https://www.youtube.com/watch?v=qDTUYkaXAEc