package mylab.notification.di.annotation;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = NotificationConfig.class)
class NotificationConfigTest {

    @Autowired
    private NotificationManager notificationManager;

    @Test
    @DisplayName("NotificationManager DI 및 서비스 설정 검증")
    void testNotificationManagerDI() {
        // a. NotificationManager 의 레퍼런스가 Not Null 인지 검증
        assertNotNull(notificationManager, "NotificationManager가 주입되지 않았습니다.");

        // b. 이메일 서비스 검증
        NotificationService emailService = notificationManager.getEmailService();
        assertNotNull(emailService, "EmailService가 Not Null이어야 합니다.");
        
        assertInstanceOf(EmailNotificationService.class, emailService);
        EmailNotificationService typedEmailService = (EmailNotificationService) emailService;
        
        assertEquals("smtp.gmail.com", typedEmailService.getSmtpServer(), "SMTP 서버가 일치하지 않습니다.");
        assertEquals(587, typedEmailService.getPort(), "포트 번호가 일치하지 않습니다.");

        // d. SMS 서비스 검증
        NotificationService smsService = notificationManager.getSmsService();
        assertNotNull(smsService, "SmsService가 Not Null이어야 합니다.");
        
        assertInstanceOf(SmsNotificationService.class, smsService);
        SmsNotificationService typedSmsService = (SmsNotificationService) smsService;
        
        assertEquals("SKT", typedSmsService.getProvider(), "통신사가 일치하지 않습니다.");

        // e. NotificationManager의 메서드 실행
        notificationManager.sendNotificationByEmail("테스트 이메일");
        notificationManager.sendNotificationBySms("테스트 SMS");
    }
}