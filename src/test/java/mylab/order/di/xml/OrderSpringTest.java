package mylab.order.di.xml;

import mylab.order.di.xml.ShoppingCart;
import mylab.order.di.xml.OrderService;
import mylab.order.di.xml.Product;

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
        // 1. shoppingCart 객체가 Null이 아닌지 검증
        assertNotNull(shoppingCart, "ShoppingCart 객체는 Null이 아니어야 합니다.");

        // 2. shoppingCart.getProducts().size() 검증 (상품 2개)
        assertEquals(2, shoppingCart.getProducts().size(), "상품 목록의 크기는 2이어야 합니다.");

        // 3. 첫 번째 상품 이름 검증
        assertEquals("노트북", shoppingCart.getProducts().get(0).getName(), "첫 번째 상품은 '노트북'이어야 합니다.");

        // 4. 두 번째 상품 이름 검증
        assertEquals("스마트폰", shoppingCart.getProducts().get(1).getName(), "두 번째 상품은 '스마트폰'이어야 합니다.");
    }

    @Test
    @DisplayName("OrderService Spring Bean 및 주문 금액 계산 검증")
    public void testOrderService() {
        // 1. orderService 객체가 Null이 아닌지 검증
        assertNotNull(orderService, "OrderService 객체는 Null이 아니어야 합니다.");

        // 2. orderService.getShoppingCart() 객체가 Null이 아닌지 검증
        assertNotNull(orderService.getShoppingCart(), "OrderService의 ShoppingCart 객체는 Null이 아니어야 합니다.");

        // 3. orderService.calculateOrderTotal() 호출 결과값 검증 (150,000 + 800,000 = 950,000)
        assertEquals(950000, orderService.calculateOrderTotal(), "총 주문 금액은 950,000이어야 합니다.");
    }
}