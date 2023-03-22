package com.example.demo.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.DeptDao;
import com.example.demo.vo.DeptVO;

@Service
public class DeptLogic {
	Logger logger = LoggerFactory.getLogger(DeptLogic.class);
	@Autowired
	private DeptDao deptDao;
	public int deptInsert(DeptVO pdVO) {
		int result=0;
		result = deptDao.deptInsert(pdVO);
		return result;
	}
	
	public List<Map<String, Object>> deptList(Map<String, Object> pMap) {
		List<Map<String, Object>> dList = null;
		dList = deptDao.deptList(pMap);
		return dList;
	}

	public int deptUpdate(DeptVO pdVO) {
		int result=0;
		result = deptDao.deptUpdate(pdVO);
		return result;

	}

	public int deptDelete(int deptno) {
		int result=deptDao.deptDelete(deptno);
		return result;
	}
}
