package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import lombok.extern.log4j.Log4j2;

@Repository
@Log4j2
public class HotelReserveDao {
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;

		public List<Map<String, Object>> hotelList(Map<String, Object> pMap) {
			log.info("hotelList호출");
			 List<Map<String, Object>> bList = sqlSessionTemplate.selectList("hotelList",pMap);
			return bList;
		}

}
