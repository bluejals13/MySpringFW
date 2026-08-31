package mylab.user.di.annotation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityService securityService;

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public SecurityService getSecurityService() {
        return securityService;
    }

    public boolean registerUser(String username, String password) {
        // SecurityService를 통한 인증 진행
        boolean isAuthenticated = securityService.authenticate(username, password);

        if (isAuthenticated) {
            // 인증 성공 시 UserRepository에 저장
            userRepository.save(username);
            return true;
        }
        return false;
    }
}