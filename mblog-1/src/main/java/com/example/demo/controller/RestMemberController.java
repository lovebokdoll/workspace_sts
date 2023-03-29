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
	public String memberInsert(@RequestBody Map<String, Object> pMap) { // 리액트에서 body에 {객체리터럴}로 넘겨준 정보를 Map이나 VO에 담을 수
																		// 있다.
		log.info("memberInsert");
		log.info(pMap);
		// int result =0;
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
	public String memberDelete(@RequestParam Map<String, Object> pMap) {
		log.info("pMap = {}", pMap);
		int result = memberLogic.memberDelete(pMap);
		return String.valueOf(result);
	}

	// localhost:8000/member/memberList
	// 리액트 프로젝트에서 닉네임 중복검사시 사용하는 메소드 구현
	// 리액트에서 넘기는 파라미터는 {MEM_NICKNAME:memInfo[key],type:'overlap'}
	@GetMapping("memberList")
	public String memberList(@RequestParam Map<String, Object> pMap) {
		log.info("pMap = {}", pMap);
		String temp = null;
		List<Map<String, Object>> memberList = memberLogic.memberList(pMap);
		log.info(memberList);
		// 파라미터로 넘어온 키위가 회원집합에 존재하면 조회결과가 있다.
		//temp에 문자열이 들어있으면 자바스크립트쪽에서는 true로 판정된다.- 주의할것
		if (memberList.size() > 0) {
			Gson gson = new Gson();
			temp = gson.toJson(memberList);
		} else {
			temp = "0";
		}
		log.info("temp = {} ", temp);
		return temp;
	}

}
