package mylab.user.di.annotation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @Value("${DB_TYPE:MySQL}")
    private String dbType;

    @Autowired(required = false)
    private JdbcTemplate jdbcTemplate;

    public String getDbType() {
        return dbType;
    }

    public void save(String username) {
        System.out.println(">> [" + dbType + "] DB(D-B-1)에 사용자 저장 완료: " + username);

        // 💡 아래 코드를 추가/확인해주세요!
        if (jdbcTemplate != null) {
            String sql = "INSERT INTO users (username) VALUES (?)";
            jdbcTemplate.update(sql, username);
        } else {
            System.out.println("⚠️ JdbcTemplate이 주입되지 않았습니다.");
        }
    }
}