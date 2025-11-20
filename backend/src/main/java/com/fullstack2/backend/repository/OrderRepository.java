package com.fullstack2.backend.repository;

import com.fullstack2.backend.entity.Order;
import com.fullstack2.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByBuyer(User buyer);
}
