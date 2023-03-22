package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.logic.DeptLogic;
import com.example.demo.vo.DeptVO;
import com.google.gson.Gson;
@RestController
@RequestMapping("/dept/*")
/**
 * 단위테스트 URL은 http://localhost:8000/dept/deptInsert이나 테스트가 불가능하다.
 * @author user1
 *
 */
public class RestDeptController {
	Logger logger = LoggerFactory.getLogger(RestDeptController.class);
	@Autowired
	private DeptLogic deptLogic = null;
	/*************************************************************************
	 * 부서등록 구현
	 * @param pdVO
	 * @return insert문 성공여부 : 1이면 등록성공 0 이면 등록실패
	 *************************************************************************/
	@PostMapping("deptInsert")
	public String deptInsert(@RequestBody DeptVO pdVO) {
		logger.info(pdVO.toString());
		int result= deptLogic.deptInsert(pdVO);
		return String.valueOf(result);
		
	}
	@PutMapping("deptUpdate")
	public String deptUpdate(@RequestBody DeptVO pdVO) {
		logger.info(pdVO.toString());
		int result= deptLogic.deptUpdate(pdVO);
		return String.valueOf(result);
	}
	
	@DeleteMapping("deptDelete")
	public String deptDelete(int deptno) {
		logger.info("deptno = "+ deptno );
		logger.info("사용자가 선택한 부서번호 - 단 자손이 없어야 한다.");
		int result= deptLogic.deptDelete(deptno);
		return String.valueOf(result);
	}
	

	@GetMapping("deptList")
	public String deptList(@RequestParam Map<String,Object> pMap) {
		List<Map<String,Object>> dList = deptLogic.deptList(pMap);
		Gson g = new Gson();
		String temp = g.toJson(dList);
		return temp;
	}
}
/*
 * @Controller는 리턴값이 화면출력으로 사용
 * @RestController는 리턴값에 대한 마임타입이 text/plain으로 사용됨
 * -> 리액트 연동시 조회된 결과나 백엔드에서 전달되는 값은 text이거나 json포맷만 가능하므로 
 *    후자를 선택합니다.
 *    
 * @RequestBody는 post방식으로 사용자가 입력한 값이 보안상 중요한 정보인 경우 사용 가능
 * 패킷헤더가 아닌 바디에 저장되므로 노출위험 없음
 * 
 * */
