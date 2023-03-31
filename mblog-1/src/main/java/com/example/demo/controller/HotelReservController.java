package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.logic.HotelReservLogic;
import com.example.demo.logic.RepleBoardLogic;
import com.google.gson.Gson;

import lombok.extern.log4j.Log4j2;

	@RestController
	@RequestMapping("/hotel/*")
	@Log4j2
	public class HotelReservController {
		@Autowired
		private HotelReservLogic hotelReservLogic= null;
		
	@GetMapping("hotelList")
	public String hotelList(@RequestParam Map<String,Object>pMap) {
		log.info("hotelList 호출");
		List<Map<String,Object>> bList =null;
		bList =hotelReservLogic.hotelList(pMap);
		Gson g = new Gson();
		String temp = g.toJson(bList);
		return temp;
	}


}
