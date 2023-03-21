package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.vo.MemberVO;

@RestController
@RequestMapping("/restful*")
public class RestfulController {
	Logger logger = LoggerFactory.getLogger(RestfulController.class);

	@GetMapping("{id}")
	// http://localhost:8000/restful/5
	public String main(@PathVariable int id) {
		logger.info("해시값 받아주는 어노테이션:" + id);
		return String.valueOf(id);
	}

	// http://localhoat:8000/restful/get?mem_id=kiwi&mem_pw=123&mem_name=키위
	@GetMapping("get") // upmu[1]
	public String getTest(MemberVO mVO) {
		logger.info(mVO.toString());
		return "get요청 :" + mVO.getMem_id() + "," + mVO.getMem_pw() + "," + mVO.getMem_name();
	}

	/**
	 * postman에서 테스트 해야만 하며 @RequestBody에 들어갈 값은 Body에 들어갈 값은 Body선택 후 row체크하고 반드시
	 * JSON선택 후 JSON포맷으로 파라미터 넘겨야 함 - 주의할 것
	 * 
	 * @RequestBody에 타입을 선언하면 MessageConverter가 대신해줌 - 반드시JSON포맷 넘길것
	 *               http://localhost:8000/restful/post
	 * @param mVO
	 * @return
	 */
	@PostMapping("post")
	public String postTest(@RequestBody MemberVO mVO) {
		logger.info(mVO.toString());
		return "post요청 : " + mVO.getMem_id() + "," + mVO.getMem_pw() + "," + mVO.getMem_name();
	}
}
