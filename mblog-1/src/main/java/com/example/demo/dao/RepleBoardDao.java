package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

@Repository
@Log4j2
public class RepleBoardDao {
@Autowired
private SqlSessionTemplate sqlSessionTemplate = null;

	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		log.info("boardList호출");
		 List<Map<String, Object>> bList = sqlSessionTemplate.selectList("boardList",pMap);
		return bList;
	}
	public int boardInsert(Map<String, Object> pMap) {
		log.info("boardInsert호출");
		int result=0;
		result = sqlSessionTemplate.update("boardInsert",pMap);
		return result;
	}

}
