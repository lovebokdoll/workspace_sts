package com.example.demo.dao;

import java.util.List;
import java.util.Map;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

//@Repository
@Log4j2
@Service
public class MemberDao {
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;

	public List<Map<String, Object>> memberList(Map<String, Object> pMap) {
		log.info("memberList호출");
		List<Map<String, Object>> mList = sqlSessionTemplate.selectList("memberList", pMap);
		return mList;
	}

	public int memberInsert(Map<String, Object> pMap) {
		log.info("memberInsert호출");
		int result = sqlSessionTemplate.update("memberInsert", pMap);
		return result;
	}

	public int memberUpdate(Map<String, Object> pMap) {
		log.info("memberUpdate호출");
		int result = sqlSessionTemplate.update("memberUpdate", pMap);
		return result;
	}

	public int memberDelete(Map<String, Object> pMap) {
		log.info("memberDelete호출");
		int result = sqlSessionTemplate.delete("memberDelete", pMap);
		return result;
	}

}