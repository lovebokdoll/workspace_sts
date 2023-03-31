package com.example.demo.logic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.RepleBoardDao;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class RepleBoardLogic {
	@Autowired
	private RepleBoardDao repleBoardDao = null;


	public List<Map<String, Object>> qnaList(Map<String, Object> pMap) {
		log.info("qnaList호출");
		List<Map<String, Object>> qList = repleBoardDao.qnaList(pMap);
		return qList;
	};

	public int qnaInsert(Map<String, Object> pMap) {
		log.info("qnaInsert호출");
		int result=0;
		result=	repleBoardDao.qnaInsert(pMap);
		return result;
	}



}
