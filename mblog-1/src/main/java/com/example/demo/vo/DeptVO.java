package com.example.demo.vo;

import lombok.Builder;
import lombok.Data;

@Data //getter와 setter역할
@Builder//생성자 생성역할 어노테이션
public class DeptVO {
	private int deptno;
	private String dname;
	private String loc;
	private String filename;
	private String fileurl;
}
