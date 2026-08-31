package mylab.user.di.annotation;

import org.springframework.stereotype.Component;

@Component
public class SecurityService {

    public boolean authenticate(String username, String password) {
        // 비밀번호가 존재하면 인증 성공
        return password != null && !password.trim().isEmpty();
    }
}