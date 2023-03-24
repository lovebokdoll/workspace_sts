package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.logic.MemberLogic;
import com.google.gson.Gson;

import lombok.extern.log4j.Log4j2;


@Log4j2
@RestController
@RequestMapping("/member/*")
public class RestMemberController {
	
	@Autowired
	private MemberLogic memberLogic;

	@PostMapping("memberInsert")
	public String memberInsert(@RequestBody Map<String, Object> pMap) { //리액트에서 body에 {객체리터럴}로 넘겨준 정보를 Map이나 VO에 담을 수 있다.
		log.info("memberInsert");
		log.info(pMap);
		//int result =0;
		int result = memberLogic.memberInsert(pMap);
		return String.valueOf(result);
	}
	@PostMapping("memberUpdate")
	public String memberUpdate(@RequestBody Map<String, Object> pMap) {
		log.info("memberUpdate");
		log.info(pMap);
		int result = memberLogic.memberUpdate(pMap);
		return String.valueOf(result);
	}
	
	@GetMapping("memberDelete")
	public String memberDelete( @RequestParam Map<String, Object> pMap) {
		log.info( "pMap = {}", pMap );
		int result = memberLogic.memberDelete(pMap);
		return String.valueOf(result);
	}

	@GetMapping( "memberList" )
	 public String memberList( @RequestParam Map<String, Object> pMap ) {
	 log.info( "pMap = {}", pMap );
	 List<Map<String, Object>> memberList = memberLogic.memberList( pMap );
	 Gson gson = new Gson();
	 String temp = gson.toJson( memberList );
	 log.info( "temp = {} ", temp );
	 return temp;
	 }
	

}
