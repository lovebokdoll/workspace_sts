package com.example.demo.logic;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.RepleBoardDao;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class RepleBoardLogic {
	@Autowired
	private RepleBoardDao repleBoardDao = null;

	public List<Map<String, Object>> qnaList(Map<String, Object> pMap) {
		log.info("qnaList호출");
		List<Map<String, Object>> qList = repleBoardDao.qnaList(pMap);
		return qList;
	};

	public int qnaInsert(Map<String, Object> pMap) {
		log.info("qnaInsert호출");
		// 여기서 result는 insert성공유무를 나타내는 숫자(1이면 성공 0이면 실패)가 아니라
		// 글등록시에 채번된 시퀀스를 돌려받는 값이어야 한다.=> qna_bno값이여야 한다
		int result = 0;
		result = repleBoardDao.qnaInsert(pMap);
		// 위에서 돌려받은 시퀀스값(qna_bno)를 pMap에 담아준다.
		// 키값이 소문자이면 #{qna_bno} 키값이 대문자이면 #{QNA_BNO}여야 한다
		// 사용자가 입력한 값의 키값은 모두 소문자
		pMap.put("qna_bno", result);
		// 선택한 이미지가 있니?
		if (pMap.get("fileNames") != null) {
			// 작성자가 선택하는 이미지의 갯수가 다르다.
			// 3개이면 3개를 담아내야 한다. -3개에 대한 update가 3번 일어나야 한다.
			repleBoardDao.fileUpdate(fileNames(pMap));
		}
		return result;
	}

	private List<Map<String, Object>> fileNames(Map<String, Object> pMap) {
		List<Map<String, Object>> pList = new ArrayList<>();
		// pMap.get("fileNames"); => 리턴하는 형태는 배열 ['man1.png','man2.png','man3.png']
		HashMap<String, Object> fMap = null;
		String[] fileNames = pMap.get("fileNames").toString()
				.substring(1, pMap.get("fileNames").toString().length() - 1).split(",");
		for (int i = 0; i < fileNames.length; i++) {
			fMap = new HashMap<String, Object>();
			fMap.put("file_name", fileNames[i]);
			fMap.put("qna_bno", pMap.get("qna_bno"));
			pList.add(fMap);
		}
		return pList;
	}

	public String imageUpload(MultipartFile image) {
		log.info("imageUpload 호출 성공");
		// 이미지 업로드가 된 파일에 대한 fime_name , file_size,file_path등을 결정해줌
		Map<String, Object> pMap = new HashMap<>();
		// 사용자가 선택한 파일이름 담기
		String filename = null;
		String fullpath = null;
		double d_size = 0.0;
		if (!image.isEmpty()) {
			// filename = image.getOriginalFilename();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			Calendar time = Calendar.getInstance();// 객체주입
			filename = sdf.format(time.getTime()) + "-" + image.getOriginalFilename().replaceAll(" ", "-");
			// 스프링프로젝트가 바라보는 물리적인 위치정보
			String saveFolder = "D:\\KH\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds";
			String fullPath = saveFolder + "\\" + filename;
			try {
				// File객체는 파일명을 객체화 해주는 클래스임 - 생성되었다고 해서 실제 파일까지 생성된 것이 아님
				File file = new File(fullPath);
				byte[] bytes = image.getBytes();
				// outstream반드시 생성해서 파일정보를 읽어서 쓰기를 처리해주어야 완전한 파일이 생성된다.
				// BufferedOutputStream은 필터클래스이지 실제 파일을 쓸 수 없는 객체이다.
				// 실제 파일쓰기가 가능한 클래스가 FileOutputStream클래스이다 그래서 생성자 파라미터에 파일정도를 담아줘야 한다=> 그래야
				// 실제파일 담을 수 있음
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
				bos.write(bytes);
				// 파일쓰기와 관련된 위변조 방지위해 사용후 반드시 닫을 것
				bos.close();
				// 여기까지는 이미지 파일쓰기 처리였고 이 다음에는 mblog_file테이블에 insert될 정보를 초기화 해줌
				d_size = Math.floor(file.length() / (1024.0) * 10) / 10;
				log.info("d_size={}", d_size);
				log.info("file_name={}", filename);
				log.info("file_path={}", fullPath);

				pMap.put("file_name", filename);
				pMap.put("file_size", d_size);
				pMap.put("file_path", fullPath);

				int result = repleBoardDao.fileInsert(pMap);
				log.info("result={}", result);
			} catch (Exception e) {
				e.printStackTrace();
				log.info(e.toString());
			}
		}
		// 리턴 값으로 선택한 이미지 파일명을 넘겨서 사용자 화면에 첨부된 파일명을 열거해 주는데 사용할 것임.
		String temp = filename;
		return temp;
	}

}
