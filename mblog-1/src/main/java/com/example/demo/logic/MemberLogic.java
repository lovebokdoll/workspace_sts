package com.example.demo.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;

import lombok.extern.log4j.Log4j2;
/**
 * 모델계층 (MemberLogic[직접 오라클과 연동하지 않음 ]+MemberDao[데이터셋])
 * 공통된 관심사 분리(AspectJ프레임워크- 오픈소스참고)
 * 트랜잭션 처리지원받음
 * @author user1
 *
 */
@Service
@Log4j2
public class MemberLogic {
	@Autowired
	private MemberDao memberDao = null;

	public int memberInsert(Map<String, Object> pMap) {
		log.info("memberInsert호출");
		int result = 0;
		log.info(pMap.toString());
		result = memberDao.memberInsert(pMap);
		return result;
	}

	public int memberUpdate(Map<String, Object> pMap) {
		log.info("memberUpdate호출");
		int result = 0;
		log.info(pMap.toString());
		result = memberDao.memberUpdate(pMap);
		return result;
	}
	public int memberDelete(Map<String, Object> pMap) {
		log.info("memberDelete호출");
		int result = 0;
		log.info(pMap.toString());
		result = memberDao.memberDelete(pMap);
		return result;
	}
	public List<Map<String, Object>> memberList(Map<String, Object> pMap) {
		log.info("memberList호출");
		log.info(pMap.toString());
		List<Map<String, Object>>mList = memberDao.memberList(pMap);
		return mList;
	}
}
