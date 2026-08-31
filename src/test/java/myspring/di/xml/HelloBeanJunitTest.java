package myspring.di.xml;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;


public class HelloBeanJunitTest {

    ApplicationContext context;

    @BeforeEach
    void setup() {
        System.out.println("==> setup");

        // Spring Container 생성
        context = new GenericXmlApplicationContext(
                "classpath:hello-bean.xml"
        );
    }

    @Test
    void helloBeanSetter() {
        System.out.println("==> helloBeanSetter");

        Hello hello = context.getBean("hello", Hello.class);
        Hello hello2 = context.getBean("hello",Hello.class);
        
        System.out.println("hello name = " + hello.getNames());
        System.out.println("hello2 name = " + hello2.getNames());
        
        System.out.println("hello printer = " + hello.getPrinter());
        System.out.println("hello2 printer = " + hello2.getPrinter());
        assertSame(hello, hello2);
    }
}
