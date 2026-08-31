package mylab.user.di.annotation;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "classpath:mylab-user-di.xml")
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("UserService DI 및 사용자 등록 로직 검증")
    public void testUserService() {
        // 1. UserService 주입 검증
        assertNotNull(userService, "UserService 객체는 Null이 아니어야 합니다.");

        // 2. UserRepository 주입 및 dbType 값 검증
        assertNotNull(userService.getUserRepository(), "UserRepository 객체는 Null이 아니어야 합니다.");
        assertEquals("MySQL", userService.getUserRepository().getDbType(), "dbType은 'MySQL'이어야 합니다.");

        // 3. SecurityService 주입 검증
        assertNotNull(userService.getSecurityService(), "SecurityService 객체는 Null이 아니어야 합니다.");

        // 4. registerUser() 메서드 검증 (비밀번호 유무에 따른 True / False)
        boolean successResult = userService.registerUser("root", "1234");
        assertTrue(successResult, "비밀번호가 전달되면 registerUser는 true를 반환해야 합니다.");

        boolean failResult = userService.registerUser("kim", null);
        assertFalse(failResult, "비밀번호가 null이면 registerUser는 false를 반환해야 합니다.");

        // 성공 로그 출력
        System.out.println("=========================================");
        System.out.println("[SUCCESS] UserService 의존성 주입 및 테스트 성공!");
        System.out.println("DB Type : " + userService.getUserRepository().getDbType());
        System.out.println("회원가입(비밀번호 존재) 결과 : " + successResult);
        System.out.println("회원가입(비밀번호 없음) 결과 : " + failResult);
        System.out.println("=========================================");
    }
}