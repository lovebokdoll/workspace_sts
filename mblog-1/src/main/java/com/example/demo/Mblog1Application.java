package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Mblog1Application {

	public static void main(String[] args) {
		SpringApplication.run(Mblog1Application.class, args);
	}

	// Spring MVC 프레임워크에서 Cross-Origin Resource Sharing (CORS) 문제를 
	//해결하기 위한 구성을 하는 방법
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:3001");
			}
		};
	}

}
