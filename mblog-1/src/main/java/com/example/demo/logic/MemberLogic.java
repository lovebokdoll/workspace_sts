package com.example.demo.logic;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;
/**
 * 모델계층 (MemberLogic[직접 오라클과 연동하지 않음 ]+MemberDao[데이터셋])
 * 공통된 관심사 분리(AspectJ프레임워크- 오픈소스참고)
 * 트랜잭션 처리지원받음
 * @author user1
 *
 */
@Service
public class MemberLogic {
	Logger logger = LoggerFactory.getLogger(MemberLogic.class);
	@Autowired
	private MemberDao memberDao = null;

	public int memberInsert(Map<String, Object> pMap) {
		logger.info("memberInsert호출");
		int result = 0;
		logger.info(pMap.toString());
		result = memberDao.memberInsert(pMap);
		return result;
	}

}
