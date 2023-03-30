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

	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		log.info("boardList호출");
		List<Map<String, Object>> bList = repleBoardDao.boardList(pMap);
		return bList;
	}

	public int boardInsert(Map<String, Object> pMap) {
		log.info("boardInsert호출");
		int result=0;
		result=	repleBoardDao.boardInsert(pMap);
		return result;
	};

}
