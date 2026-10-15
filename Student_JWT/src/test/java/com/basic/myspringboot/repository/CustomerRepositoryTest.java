package com.basic.myspringboot.repository;

import com.basic.myspringboot.entity.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
class CustomerRepositoryTest {

    @Autowired
    CustomerRepository customerRepository;

    @Test
    void testDeleteCustomer() {
        String customerId = "DEL-" + UUID.randomUUID().toString().substring(0, 6);

        Customer customer = new Customer();
        customer.setCustomerId(customerId);
        customer.setCustomerName("삭제테스트");
        customerRepository.save(customer);

        Customer found = customerRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Customer Not Found"));
        
        customerRepository.delete(found);
        
        Optional<Customer> deleted = customerRepository.findByCustomerId(customerId);
        assertThat(deleted).isEmpty();
    }

    @Test
    void testUpdateCustomer() {
        String customerId = "UPD-" + UUID.randomUUID().toString().substring(0, 6);

        // 새로운 테스트 데이터 저장
        Customer customer = new Customer();
        customer.setCustomerId(customerId);
        customer.setCustomerName("수정전");
        customerRepository.save(customer);

        // 조회 후 수정
        Customer found = customerRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Customer Not Found"));
        
        found.setCustomerName("수정후");
        customerRepository.save(found);
        
        Customer updated = customerRepository.findByCustomerId(customerId).get();
        assertThat(updated.getCustomerName()).isEqualTo("수정후");
    }

    @Test
    void testByNotFoundException() {
        assertThrows(RuntimeException.class, () -> {
            customerRepository.findByCustomerId("NOT-EXIST-999")
                    .orElseThrow(() -> new RuntimeException("Customer Not Found"));
        });
    }

    @Test
    void testFindBy() {
        String customerId = "FIND-" + UUID.randomUUID().toString().substring(0, 6);

        Customer customer = new Customer();
        customer.setCustomerId(customerId);
        customer.setCustomerName("찾기테스트");
        customerRepository.save(customer);

        Optional<Customer> optionalCustomer = customerRepository.findByCustomerId(customerId);
        assertThat(optionalCustomer).isPresent();
        assertThat(optionalCustomer.get().getCustomerName()).isEqualTo("찾기테스트");

        Customer notFoundCustomer = customerRepository.findByCustomerId("NOT-EXIST-999")
                .orElseGet(Customer::new);
        assertThat(notFoundCustomer.getCustomerName()).isNull();
    }
}