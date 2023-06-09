package com.example.demo.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.logic.RepleBoardLogic;
import com.google.gson.Gson;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/reple/*")
@Log4j2
public class RepleBoardController {
	@Autowired
	private RepleBoardLogic repleBoardLogic = null;

	
	
	@PostMapping("fileUpload")
	public Object fileUpload(MultipartHttpServletRequest mRequest,
			@RequestParam(value = "file_name", required = false) MultipartFile file_name) {
		log.info("fileUpload 호출 성공");
		// 사용자가 선택한 파일이름 담기
		String filename = null;
		if (!file_name.isEmpty()) {
			filename = file_name.getOriginalFilename();
			// 스프링프로젝트가 바라보는 물리적인 위치정보
			String saveFolder = "D:\\KH\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds";
			String fullPath = saveFolder + "\\" + filename;
			try {
				// File객체는 파일명을 객체화 해주는 클래스임 - 생성되었다고 해서 실제 파일까지 생성된 것이 아님
				File file = new File(fullPath);
				byte[] bytes = file_name.getBytes();
				// outstream반드시 생성해서 파일정보를 읽어서 쓰기를 처리해주어야 완전한 파일이 생성된다.
				// BufferedOutputStream은 필터클래스이지 실제 파일을 쓸 수 없는 객체이다.
				// 실제 파일쓰기가 가능한 클래스가 FileOutputStream클래스이다 그래서 생성자 파라미터에 파일정도를 담아줘야 한다=> 그래야
				// 실제파일 담을 수 있음
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
				bos.write(bytes);
				// 파일쓰기와 관련된 위변조 방지위해 사용후 반드시 닫을 것
				bos.close();
			} catch (Exception e) {

			}
		}
		// 리턴 값으로 선택한 이미지 파일명을 넘겨서 사용자 화면에 첨부된 파일명을 열거해 주는데 사용할 것임.
		String temp = filename;
		return temp;
	}

	@GetMapping("imageGet")
	public Object imageGet(HttpServletRequest req, HttpServletResponse res) {
		/**
		 * imageName 정보는 공통코드로 제공된 QuillEditor.jsx에서 파라미터로 넘어오는 값 imageUpload 메서드에서는 업로드
		 * 된 파일정보(파일명, 파일크기)가 리턴
		 */
		String b_file = req.getParameter("imageName");
		log.info("b_file = {} ", b_file); // XXX.png
		String filePath = "D:\\KH\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds";
		String fname = b_file;
		log.info("b_file: 8 -> euc " + b_file);
		File file = new File(filePath, b_file.trim());
		String mimeType = req.getServletContext().getMimeType(file.toString());
		/**
		 * 마임타임이 null이면 아래 속성값으로 mime type을 설정해준다. 브라우저는 해석이 가능한 마임타입을 페이지 로딩 처리한다. 강제로
		 * 다운로드 처리를 위한 속성값 변경 브라우저에서 해석가능한 마임타입의 경우 화면에 그대로 출력되는 것을 방지하기 위해 추가됨
		 */
		if (mimeType == null) {
			res.setContentType("application/octet-stream");
		}
		String downName = null; // 다운로드되는 파일 이름 담기
		FileInputStream fis = null; // 위 File 객체에서 생성된 객체의 내용을 읽기 위한 클래스 선언
		ServletOutputStream sos = null; // 응답으로 나갈 정보가 웹 서비스 처리되어야 하기 때문에 사용한 객체
		try {
			if (req.getHeader("user-agent").indexOf("MSIE") == -1) {
				downName = new String(b_file.getBytes("UTF-8"), "8859_1");
			} else {
				downName = new String(b_file.getBytes("EUC-KR"), "8859_1");
			}
			// 응답 헤더에 다운로드 될 파일명 매핑
			res.setHeader("Content-Disposition", "attachment;filename=" + downName);
			// 위에서 생성된 파일 문자열 객체를 가지고 파일 생성에 필요한 객체의 파라미터 넘김
			fis = new FileInputStream(file);
			sos = res.getOutputStream();
			// 파일 내용을 담을 byte배열 생성
			byte b[] = new byte[1024 * 10];
			int data = 0;
			/**
			 * 파일에서 읽은 내용을 가지고 실제 파일에 쓰기 처리, 여기서 처리된 브라우저를 통해서 내보내진다.
			 */
			while ((data = (fis.read(b, 0, b.length))) != -1) {
				sos.write(b, 0, data);
			}
			sos.flush();
		} catch (Exception e) {
			log.error("Exception = {} ", e);
		} finally {
			try {
				if (sos != null)
					sos.close();
				if (fis != null)
					fis.close();
			} catch (Exception e2) {
			}
		}
		// byte[] fileArray = boardLogic.imageDownload(imageName);
		// logger.info(fileArray.length);
		return null;
	}

	/**
	 * MultipartFile images -리액트 QuillEditor.jsx에 formData.append("image", file);
	 * image이름 같아야함
	 * 
	 * @param mRequest
	 * @param images
	 * @return
	 */
	// QuillEditor에서 선택한 이미지를 mblog_file테이블에 insert해보자
	// 왜 이런 수업을 준비했낭? - myBatis에서 insert태그의 역할이 있다. - 채번한 숫자를 캐쉬에 담아준다
	// 그런데 select가 아니라서 resultType을 사용할 수 없다. (-> 프로시저 사용 -
	// resultType은 불가하니까 남아있는것은 parameterType뿐이다 -매개변수에 값을 담아준다.
	// TestParam.java ->HashMapBinder설계 파라미터에 값을 담아준다.
	@PostMapping("imageUpload")
	public Object imageUpload(MultipartHttpServletRequest mRequest,
			@RequestParam(value = "image", required = false) MultipartFile image) {
		log.info("imageUpload 호출 성공");
		// 사용자가 선택한 파일이름 담기
		String filename = repleBoardLogic.imageUpload(image);
		// 리턴 값으로 선택한 이미지 파일명을 넘겨서 사용자 화면에 첨부된 파일명을 열거해 주는데 사용할 것임.
		return filename;
	}

	// 이미지 다운로드 처리
	@GetMapping("imageDownload")
	public ResponseEntity<Resource> imageDownload(@RequestParam(value = "imageName") String imageName) {
		log.info("imageDownload호출");
		String fileFolder = "D:\\KH\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds";
		try {
			File file = new File(fileFolder, URLDecoder.decode(imageName, "UTF-8"));
			HttpHeaders header = new HttpHeaders();
			header.add(HttpHeaders.CONTENT_DISPOSITION, "attachmenr:filename" + imageName);
			header.add("Cache-Control", "no-cache, no-store, must-revalidate");
			header.add("Pragma", "no-cache");
			header.add("Expires", "0");
			Path path = Paths.get(file.getAbsolutePath());
			// 이미지 리소스를 읽어서 담기
			ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
			return ResponseEntity.ok().headers(header).contentLength(file.length())
					.contentType(MediaType.parseMediaType("application/octet-stream")).body(resource); // 이미지를 브라우저가
																										// 로딩하지 못하게 함
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

//http://localhost:8000/reple/qnaList?content=제목
//http://localhost:8000/reple/qnaList?content=제목&condition=내용
	@GetMapping("qnaList")
	public String qnaList(@RequestParam Map<String, Object> pMap) {
		log.info("qnaList 호출");
		log.info(pMap);
		List<Map<String, Object>> qList = null;
		qList = repleBoardLogic.qnaList(pMap);
		Gson g = new Gson();
		String temp = g.toJson(qList);
		return temp;
	}

	@GetMapping( "qnaDetail" )
	 public String qnaDetail( @RequestParam Map<String, Object> pMap ) {
	 log.info( "pMap = {}", pMap );
	 List<Map<String, Object>> qnaList = repleBoardLogic.qnaDetail( pMap );
	 Gson gson = new Gson();
	 String temp = gson.toJson( qnaList );
	 log.info( "temp = {}", temp );
	 return temp;
	 }
	
	@PostMapping("qnaInsert")
	public String qnaInsert(@RequestBody Map<String, Object> pMap) {
		log.info("pMap = {}", pMap);
		// 회원번호를 int타입으로 변경하지 않으면 부적합한 열유형 111에러메시지
		// Map,List:Object주의할것 - 부적합한 열유형 setNull(111)
		if (pMap.get("mem_no") != null) {
			// NumberFormatException원인이됨
			int mem_no = Integer.parseInt(pMap.get("mem_no").toString());
			pMap.put("mem_no", mem_no);
		}
		int qna_bno = repleBoardLogic.qnaInsert(pMap);

		log.info("qna_bno = {}", qna_bno);

		return String.valueOf(qna_bno);
	}

	@GetMapping("qnaDelete")
	public int qnaDelete(Map<String, Object> map) {
		int result = repleBoardLogic.qnaDelete(map);
		return result;
	}

	@PostMapping("qnaUpdate")
	public int qnaUpdate(@RequestBody Map<String, Object> pMap) {
		log.info("pMap = {}", pMap);
		
		if (pMap.get("qna_bno") != null) {
			// NumberFormatException원인이됨
			int qna_bno = Integer.parseInt(pMap.get("qna_bno").toString());
			pMap.put("qna_bno", qna_bno);
		}
		int result = repleBoardLogic.qnaUpdate(pMap);
		return result;
	}

}
