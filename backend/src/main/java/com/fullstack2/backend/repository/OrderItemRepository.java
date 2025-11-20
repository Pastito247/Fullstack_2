package com.fullstack2.backend.repository;

import com.fullstack2.backend.entity.Order;
import com.fullstack2.backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(Order order);
}
