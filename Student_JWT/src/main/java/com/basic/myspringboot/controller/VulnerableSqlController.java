package com.basic.myspringboot.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vuln")
@RequiredArgsConstructor
public class VulnerableSqlController {

    private final JdbcTemplate jdbcTemplate;

    /**
     * ⚠️ [취약한 코드] 문자열 결합으로 SQL을 생성하는 엔드포인트
     * 사용자의 입력값(name)이 SQL 문에 그대로 이어붙여집니다.
     */
    @GetMapping("/sqli/students")
    public ResponseEntity<List<Map<String, Object>>> vulnSearch(@RequestParam String name) {
        // 취약점 포인트: PreparedStatement(? 파라미터 바인딩)를 쓰지 않고 문자열을 직접 더함
        String query = "SELECT * FROM students WHERE name LIKE '%" + name + "%'";
        
        List<Map<String, Object>> result = jdbcTemplate.queryForList(query);
        return ResponseEntity.ok(result);
    }
}