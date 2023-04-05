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

	public List<Map<String, Object>> qnaList(Map<String, Object> pMap) {
		log.info("qnaList호출");
		List<Map<String, Object>> qList = sqlSessionTemplate.selectList("qnaList", pMap);
		return qList;
	}

	public int qnaInsert(Map<String, Object> pMap) {
		log.info("pMap = {}", pMap);
		int result = 0;// 입력이 성공했는지 유무를 담는 변수선언
		int qna_bno = 0;// insert시에 시퀀스로 채번된 속성을 담을 변수 - 여기서는 시퀀스로 채번되는 qna_bno임
		result = sqlSessionTemplate.insert("qnaInsert", pMap);

		if (result == 1) {// insert가 되면
			if (pMap.get("qna_bno") != null) {
				qna_bno = Integer.parseInt(pMap.get("qna_bno").toString());
			}
		}
		log.info("result={}", result);
		log.info("useGeneratedKeys 프로퍼티 속성값 가져오기={}", qna_bno);

		return qna_bno;
	}

	public int fileInsert(Map<String, Object> pMap) {
		log.info("fileInsert호출");
		int result = 0; // 입력이 성공했는지 담기
		result = sqlSessionTemplate.insert("fileInsert", pMap);
		return result;
	}

	public int fileUpdate(List<Map<String, Object>> pList) {
		log.info("fileUpdate호출");
		log.info("pList={}", pList);
		int result = 0; // 입력이 성공했는지 담기
		result = sqlSessionTemplate.update("fileUpdate", pList);
		return result;

	}

	public List<Map<String, Object>> fileList(Map<String, Object> pMap) {
		log.info("fileList호출");
		List<Map<String, Object>> fList = sqlSessionTemplate.selectList("fileList", pMap);
		return fList;
	}

	public List<Map<String, Object>> qnaDetail(Map<String, Object> pMap) {
		log.info("qnaDetail호출");
		List<Map<String, Object>> qList = sqlSessionTemplate.selectList("qnaDetail", pMap);
		return qList;
	}

	public void qnaHit(Map<String, Object> pMap) {
		log.info("qnaHit호출");
		log.info("pMap={}", pMap);
		pMap.put("id", "qna");
		int result = 0;
		result = sqlSessionTemplate.update("qnaHit", pMap);
		log.info("result={}", result);
	}

	public int qnaDelete(Map<String, Object> pMap) {
		log.info("pMap={}", pMap);
		int result = 0;
		result = sqlSessionTemplate.delete("fileList", pMap);
		return result;
	}

	public int qnaUpdate(Map<String, Object> pMap) {
		log.info("pMap={}", pMap);
		int result = 0;
		result = sqlSessionTemplate.update("qnaUpdate", pMap);
		return result;
	}
}
