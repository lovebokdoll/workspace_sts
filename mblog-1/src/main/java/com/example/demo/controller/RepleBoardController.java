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

import com.example.demo.logic.RepleBoardLogic;
import com.google.gson.Gson;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/reple/*")
@Log4j2
public class RepleBoardController {
	@Autowired
	private RepleBoardLogic repleBoardLogic = null;
	
@GetMapping("boardList")
public String boardList(@RequestParam Map<String,Object>pMap) {
	log.info("boardList 호출");
	List<Map<String,Object>> bList =null;
	bList =repleBoardLogic.boardList(pMap);
	Gson g = new Gson();
	String temp = g.toJson(bList);
	return temp;
}

@PostMapping("boardInsert")
public String boardInsert(@RequestBody Map<String,Object>pMap) {
	log.info("boardInsert 호출");
	log.info(pMap);
	int result=0;
	result =repleBoardLogic.boardInsert(pMap);
	return String.valueOf(result);
}

}
