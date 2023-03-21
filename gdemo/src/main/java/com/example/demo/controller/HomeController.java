package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
//컨트롤 계층을 의미하는 어노테이션 추가 -> request와 response누림
//단순리 bean을 관리받는다 라는 점 외에도 요청객체와 응답객체를 주입받을 수 있음
@Controller
//web.xml대신 자바코드에 직접 추가가능함 - 전체적인 빈목록을 볼 수 없음
@RequestMapping("/home/*")
public class HomeController {//url-pattern에 등록했던 url주소를 값으로 추가함
	//테스트 경로 http://localhost:7000/home/index
	@GetMapping("index")
	public String home() {
		return "home/index";
	}
}