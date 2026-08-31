package mylab.notification.di.annotation;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NotificationConfig {

    @Bean
    public NotificationService emailNotificationService() {
        return new EmailNotificationService("smtp.gmail.com", 587);
    }

    @Bean
    public NotificationService smsNotificationService() {
        return new SmsNotificationService("SKT");
    }

    @Bean
    public NotificationManager notificationManager() {
        return new NotificationManager(emailNotificationService(), smsNotificationService());
    }
}