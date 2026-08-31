package mylab.order.di.xml;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "classpath:mylab-order-di.xml")
public class OrderSpringTest {

    @Autowired
    private ShoppingCart shoppingCart;

    @Autowired
    private OrderService orderService;

    @Test
    @DisplayName("ShoppingCart Spring Bean 검증")
    public void testShoppingCart() {
        assertNotNull(shoppingCart, "ShoppingCart 객체는 Null이 아니어야 합니다.");
        assertEquals(2, shoppingCart.getProducts().size(), "상품 목록의 크기는 2이어야 합니다.");
        assertEquals("노트북", shoppingCart.getProducts().get(0).getName(), "첫 번째 상품은 '노트북'이어야 합니다.");
        assertEquals("스마트폰", shoppingCart.getProducts().get(1).getName(), "두 번째 상품은 '스마트폰'이어야 합니다.");

        // 테스트 성공 시 콘솔 출력
        System.out.println("=========================================");
        System.out.println("[SUCCESS] ShoppingCart 테스트 성공!");
        System.out.println("담긴 상품 개수: " + shoppingCart.getProducts().size());
        System.out.println("첫 번째 상품: " + shoppingCart.getProducts().get(0).getName());
        System.out.println("두 번째 상품: " + shoppingCart.getProducts().get(1).getName());
        System.out.println("=========================================");
    }

    @Test
    @DisplayName("OrderService Spring Bean 및 주문 금액 계산 검증")
    public void testOrderService() {
        assertNotNull(orderService, "OrderService 객체는 Null이 아니어야 합니다.");
        assertNotNull(orderService.getShoppingCart(), "OrderService의 ShoppingCart 객체는 Null이 아니어야 합니다.");
        assertEquals(950000.0, orderService.calculateOrderTotal(), "총 주문 금액은 950,000이어야 합니다.");

        // 테스트 성공 시 콘솔 출력
        System.out.println("=========================================");
        System.out.println("[SUCCESS] OrderService 테스트 성공!");
        System.out.println("주문 총 금액: " + orderService.calculateOrderTotal() + "원");
        System.out.println("=========================================");
    }
}