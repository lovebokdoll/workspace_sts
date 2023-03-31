package com.example.demo.logic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.HotelReserveDao;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class HotelReservLogic {
	@Autowired
	private HotelReserveDao hotelReserveDao = null;

	public List<Map<String, Object>> hotelList(Map<String, Object> pMap) {
		log.info("hotelList호출");
		List<Map<String, Object>>bList = hotelReserveDao.hotelList(pMap);
		return bList;
	}

}